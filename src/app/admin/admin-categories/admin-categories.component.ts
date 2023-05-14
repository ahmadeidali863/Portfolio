import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/core/domain/category';
import { ImageService } from 'src/app/core/services/image.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { database } from 'src/app/app.module';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Images } from 'src/app/core/domain/image';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule,
    TranslateModule,
    FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit{
  categories: any[] = [];
  updateCateguriesId:string = '';
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
  public image: Images = {
    imageSrc: '',
    title: '',
    categoryId: '',
    userName: ''
  }
public imageService = inject(ImageService);
//------------------

progress: number = 0;

uploadData() {
 const intervalId = setInterval(() => {
    this.progress += 1;
    if (this.progress >= 100) {
      alert('added');
      clearInterval(intervalId);
      this.progress = 0;
      return;
    }
  }, 50);
}
//----------------------

collectionRef = collection(database, 'categories');

addCateguries(libraryfrm:any){
  if (libraryfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iCategory.title == '' || this.iCategory.description == '') {
      return;
    }
  }
addDoc(this.collectionRef,{
 title: this.iCategory.title,
 description: this.iCategory.description,
 userName: 'admin',
 previewImage : this.downloadURL
}).then(() => {
  this.getdata();
  alert('done')
}).catch((err) =>{
alert(err)
})
}

//
updateCateguries(libraryfrm:any){
  if (libraryfrm.form.valid) {
    this.librarySubmitted = true;
    if (this.iCategory.title == '' || this.iCategory.description == '') {
      return;
    }
  }
  const updateCateguriesRef = doc(database, 'categories', this.updateCateguriesId);
  updateDoc(updateCateguriesRef, {
    title: this.iCategory.title,
    description: this.iCategory.description,
    userName: 'admin',
    previewImage : this.downloadURL
  }).then(() => {
    console.log(this.iCategory);
    alert('data updated');
  }).catch((err) =>{
  alert(err)
})
 
}
updateActive(id: string){
  this.updateCateguriesId = id;
  console.log(this.updateCateguriesId)
}
constructor(private storage: AngularFireStorage) {}
getdata(){
  this.categories = [];
  getDocs(this.collectionRef).then((res) =>{
    this.categories.push( res.docs.map((item) =>{
    //  console.log(item.data());
      return {...item.data(), id: item.id};
    }))
    }).catch((err) => {
      alert(err)
    })
   // console.log(this.categories);
}
ngOnInit() {
  this.getdata();
}
selectedFile: File | null = null;
downloadURL: string | null = null;


//--------------------
//uploadImage

url: any = '';
fileDigitalProducts: any = '';

onFileSelected(files: any) {
  if (files.target.files[0].size > 20000000) {
    alert('size is too large')
    return;
  }
  else if (files.target.files[0].size < 10) {
    alert('size is too small')
    return;
  }
  else if (files.target.files[0]) {
    const file: File = files.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(files.target.files[0]);

      reader.onload = (event) => {
        this.selectedFile = files.target.files[0];
        const filePath = `categories/${new Date().getTime()}_${this.selectedFile!.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
        this.url = event.target?.result;
        this.previewImageFile = file;
        this.iCategory.previewImageFile = file;
        this.uploadData();
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.downloadURL = downloadURL;
            });
          })
        ).subscribe();
      }
      
  }
  
}



}
