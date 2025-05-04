import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from './product';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  imports: [
            NgTemplateOutlet,
            FormsModule,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  providers: [
    ProductService,
  ],
})

export class AppComponent implements OnInit {
  @ViewChild("viewTemplate", {static: false}) viewTemplate: TemplateRef<any> | null = null;
  @ViewChild("editTemplate", {static: false}) editTemplate: TemplateRef<any> | null = null;

  products: Array<Product>;
  productForm: Product | null = null;
  isNew: boolean = false;
  message: string = "";

  constructor(private productService: ProductService){
    this.products = new Array<Product>;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(
      (data: Array<Product>) =>{
        this.products = data;
      });
  }

  addProduct(){
    this.productForm = new Product("", "", 0);
    this.products.push(this.productForm);
    this.isNew = true;
  }

  editProduct(product: Product){
    this.productForm = new Product(product.id, product.title, product.price);
  }

  loadTemplate(product: Product){
    if(this.productForm && this.productForm.id == product.id){
      return this.editTemplate;
    }
    else{
      return this.viewTemplate;
    }
  }

  saveProduct(){
    if(this.isNew){
      this.productService
          .createProduct(this.productForm as Product)
          .subscribe(_ => {
            this.message = "New product add to database";
            this.loadProducts();
          });
      this.isNew = false;
      this.productForm = null;
    }
    else{
      this.productService
          .updateProduct(this.productForm as Product)
          .subscribe(_ => {
            this.message = "Product update in database";
            this.loadProducts();
          });
      this.productForm = null;
    }
  }

  cancel(){
    if(this.isNew){
      this.products.pop();
      this.isNew = false;
    }
    this.productForm = null;
  }

  deleteProduct(product: Product){
    this.productService
        .deleteProduct(product.id)
        .subscribe(_ => {
          this.message = "Product deleted";
          this.loadProducts();
        });
  }
}
