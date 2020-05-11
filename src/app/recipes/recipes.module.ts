import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipesStartComponent,
    RecipeEditComponent,
  ],
  imports: [RecipesRoutingModule, CommonModule, ReactiveFormsModule],
  //   exports: [
  //     RecipesComponent,
  //     RecipeListComponent,
  //     RecipeDetailComponent,
  //     RecipeItemComponent,
  //     RecipesStartComponent,
  //     RecipeEditComponent,
  //   ],
})
export class RecipesModule {}
