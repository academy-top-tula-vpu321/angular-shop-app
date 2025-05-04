import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlApi = "http://localhost:5000/api/products";
  constructor(private httpClient: HttpClient) { }

  getProducts(){
    return this.httpClient.get<Array<Product>>(this.urlApi);
  }

  createProduct(product: Product){
    const header = new HttpHeaders().set("Content-Type", "apllication/json");
    return this.httpClient.post<Product>(this.urlApi, JSON.stringify(product), {headers: header});
  }

  updateProduct(product: Product){
    const header = new HttpHeaders().set("Content-Type", "apllication/json");
    return this.httpClient.put<Product>(this.urlApi, JSON.stringify(product), {headers: header});
  }

  deleteProduct(id: string){
    return this.httpClient.delete<Product>(this.urlApi + "/" + id);
  }
}
