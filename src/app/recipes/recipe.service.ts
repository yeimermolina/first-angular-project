import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Pasticho",
      "Great Venezuelan recipe",
      "https://t1.rg.ltmcdn.com/es/images/0/2/6/img_pasticho_con_jamon_y_queso_33620_orig.jpg",
      [new Ingredient("Carrot", 12)]
    ),
    new Recipe(
      "Pasta Carbonara",
      "Great Italian Food",
      "https://t1.rg.ltmcdn.com/es/images/0/2/6/img_pasticho_con_jamon_y_queso_33620_orig.jpg",
      [new Ingredient("Apple", 1), new Ingredient("Meat", 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
}
