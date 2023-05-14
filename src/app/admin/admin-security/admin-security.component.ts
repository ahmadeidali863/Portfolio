import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/domain/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-admin-security',
  standalone: true,
  imports: [CommonModule,
    TranslateModule,
    FormsModule],
  templateUrl: './admin-security.component.html',
  styleUrls: ['./admin-security.component.scss']
})
export class AdminSecurityComponent {
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
  createUserWithEmailAndPassword(this.auth, this.iUser.email, this.iUser.password)
    .then((responed) => {
    console.log(responed.user)
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
