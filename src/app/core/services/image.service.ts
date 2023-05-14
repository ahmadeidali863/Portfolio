import { Injectable } from '@angular/core';
import { Category } from '../domain/category';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

 
  // constructor(private afs : AngularFirestore,private storage: AngularFireStorage) { }

  // async uploadFile(file: File): Promise<string> {
  //   const filePath = `images/${file.name}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   await task;
  //   const downloadUrl = await fileRef.getDownloadURL().toPromise();
  //   return downloadUrl;
  // }
  // // add student
  // addCategory(category : Category) {debugger
  //   const downloadUrl = this.uploadFile(category.previewImageFile);
  //   category.previewImageFile = downloadUrl;
  //   category.id = this.afs.createId();
  //   return this.afs.collection('category').add(category);
  // }

   constructor(private db: AngularFireDatabase) {}

  addCategory(category : Category) {debugger
    return this.db.database.ref('categories').set(category);
  }
  
  createCategory(category : Category) {
    return this.db.database.ref('categories').push(category);
  }

  // addImageToCategory(categoryId, image) {
  //   return this.db.database.ref('categories/' + categoryId + '/images').push(image);
  // }

  getCategories() {
    return this.db.database.ref('categories').on('value', (snapshot) => {
      const categories = snapshot.val();
      return categories;
    });
  }

  // getImagesForCategory(categoryId) {
  //   return this.db.database.ref('categories/' + categoryId + '/images').on('value', (snapshot) => {
  //     const images = snapshot.val();
  //     return images;
  //   });
  // }
//const categories = firebase.database().ref('categories').get();
}