import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipePlsSelectComponent } from "./recipes/recipe-pls-select/recipe-pls-select.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipePlsSelectComponent },
    { path: ':id', component: RecipeDetailComponent },
    //{ path: ':id/edit', component: RecipeDetailComponent }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },

  { path: '', redirectTo: '/recipes', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
