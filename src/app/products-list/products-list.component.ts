import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectChangeFormComponent } from '../object-change-form/object-change-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../shared/service.service';
import { IProduct } from 'src/models/IProduct';
import { IMeasure } from 'src/models/IMeasure';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'measure',
    'unit_coast',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  products: IProduct[] = [];
  product = {} as IProduct;
  measures: IMeasure[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private service: ServiceService) {}
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Элементов на странице:';
    this.paginator._intl.firstPageLabel = 'Первая страница';
    this.paginator._intl.previousPageLabel = 'Предыдущая страница';
    this.paginator._intl.nextPageLabel = 'Следующая страница';
    this.paginator._intl.lastPageLabel = 'Последняя страница';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length == 0 || pageSize == 0) {
        return `0 из ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} из ${length}`;
    };

    this.getMeasuresList();
    this.getProductsList();
  }

  openObjectChangeForm() {
    const dialogRef = this.dialog.open(ObjectChangeFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductsList();
        }
      },
    });
  }

  editProductForm(data: IProduct) {
    event?.stopPropagation();
    this.product = JSON.parse(JSON.stringify(data));
    this.product.measure = this.measures.find(
      (m: any) => m.name === this.product.measure
    )!.id;

    const dialogRef = this.dialog.open(ObjectChangeFormComponent, {
      data: this.product,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductsList();
        }
      },
    });
  }

  getProductsList() {
    this.service.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.map((p: IProduct) => {
          p.measure = this.measures.find(
            (m: IMeasure) => m.id === p.measure
          )!.name;
          return p;
        });

        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  deleteProduct(id: number) {
    event?.stopPropagation();
    this.service.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Продукт удален!');
        this.getProductsList();
      },
      error: console.log,
    });
  }

  getMeasuresList() {
    this.service.getAllMeasures().subscribe({
      next: (res) => {
        this.measures = res;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
