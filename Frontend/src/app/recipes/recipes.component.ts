import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipesService } from '../services/recipes.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes = [{
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
    qualificationDetails: [] as any,
    category: 0,
  }];
  categories = [] as any;
  users=[ ] as any;
  filters={
    "categories":[] as any,
    "users":[]as any,
    "stars":0,
    "search":""
  }

  constructor(private authService:AuthService,
    private recipesService:RecipesService, private categoriesService:CategoriesService) { }
  auth = this.authService;

  ngOnInit(): void {
    this.getRecipes();
    this.recipesService.getCategories().subscribe
    (
      (data)=>{
        this.categories = data.params.categoriesCount;
      }
    );
    this.recipesService.getUsersRecipes().subscribe
    (
      (data)=>{
        this.users = data.params.usersCount;
      }
    );
  }
  getRecipes(){
    this.recipesService.getRecipes().subscribe
    (
      (data)=>{
        this.recipes = data;
      }
    );
  }

  filterCategory(id:any){
    if(this.filters.categories.includes(id)){
      this.filters.categories.splice(this.filters.categories.indexOf(id),1);
    }else{
      this.filters.categories.push(id);
    }
    this.filterSubmit();
  }
  filterUser(id:any){
    if(this.filters.users.includes(id)){
      this.filters.users.splice(this.filters.users.indexOf(id),1);
    }else{
      this.filters.users.push(id);
    }
    this.filterSubmit();
  }
  filterStars(num:any){
    if (this.filters.stars == num) {
      this.filters.stars = 0;
    }else{   
      this.filters.stars=num;
    }
    this.filterSubmit();
  }
  filterSearch(text:any){
    this.filters.search= text;
    this.filterSubmit();
  }
  filterSubmit(){
    if (this.filters.categories.length==0 && this.filters.users.length==0 && this.filters.stars==0 && this.filters.search==="") {
      return this.getRecipes();
    }    
    this.recipesService.postFilters(this.filters).subscribe
    (
      (data)=>{
        this.recipes = data;
      }
    );

  }
}

