import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Shared/service/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$

  constructor(private productServ: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe( switchMap( params => {
      return this.productServ.getInformationOfProducts(params['id'])
    }))
  }

  addProduct(product) {
    this.productServ.addProduct(product)

  }


}
