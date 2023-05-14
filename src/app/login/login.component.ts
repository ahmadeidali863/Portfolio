import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { User } from '../core/domain/user';
import { AuthService } from '../core/services/auth.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    TranslateModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  librarySubmitted:boolean =false;
  showPassword:boolean =false;
  previewImageFile : File | any;
  public iUser: User = {
    id: 0,
    userName: '',
    password: '',
    token: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    profileImageUrl: '',
    isEnabled: 0,
    email: '',
    securityStamp: '',
    phoneNumber: '',
    preferedLanguage: '',
    rememberMe: false,
    provider: ''
  }
public imageService = inject(AuthService);
public router = inject(Router);


 auth = getAuth();

///submit
submitUser(Usersfrm:any): void {
  if (Usersfrm.form.valid) {
  this.librarySubmitted = true;
  if (this.iUser.email == '' || this.iUser.password == '') {
    console.log('email is ' + '  .')
    return;
  }
  console.log(this.iUser);
  signInWithEmailAndPassword(this.auth, this.iUser.email, this.iUser.password)
    .then((responed) => {
    console.log(responed.user)
    this.router.navigate(['/admin']);
    })
    .catch((error) => {
      alert(error)
    });

}
}
useAfterIcon = true;
  
toggleIcon(): void {
  this.useAfterIcon = !this.useAfterIcon;
}
}
