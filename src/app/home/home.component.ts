import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterModule } from '@angular/router';
import { database } from '../app.module';
import { collection, getDocs } from 'firebase/firestore';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  images: any[]=[];
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  categories: any[] = [];
  collectionRef = collection(database, 'categories');
constructor(){
 
}

  ngOnInit(): void {
  
    setTimeout(() => {
      this.getdata();
      //this.cdr.detectChanges();
    }, 1000);
    

  }
 
 image(){
  this.images = [
    '../assets/images/art-kosmos-kosmonavt-kacheli-buket.jpg',
    '../assets/images/art-narisovannyy-peyzazh-skaly.jpg',
    '../assets/images/buffalo-kruger-national-park-wild-south-africa.jpg',
    '../assets/images/dota-2-xin-ember-spirit.jpg',
    '../assets/images/buffalo-kruger-national-park-wild-south-africa.jpg',
    '../assets/images/buffalo-kruger-national-park-wild-south-africa.jpg',
    '../assets/images/IMG_20191030_105508.jpg',
    '../assets/images/MV5BZmI4OThmZTUtYTYyYS00ODkwLTlmNDItYTRkOWQ0YmE4NjZiXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SY1000_CR0,0,772,1000_AL_.jpg',
  ];
 }

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
 opengalleryType (id :string) {
    this.router.navigate([`/gallery/${id}`]);
}
}
