import {AfterViewInit, Directive, ElementRef, Input, Renderer2, SimpleChanges, OnChanges} from '@angular/core';

@Directive({
  selector: '[background-image]'
})
export class BgImageDirective implements AfterViewInit, OnChanges {
  private el: HTMLElement;
  @Input('background-image') backgroundImage: string;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.el = this.elRef.nativeElement;
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes['backgroundImage'] ) {
      this.setBackgroundImage();
    }
  }

  setBackgroundImage() {
    this.renderer.setStyle(this.el, 'backgroundImage', `url(${ this.backgroundImage })`);
  }
}
