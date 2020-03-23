import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "Pasticho",
      "Great Venezuelan recipe",
      "https://t1.rg.ltmcdn.com/es/images/0/2/6/img_pasticho_con_jamon_y_queso_33620_orig.jpg"
    ),
    new Recipe(
      "Pasta Carbonara",
      "Great Italian Food",
      "https://t1.rg.ltmcdn.com/es/images/0/2/6/img_pasticho_con_jamon_y_queso_33620_orig.jpg"
    )
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeClicked(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
    console.log(recipe);
  }
}
