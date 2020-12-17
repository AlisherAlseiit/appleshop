import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../Shared/service/auth.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  constructor(private authServ: AuthService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private matDialog: MatDialog ) { }

  ngOnInit(): void {
    this.subs.push(
      this.authServ.UserData.subscribe(user => {
        if (user){
          this.router.navigateByUrl('/').then();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }


  login(form: NgForm): void {
    const {email, password} = form.value;

    if (!form.value){
      return;
    }

    this.authServ.SignIn(email, password);
    form.resetForm();
  }

  openRegister(): void{
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const  {fname, lname, email, password, avatar} = result;


      // tslint:disable-next-line:triple-equals
      if (result != undefined) {
        this.authServ.SignUp(email, password, fname, lname, avatar);
      } else {
        return;
      }
    });



  }
}
