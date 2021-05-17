import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {CreateProductComponent} from './product/create-product/create-product.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {UpdateProductComponent} from './product/update-product/update-product.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/create',
    component: CreateProductComponent
  },
  {
    path: 'products/details/:id',
    component: ProductDetailComponent
  },
  {
    path: 'products/edit/:id',
    component: UpdateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
