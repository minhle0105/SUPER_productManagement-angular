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
  listCategories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }


  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.listCategories = categories;
    })
  }

  addNewProduct(form: NgForm) {
    let newProduct: Product = {
      name: form.value.name,
      price: form.value.price,
      description: form.value.description,
      category: {
        id: form.value.categoryId,
      }
    };
    this.productService.createNewProduct(newProduct).subscribe(() => {
      alert("Product is successfully saved");
      form.reset();
    }, error => {
      alert("Cannot add product");
      console.log(error);
    })
  }
}
