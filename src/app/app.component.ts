import { Component, HostListener, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currLang : any = 'en-US';
  userinfo : any ;
  language :any;

  public router = inject(Router);
  public translateService = inject(TranslateService);
  public authService = inject(AuthService);
  constructor (
  ){
    this.translateService.addLangs(['ar-JO', 'en-US']);
    this.translateService.setDefaultLang(this.currLang);
  }
  
  // public selectLanguage (event : any) {
  //   this.translateService.use(event.target.value);
  // }
  public selectLanguage (event : any) {
    let lang = event.target.value;

    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);

    localStorage.setItem("language", lang);
  }
ngOnInit() {
 
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
    console.log(this.scrolled );
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
  
    clickToAdsEdit () {
      if (window.innerWidth >= 768) {
        this.router.navigate(['/monetize/d/edit']);
      }
      else {
        this.router.navigate(['/monetize/m/edit']);
  
      }
    }
}
