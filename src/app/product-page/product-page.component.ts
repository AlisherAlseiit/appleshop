import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Shared/service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PostService} from '../Shared/service/post.service';
import {AuthService, UserData} from '../Shared/service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$
  subs: Subscription[] = [];
  user: UserData;
  posts: any[] = [];

  constructor(private productServ: ProductService, private route: ActivatedRoute,
              private  postServ: PostService, private authServ: AuthService) { }

  ngOnInit() {

    this.subs.push(this.postServ.getAllPosts().subscribe(posts => {
      this.posts = posts; })
    );

    this.subs.push(
      this.authServ.CurrentUser().subscribe(user => {
        this.user = user;
      })
    );

    this.product$ = this.route.params
      .pipe( switchMap( params => {
      return this.productServ.getInformationOfProducts(params['id'])
    }))
  }

  addProduct(product) {
    this.productServ.addProduct(product)

  }
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  postMessage(form: NgForm): void {

    const {message} = form.value;

    this.postServ.postMessage(message, `${this.user.firstName} ${this.user.lastName}`,
      {
        avatar: this.user.avatar,
        lastName: this.user.lastName,
        firstName: this.user.firstName
      }

    );

    form.resetForm();

  }


}
