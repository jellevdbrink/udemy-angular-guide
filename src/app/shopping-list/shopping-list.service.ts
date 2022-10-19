import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Suiker', 200),
    new Ingredient('Bloem', 800)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    const existing = this.getIngredients().filter(ing => ing.name.toLowerCase() === ingredient.name.toLowerCase());
    if (existing.length === 0){
      this.ingredients.push(ingredient);
    } else {
      existing[0].amount += ingredient.amount;
    }


    this.ingredientsChanged.next(this.getIngredients());
  }
}
