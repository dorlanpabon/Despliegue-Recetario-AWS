import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {RecipesService} from '../services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  recipes = [{
    id: '',
    title: '',
    description: '',
    image: [] as any,
    ingredients: [] as any,
    steps: [] as any,
    user: 0,
    stars: [] as any,
    qualification: 0,
    comments: [] as any,
    date: new Date()

  }
  ];


  constructor( private authService:AuthService, private recipesService:RecipesService ) { }
  auth = this.authService;
  ngOnInit(): void {

    this.recipesService.getTopRecipes().subscribe(
      (data) => {
        this.recipes = data;
      }
    );

  }

}
