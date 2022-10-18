import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick(event: Event) {
    if (this.isOpen) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.isOpen = false;
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.isOpen = true;
    }

  }
}
