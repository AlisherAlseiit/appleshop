import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../Shared/service/product.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../Shared/interface/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
form: FormGroup
  product: Product
submitted = false
  constructor( private route: ActivatedRoute, private productServ: ProductService, protected router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap( params => {
      return this.productServ.getInformationOfProducts(params['id'])
    })).subscribe(product => {
      this.product = product
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),

      })

    })
  }

  submit() {
    if(this.form.invalid){
      return
    }
    this.submitted = true


    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(res =>
    {
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
