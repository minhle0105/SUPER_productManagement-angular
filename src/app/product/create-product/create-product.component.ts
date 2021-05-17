import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product: Product = {};

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addNewProduct(form: NgForm) {
    let newProduct = form.value;
    this.productService.createNewProduct(newProduct).subscribe(() => {
      alert("Product is successfully saved");
      this.product = {};
    }, error => {
      alert("Cannot add product");
      console.log(error);
    })
  }
}
