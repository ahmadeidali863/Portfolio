import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { Category } from '../core/domain/category';
import { ImageService } from '../core/services/image.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    TranslateModule
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
    previewImageFile: '',
    id: ''
  }
public imageService = inject(ImageService);



//uploadImage

url: any = '';
fileDigitalProducts: any = '';
submitDigitalProductsPreviewImage(event: any) {
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
  this.imageService.addCategory(this.iCategory);
  // this.imageService.addDigitalProducts(this.IDigitalProducts).pipe(takeUntil(this.destroy$)).subscribe(() => {
  //   this.initModal();
  //   this.toastr.success("Digital Product Added successfully");
  //   this.previewImageFile = null;
  //   this.digitalProductFile = null;
  //   this.IDigitalProducts.description = '';
  //   this.IDigitalProducts.digitalProductFile = '';
  //   this.IDigitalProducts.price = 0;
  //   this.IDigitalProducts.title = '';
  //   this.IDigitalProducts.previewImage = '';
  //   this.previewImageFile = null;
  //   this.digitalProductFile = null;
  //   //this.digitalProductsVm = new DigitalProductsVm();
  //   this.digitalProductSubmitted = false;
  //   this.digital = false;
  // });
  // } else {
  //   // this.toastr.warning("Invalid Data");
  //     this.translateService
  //         .get('Common.InvalidData')
  //         .subscribe((successMessage: string) => {
  //             this.toastr.warning(successMessage);

  //         });
  // }
}
}
}


