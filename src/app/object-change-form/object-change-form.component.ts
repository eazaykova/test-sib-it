import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeasure } from 'src/models/IMeasure';
import { IProduct } from 'src/models/IProduct';

@Component({
  selector: 'app-object-change-form',
  templateUrl: './object-change-form.component.html',
  styleUrls: ['./object-change-form.component.scss'],
})
export class ObjectChangeFormComponent implements OnInit {
  emptyForm: FormGroup;
  measures: IMeasure[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private dialogref: MatDialogRef<ObjectChangeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {
    this.emptyForm = this.fb.group({
      name: ['', [Validators.required, this.spaceValidator]],
      quantity: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      unit_coast: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      measure: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMeasuresSList();
    this.emptyForm.patchValue(this.data);
  }

  getMeasuresSList() {
    this.service.getAllMeasures().subscribe({
      next: (res) => {
        this.measures = res;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  onFormSubmit() {
    if (this.emptyForm.valid) {
      if (this.data) {
        this.service
          .updateProduct(this.data.id!, this.emptyForm.value)
          .subscribe({
            next: (val: IProduct) => {
              alert('Продукт успешно обновлен');
              this.dialogref.close(true);
            },
            error: (err: any) => {
              alert(err);
            },
          });
      } else {
        this.service.addProduct(this.emptyForm.value).subscribe({
          next: (val: IProduct) => {
            alert('Продукт успешно добавлен');
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    }
  }
  spaceValidator(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
      console.log(control.value);
      return { required: true };
    } else {
      return null;
    }
  }
}
