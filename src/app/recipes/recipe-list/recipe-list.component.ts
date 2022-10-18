import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Pannenkoeken', 'Lekkere pannenkoeken van heit', 'https://www.lekkerensimpel.com/wp-content/uploads/2016/10/IMG_3947.jpg')
  ];
  @Output() clickRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  handleRecipeClick(recipe: Recipe) {
    this.clickRecipe.emit(recipe);
  }

}
