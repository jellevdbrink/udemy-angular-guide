import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipePlsSelectComponent } from "./recipe-pls-select/recipe-pls-select.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
    { path: '', component: RecipePlsSelectComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
