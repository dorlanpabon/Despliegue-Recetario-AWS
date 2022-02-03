import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  formData = new FormData();

  recipes = [{
    id: 0,
    title: '',
    description: '',
    preparation: '',
    notes: '',
    image: [],
    ingredients: [],
    steps: [],
    comments: [],
    user: 0,
    qualification: 0,
    qualificationDetails: [],
    category: 0,
    categoryName: ''
  }
  ];
  recipeEdit = {
    id: 0,
    title: '',
    description: '',
    preparation: '',
    notes: '',
    image: [] as any,
    ingredients: [] as any,
    steps: [] as any,
    comments: [] as any,
    user: 0,
    qualification: 0,
    qualificationDetails: [],
    category: 0,
  };  
  recipeCreate = {
    id: 0,
    title: '',
    description: '',
    preparation: '',
    notes: '',
    image: [],
    ingredients: [] as any,
    steps: [],
    comments: [],
    user: 0,
    qualification: 0,
    qualificationDetails: [],
    category: 0
  };
  categories = [{
    id: 0,
    name: '',
  }];
  ingredients= [
    {
      id: 1,
      name: "Ingrediente 1",
  },];
  images : string[] = [];

  constructor( private authService:AuthService, 
    private recipesService:RecipesService, 
    private router:Router, 
    private categoriesService:CategoriesService,
    private http:HttpClient
    ) { }
  auth = this.authService;

  ngOnInit(): void {
    //Get recipes for user
    this.getRecipeUsers();
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );

  }
  getRecipeUsers(){
    this.recipesService.getRecipesUser().subscribe(
      (recipes) => {
        this.recipes = recipes;
      },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }

  backIngredient(){
    this.ingredients =[
      {
        id: 1,
        name: "Ingrediente 1",
    },]
  }
  
  deleteRecipe(recipe:any){
    this.recipeEdit = recipe;
    
  }
  register(){
    this.backIngredient()  
    this.images = [];  
  }
  editRecipe(recipe:any ){
    this.backIngredient();
    this.images=recipe.image.map((i:any)=> i);
    this.ingredients=recipe.ingredients.map((i:any)=> i);
    this.recipeEdit = JSON.parse(JSON.stringify(recipe)) ;
  }
  

}
