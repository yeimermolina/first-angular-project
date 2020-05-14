import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangedSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{
      shoppingList: {
        ingredients: Ingredient[];
      };
    }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
