import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//products.service file is there to handle ajax request code that communicates with backend server to retrieve data

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = "http://localhost:4000/products";

  constructor(
    private http: HttpClient,
    private router: Router) { }

  uploadLink(){
    return `${this.uri}/upload`;
  }

  addProduct(ProductLink, ProductName, ProductDescription, ProductPrice){
    const obj = {
      ProductLink,
      ProductName,
      ProductDescription,
      ProductPrice
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getProducts() {
    return this.http.get(`${this.uri}`);
  }


  editProduct(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateProduct(ProductLink, ProductName, ProductDescription, ProductPrice, id) {
    const obj = {
      ProductLink,
      ProductName,
      ProductDescription,
      ProductPrice
    };
    this.http.post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => {
        console.log('Done uploading product');
        this.router.navigate(['products']);
      });
  }

  deleteProduct(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }
}
