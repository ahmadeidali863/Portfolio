import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/i18n/app/',
    '.json');
}

const firebaseConfig = {
  apiKey: "AIzaSyD5ZPoKHVDuLTqHF1hi2u7AX8yBJfmYIiw",
  authDomain: "portfolio-4286b.firebaseapp.com",
  projectId: "portfolio-4286b",
  storageBucket: "portfolio-4286b.appspot.com",
  messagingSenderId: "877633109188",
  appId: "1:877633109188:web:d91e4672e93f2f1cba5d91",
  measurementId: "G-2VDSLNN31J"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }






//npm build run
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD5ZPoKHVDuLTqHF1hi2u7AX8yBJfmYIiw",
//   authDomain: "portfolio-4286b.firebaseapp.com",
//   projectId: "portfolio-4286b",
//   storageBucket: "portfolio-4286b.appspot.com",
//   messagingSenderId: "877633109188",
//   appId: "1:877633109188:web:d91e4672e93f2f1cba5d91",
//   measurementId: "G-2VDSLNN31J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);