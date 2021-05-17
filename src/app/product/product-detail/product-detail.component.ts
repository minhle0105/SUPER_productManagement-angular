import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {};
  currentId: number = -1;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.currentId = +paramMap.get('id');
      this.getProductById(this.currentId);
    })
  }

  ngOnInit() {
  }

  get id() {
    return this.product.id;
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(thisProduct => {
      this.product = thisProduct;
    })
  }

  deleteProduct(id: number) {
    let choice = confirm('Are you sure you want to delete?');
    if (choice) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert("Product is successfully removed");
        this.router.navigateByUrl('/products').then(r => {});
      }, error => {
        alert("Product cannot be removed");
        console.log(error);
      });
    }
  };

}
