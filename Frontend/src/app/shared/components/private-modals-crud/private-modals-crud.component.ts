import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RecipesService } from '../../../services/recipes.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-private-modals-crud',
  templateUrl: './private-modals-crud.component.html',
  styleUrls: ['./private-modals-crud.component.css'],
})
export class PrivateModalsCrudComponent implements OnInit {

  @Input()
  get recipeCreate(): any { return this._recipeCreate; }
  set recipeCreate(recipeCreate: any) { this._recipeCreate = (recipeCreate) || {} }
  @Input()
  get recipeEdit(): any { return this._recipeEdit; }
  set recipeEdit(recipeEdit: any) { this._recipeEdit = (recipeEdit) || {} }
  @Input()
  get ingredients(): any { return this._ingredients; }
  set ingredients(ingredients: any) { this._ingredients = (ingredients) || {}; }
  @Input()
  get images(): any { return this._images; }
  set images(images: any) { this._images = (images) || {}; }
  /* 
    // Eventos para incluir los datos
    @Input () recipeCreate:any;
    @Input () recipeEdit:any;
    @Input () images:any;
    @Input () ingredients:any;
    // Eventos paa devolver los datos
    */
  @Output() recipesEvent = new EventEmitter<any>();

  _recipeEdit: any = {};
  _recipeCreate: any = {};
  _images: any = [];
  _ingredients: any = [];

  formData = new FormData();


  categories = [{
    id: 0,
    name: '',
  }];

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router,
    private categoriesService: CategoriesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
    this.backIngredient();
  }

  getRecipeUsers() {
    this.recipesService.getRecipesUser().subscribe(
      (res) => {
        this.recipesEvent.emit(res);
      },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }


  addIngredient() {
    let next = this.ingredients.length + 1;
    this.ingredients.push({
      id: next,
      name: "Ingrediente " + next,
    });
  }

  createRecipe() {
    this.recipeCreate.ingredients = this.ingredients;
    this.formData.append('data', JSON.stringify(this.recipeCreate));
    this.recipeCreate.files = this.images;
    //this.recipesService.createRecipe(this.formData).subscribe(// Upload image to server express
    this.recipesService.createRecipe(this.recipeCreate).subscribe(// create recipe in aws lambda
      (response) => {
        this.getRecipeUsers();
      }
    );
    this.formData = new FormData();
    this.images = [];
    // this.getRecipeUsers() Traer las recetas del usuario
  }
  updateRecipe(id: any) {
    this.recipeEdit.ingredients = this.ingredients;
    this.formData.append('data', JSON.stringify(this.recipeEdit));
    this.recipeEdit.files = this.images;
    //this.recipesService.updateRecipe(id ,this.formData).subscribe(// Upload image to server express
    this.recipesService.updateRecipe(id, this.recipeEdit).subscribe(// update recipe in aws lambda
      (response) => {
        this.getRecipeUsers();
      }
    );
    this.formData = new FormData();
    this.images = [];
    // this.getRecipeUsers() Traer las recetas del usuario
  }
  confirmDelete(recipe: any) {
    ;
    this.recipesService.deleteRecipe(recipe.id).subscribe(
      (response) => {
        this.getRecipeUsers();
        //
      }
    );
  }
  backIngredient() {
    this.ingredients = [
      {
        id: 1,
        name: "Ingrediente 1",
      },]
  }

  onFileChange(event: any) {
    this.images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.formData.append('image', event.target.files[i]);
    }
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


}
