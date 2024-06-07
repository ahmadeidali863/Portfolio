import { Component, HostListener, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { database } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currLang : string = 'en-US';
  userinfo : any ;
  color : boolean = false ;
  language :string = 'en-US';
  categories: any[] = [];
  public router = inject(Router);
  public translateService = inject(TranslateService);
  public authService = inject(AuthService);
   
  constructor ()
  {
    this.translateService.addLangs(['ar-JO', 'en-US']);
    this.translateService.setDefaultLang(this.currLang);
  }
  
  // public selectLanguage (event : any) {
  //   this.translateService.use(event.target.value);
  // }
  public selectLanguage( string : string) {
    let lang = string;
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    this.language = lang;
    localStorage.setItem("language", lang);
   
  } 
ngOnInit() {
  this.getdata();
 
  console.log( this.authService.getUserInfo());
}

  scrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.pageYOffset;
    if (yOffset > 20) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
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


    isExpanded = false;
    isloggedin = true;
    userName = '';
    theme : boolean = false;
    mobileMenu : boolean = false;
    userRole : string = "";
    fullName : string = "";
    pictureSrc : string = "";
    menu = false;
    defualtUserImage : string = "";
    uploadServer : any = "";
    cimage : boolean = true;
  
  
    collapse () {
      this.isExpanded = false;
    }
  
    toggle () {
      this.isExpanded = !this.isExpanded;
    }
  
    openHomePage () {
      this.router.navigate(['/']);
    }
    //-----------------OpenMobileMenu
    openMobileMenu () {
      if (this.mobileMenu == false) {
        document.getElementById("menuMobile")!.removeAttribute("class");
        document.getElementById("menuMobile")?.classList.add("openMenuMobile");
        this.mobileMenu = true;
      } else {
        document.getElementById("menuMobile")!.removeAttribute("class");
        document.getElementById("menuMobile")?.classList.add("closeMenuMobile");
        this.mobileMenu = false;
      }
    }
    menuToggle () {
      if (this.menu == false) {
        this.menu = true;
      } else {
        this.menu = false;
      }
    }
  
   
}
