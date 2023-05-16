import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { database } from 'src/app/app.module';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Images } from 'src/app/core/domain/image';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-categories-images',
  standalone: true,
  imports: [CommonModule,
    TranslateModule,
    FormsModule],
  templateUrl: './admin-categories-images.component.html',
  styleUrls: ['./admin-categories-images.component.scss']
})
export class AdminCategoriesImagesComponent implements OnInit{
  categories: any[] = [];
  categoryImages: any[] = [];

  public image: Images = {
    imageSrc: '',
    title: '',
    categoryId: '',
    userName: '',
    id: ''
  }

  collectionRef = collection(database, 'categories');



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
  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    this.getdata();
  }
  categorySelected(id : string){
    this.image.categoryId = id;
    this.categoryImages = [];
    getDocs(collection(database, `categories/${this.image.categoryId}/images`)).then((res) =>{
      this.categoryImages.push( res.docs.map((item) =>{
       console.log(item.data());
        return {...item.data(), id: item.id};
      }))
      }).catch((err) => {
        alert(err)
      })
  }

  
  addImagetoCategury(libraryfrm:any){
    if (libraryfrm.form.valid) {
      if (this.image.title == '') {
        return;
      }
    let subcollectionRef = collection(database, `categories/${this.image.categoryId}/images`);
  addDoc(subcollectionRef,{
   title: this.image.title,
   categoryId: this.image.categoryId,
   userName: 'admin',
   imageSrc : this.image.imageSrc
  }).then(() => {
    //this.getdata();
    console.log(this.image)
    alert('done')
  }).catch((err) =>{
  alert(err)
  })
}else{
  alert('form is invalid')
}

  }
  //uploadImage
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
selectedFile: File | null = null;
librarySubmitted:boolean =false;
previewImageFile : File | any;
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
        const filePath = `categories/${this.image.categoryId}/images/${new Date().getTime()}_${this.selectedFile!.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);
        this.url = event.target?.result;
        this.previewImageFile = file;
        this.uploadData();
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.image.imageSrc = downloadURL;
            });
          })
        ).subscribe();
      }
      
  }
  
}
}
