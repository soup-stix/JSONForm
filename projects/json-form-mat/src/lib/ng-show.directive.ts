import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngShow]'
})
export class NgShowDirective implements OnChanges {
  @Input() ngShow!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ngShow']) {
      this.updateVisibility();
    }
  }

  private updateVisibility() {
    if (this.ngShow) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}