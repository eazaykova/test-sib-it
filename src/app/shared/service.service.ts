import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMeasure } from 'src/models/IMeasure';
import { IProduct } from 'src/models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  //Create Product
  addProduct(data: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:3000/products', data);
  }

  //Update Product
  updateProduct(id: number, data: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(
      `http://localhost:3000/products/${id}`,
      data
    );
  }

  //Fetch Products
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products');
  }

  //Fetch Product
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`);
  }

  //Delete Product
  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`http://localhost:3000/products/${id}`);
  }

  //Fetch Measures
  getAllMeasures(): Observable<IMeasure[]> {
    return this.http.get<IMeasure[]>('http://localhost:3000/measures');
  }

  //Fetch Measure
  getMeasure(id: number): Observable<IMeasure> {
    return this.http.get<IMeasure>(`http://localhost:3000/measures/${id}`);
  }
}
