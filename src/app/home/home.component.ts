import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ImageModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  images: any[]=[];
  selectedImage:string='';
  imagesize:boolean=false;
  selectImage:boolean=false;
  currentWidth: number = 0;
  currentHeight: number = 0;
  private cdr = inject(ChangeDetectorRef);
constructor(){
 
}

  ngOnInit(): void {
    setTimeout(() => {
      this.image();
      this.cdr.detectChanges();
    }, 400);
 
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
  console.log(this.selectedImage + '----' + this.selectImage)
   }

    rotateAndScaleImage(degrees: number, scale: number){
    const image = document.getElementById('my-image') as HTMLImageElement;
    const transform = `rotate(${degrees}deg) `;//scale(${scale})
    image.style.transform = transform;
    if(this.imagesize){
      image.style.width = `82vh`;//`calc(${this.currentHeight} - 16vh)`
    }else{
      image.style.width = `70vw`;
    }
    console.log(image.style.width,this.imagesize)
   
  }
}
