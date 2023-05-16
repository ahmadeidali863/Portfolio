import { ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../app.module';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule,
            TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: any[]=[];
  categoryImages: any[] = [];
  selectedImage:string='';
  imagesize:boolean=false;
  imageRotate:boolean=false;
  selectImage:boolean=false;
  currentWidth: number = 0;
  currentHeight: number = 0;
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
constructor(){
 
}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.categorySelected(id);
    console.log(id)
    setTimeout(() => {
      this.image();
      this.cdr.detectChanges();
    }, 400);
 
  }
  categorySelected(id : string){
    this.categoryImages = [];
    getDocs(collection(database, `categories/${id}/images`)).then((res) =>{
      this.categoryImages.push( res.docs.map((item) =>{
       console.log(item.data());
        return {...item.data(), id: item.id};
      }))
      }).catch((err) => {
        alert(err)
      })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.currentWidth = event.target.innerWidth;
    this.currentHeight = event.target.innerHeight;
    console.log( this.currentWidth + '---'+  this.currentHeight)
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
 openImage( image:string,event:any ){
  if(event.currentTarget.clientHeight < event.currentTarget.clientWidth){
this.imagesize = true;
  }else{
    this.imagesize = false;
  }
 
 
this.selectedImage = image;
this.selectImage = true;
console.log(this.selectedImage + '----' + this.selectImage + '' +  event.currentTarget.clientHeight +''+  event.currentTarget.clientWidth)
 }
 exitImage(){
  this.selectedImage = '';
  this.selectImage = false;
  this.imageRotate = false;
  console.log(this.selectedImage + '----' + this.selectImage)
   }

    rotateAndScaleImage(degrees: number){

    const image = document.getElementById('my-image') as HTMLImageElement;
    const transform = `rotate(${degrees}deg) `;//scale(${scale})
    image.style.transform = image.style.transform + transform ;
    if(this.imagesize && !this.imageRotate){
      if(window.innerWidth <= 400){
        image.style.width = `calc(100% + 27vh)`;
      }else{
        image.style.width = `82vh`;//`calc(${this.currentHeight} - 16vh)`
      }
      this.imageRotate = true;
    }else if (this.imagesize && this.imageRotate){
      image.style.width = `100%`;
      this.imageRotate = false;
    }
   
  }
}
