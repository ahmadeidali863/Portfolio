import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { Category } from '../core/domain/category';
import { ImageService } from '../core/services/image.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule
    ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  librarySubmitted:boolean =false;
  previewImageFile : File | any;
  public iCategory: Category = {
    userName: '',
    title: '',
    description: '',
    previewImage: '',
    id: '',
    previewImageFile: undefined
  }
public imageService = inject(ImageService);


//uploadImage

url: any = '';
fileDigitalProducts: any = '';
submitImage(event: any) {
  if (event.target.files[0].size > 20000000) {
    console.log('image is ' + '  .')
    return;
  }
  else if (event.target.files[0].size < 10) {
    console.log('image is ' + '  .')
    return;
  }
  else if (event.target.files[0]) {
    const file: File = event.target.files[0];
    var pattern = /image-*/;

    if (!file.type.match(pattern)) {
      console.log('image is ' + '  .')
      return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target?.result;
        this.previewImageFile = file;
        this.iCategory.previewImageFile = file;

      }
      
    }
  }
 
}

 auth = getAuth();

///submit
submitLibrary(libraryfrm:any): void {
  if (libraryfrm.form.valid) {
  this.librarySubmitted = true;
  if (this.iCategory.title == '') {
    console.log('title is ' + '  .')
    return;
  }

  this.iCategory.userName = 'admin';
 // this.iCategory.previewImageFile = this.previewImageFile;
  // if (this.previewImageFile == null) {
  //   console.log('preview Image File is required') 
  //   return
  // }
  console.log(this.iCategory);
  // this.imageService.createCategory(this.iCategory).then(() => {
  //   console.log('Category added successfully');
  // }).catch((error) => {
  //   console.error(error);
  // });
  

 
  createUserWithEmailAndPassword(this.auth, this.iCategory.title, this.iCategory.description)
    .then((responed) => {
      // Signed in 
    console.log(responed.user)
      // ...
    })
    .catch((error) => {
      alert(error)
      // ..
    });

}
}



}


