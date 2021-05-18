import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product = {};
  idToUpdate: number = -1;
  listCategories: Category[] = [];

  productForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl(),
  })

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {
    // get the current url link
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // get the 'id' from current URL, assign the value to idToUpdate
      this.idToUpdate = +paramMap.get('id');
      // call the method to get all the current product info, assign the current info to the form so that the update form has the
      // current info
      this.getProductById(this.idToUpdate);
    })
  };

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.listCategories = categories;
    })
  }

  get id() {
    return this.productForm.get('id');
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(thisProduct => {
      this.productForm = new FormGroup({
        name: new FormControl(thisProduct.name),
        price: new FormControl(thisProduct.price),
        description: new FormControl(thisProduct.description),
        category: new FormControl(thisProduct.category)
      })
    })
  };

  updateProductInfo(id: number) {
    // get the new product info from the form
    // let newProduct = this.productForm.value;
    let newProduct: Product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      category: {
        id: this.productForm.value.category,
      }
    }
    // pass the idToUpdate (in view, we call this method with idToUpdate)
    this.productService.updateProduct(id, newProduct).subscribe(() => {
      alert("Product is successfully updated");
    }, error => {
      alert("Product cannot be updated");
      console.log(error);
    })
  }

}
