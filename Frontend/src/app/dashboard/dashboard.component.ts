import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  }

  getRecipeUsers(){
    this.recipesService.getRecipesUser().subscribe(
      (res) => {
        this.recipes = res;
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
    this.images=[];  
  }
  showRecipe(recipe:any){
    // this.recipesService.setRecipe(recipe);
    // this.router.navigate(['/recipes/'+recipe]);
  }
  editRecipe(recipe:any ){
    this.backIngredient();
    this.images=recipe.image.map((i:any)=> i);
    this.ingredients=recipe.ingredients.map((i:any)=> i);
    this.recipeEdit =JSON.parse(JSON.stringify(recipe))
    console.log(this.recipeEdit);
  }

 
}
