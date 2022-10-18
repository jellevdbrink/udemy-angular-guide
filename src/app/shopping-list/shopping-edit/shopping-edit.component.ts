import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output('recipeAdd') recipeAddEmit = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: false}) name: ElementRef;
  @ViewChild('amountInput', {static: false}) amount: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeAdd() {
    this.recipeAddEmit.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }

}
