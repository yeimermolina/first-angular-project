import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put("https://angular-app-284a8.firebaseio.com/recipes.json", recipes)
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    //take subscribe only once to get the value and the unsubcribe directyly
    //exhaustmap replace the current observable with the one that is returned
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get<Recipe[]>(
    //       "https://angular-app-284a8.firebaseio.com/recipes.json",
    //       {
    //         params: new HttpParams().set("auth", user.token),
    //       }
    //     );
    //   }),
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients || [],
    //       };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipesService.setRecipes(recipes);
    //   })
    // );

    return this.http
      .get<Recipe[]>("https://angular-app-284a8.firebaseio.com/recipes.json")
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
