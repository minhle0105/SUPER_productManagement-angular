import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  listProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productService.getAllProducts().subscribe(products => {
      this.listProducts = products;
    })
  }

  deleteProduct(id: number) {
    let choice = confirm("Are you sure you want to delete?");
    if (choice) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert("Product is successfully removed");
        this.getAll();
      }, error => {
        alert("Product cannot be removed");
        console.log(error);
      })
    }
  }
}
