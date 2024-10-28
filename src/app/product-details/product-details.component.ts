import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { ServiceService } from '../shared/service.service';
import { ObjectChangeFormComponent } from '../object-change-form/object-change-form.component';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/models/IProduct';
import { IMeasure } from 'src/models/IMeasure';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number = 0;
  product = {} as IProduct;
  measure = {} as IMeasure;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params['id'];
    this.getProduct(this.id);
  }

  ngOnInit(): void {}

  getProduct(id: number) {
    this.service.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.getMeasure(this.product.measure as number);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  getMeasure(id: number) {
    this.service.getMeasure(id).subscribe({
      next: (res) => {
        this.measure = res;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  editProductForm(data: IProduct) {
    const dialogRef = this.dialog.open(ObjectChangeFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProduct(this.id);
        }
      },
    });
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (res) => {
        this.goHome();
        alert('Продукт удален!');
      },
      error: console.log,
    });
  }

  goHome() {
    this.router.navigate(['']);
  }
}
