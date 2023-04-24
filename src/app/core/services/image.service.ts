import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../domain/category';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private afs : AngularFirestore) { }


  // add student
  addCategory(category : Category) {
    category.id = this.afs.createId();
    return this.afs.collection('/category').add(category);
  }
}