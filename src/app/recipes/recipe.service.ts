import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Pannenkoeken',
      'Lekkere pannenkoeken van heit',
      'https://www.lekkerensimpel.com/wp-content/uploads/2016/10/IMG_3947.jpg',
      [
        new Ingredient('Bloem', 600),
        new Ingredient('Rozijnen', 20),
        new Ingredient('Ei', 6)
      ]
    ),
    new Recipe(
      'Burger',
      'vlees vlees vlees',
      'https://www.gardengourmet.nl/sites/default/files/recipes/aeead5804e79ff6fb98b2039619c5230_200828_MEDIAMONKS_GG_Spicytarian.jpg',
      [
        new Ingredient('Vlees', 1),
        new Ingredient('Broodje', 2),
        new Ingredient('Bacon', 5)
      ]
    )
  ];

  public recipeSelected = new EventEmitter<Recipe>();

  getRecipeById(id: number) {
    return this.getRecipes()[id];
  }

  getRecipes() {
    return this.recipes.slice();
  }
}
