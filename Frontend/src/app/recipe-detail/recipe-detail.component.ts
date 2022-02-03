import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  urlTree: any;
  id: string |null;
  i=0;
  recipes = {
    id: '',
    title: '',
    description: '',
    preparation: '',
    notes: '',
    image: [] as String[],
    ingredients: [] as any,
    steps: [] as any,
    user: [] as any,
    stars: [] as any,
    qualification: 0,
    qualificationDetails: [] as any,
    comments: [] as any,
    date: new Date()

  }
  ;
  images: String[] = [];
  comment: any={comment: ''};
  qualification: any={qualification: 0};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   }
   auth = this.authService;

  ngOnInit(): void {
    this.onGetRecipe();
  }
  onGetRecipe(){
    this.recipesService.getRecipe(this.id).subscribe
    (
      (response) => {
        this.recipes = response.params.recipe;
        this.images = this.recipes.image.map((image:any) => image);      
      }
    );
  }
  onSubmitComment( ){
    this.recipesService.addComment(this.id, this.comment).subscribe
    (
      (response) => {
        this.onGetRecipe();
        this.comment = {comment: ''};
      }
    );
  }
  onSelectStars(stars: number){
    this.qualification.qualification = stars;
  }
  onSubmitQualification(){
    this.recipesService.addQualification(this.id, this.qualification).subscribe
    (
      (response) => {
        this.onGetRecipe();
        this.qualification = {qualification: 0};
      }
    );
  }


}
