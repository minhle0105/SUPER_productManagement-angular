import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product: Product = {};
  listCategories: string[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }


  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      for (let i = 0; i < categories.length; i++) {
        this.listCategories[i] = categories[i].name;
      }
    })
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
