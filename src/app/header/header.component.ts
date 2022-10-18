import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  collapsed: boolean = true;
  @Output() navEvent = new EventEmitter<string>();

  toRecipes() {
     this.navEvent.emit('recipes');
  }

  toShoppingList() {
    this.navEvent.emit('shoppingList');
  }
}
