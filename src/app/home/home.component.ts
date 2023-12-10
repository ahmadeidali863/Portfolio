import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterModule } from '@angular/router';
import { database } from '../app.module';
import { collection, getDocs } from 'firebase/firestore';
import { AuthService } from '../core/services/auth.service';
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
  @ViewChild('welcome', { static: true }) welcomeRef!: ElementRef;
  @ViewChild('welcomeTwo', { static: true }) welcomeTwoRef!: ElementRef;
  @ViewChild('scrollDown', { static: true }) scrollDownRef!: ElementRef;
  @ViewChild('headerBlock', { static: true }) headerBlockRef!: ElementRef;
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  categories: any[] = [];
  collectionRef = collection(database, 'categories');

constructor(private elementRef: ElementRef) {}

scrollToSection(sectionId: string): void {
  const section = this.elementRef.nativeElement.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
showText1 = false;
showText2 = false;
ngAfterViewInit() {
  if(!this.authService.getFirstTime()){

    setTimeout(() => {
      this.showText1 = true;
    }, 1000);
  
    setTimeout(() => {
      this.showText1 = false;
      this.showText2 = true;
    }, 3000);
  
    setTimeout(() => {
      this.welcomeRef.nativeElement.style.backgroundColor = 'transparent';
      
    }, 5000);
    setTimeout(() => {
      this.welcomeRef.nativeElement.style.display = 'none';
      this.welcomeTwoRef.nativeElement.style.display = 'none';
      this.scrollDownRef.nativeElement.style.display = 'none';
  
    }, 5000);
    setTimeout(() => {
      this.headerBlockRef.nativeElement.style.opacity = '0';
      this.welcomeTwoRef.nativeElement.style.display = 'grid';
      this.scrollDownRef.nativeElement.style.display = 'grid';
  
  
    }, 5200);
    setTimeout(() => {
      this.headerBlockRef.nativeElement.style.display = 'none';
      this.authService.changeFirstTime();
  
    }, 5500);
  }else{
    this.welcomeRef.nativeElement.style.display = 'none';
    this.headerBlockRef.nativeElement.style.display = 'none';
  }
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
