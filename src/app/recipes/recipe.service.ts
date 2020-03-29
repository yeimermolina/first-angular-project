import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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
    )
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
}
