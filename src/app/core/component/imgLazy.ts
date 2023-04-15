import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {

  @Input() lazyLoadSrc!: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            this.el.nativeElement.src = this.lazyLoadSrc;
          };
          img.src = this.lazyLoadSrc;
          observer.unobserve(this.el.nativeElement);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }

}