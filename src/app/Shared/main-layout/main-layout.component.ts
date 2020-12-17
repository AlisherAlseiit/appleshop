import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {AuthService, UserData} from '../service/auth.service';
import {PostService} from '../service/post.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;
type
  constructor( protected router: Router, private productServ : ProductService,
               private  postServ: PostService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.subs.push(this.postServ.getAllPosts().subscribe(posts => {
      this.posts = posts; })
    );

    this.subs.push(
      this.authServ.CurrentUser().subscribe(user => {
        this.user = user;
      })
    );
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

  setType(type){
    this.type = type
    if(this.type !== 'Cart'){
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
        })
      this.productServ.setType(this.type)
      }
    }

  logout(): void {
    this.authServ.Logout();
  }


}
