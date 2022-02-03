import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creator-comment',
  templateUrl: './creator-comment.component.html',
  styleUrls: ['./creator-comment.component.css']
})
export class CreatorCommentComponent implements OnInit {

  
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
    comments: [] as any[],
    user: 0,
    qualification: 0,
    qualificationDetails: [],
    category: 0,
    categoryName: ''
  }
  ];
  commentReponse:any={
    id:0,
    comment:"",
    response:"",
    recipe:0
  };
  title:any;
  id:any;

  constructor( private authService:AuthService, 
    private recipesService:RecipesService, 
    private router:Router, 
    ) { }
  auth = this.authService;

  ngOnInit(): void {
    //Get recipes for user
    this.getRecipeUsers();

  }

  getRecipeUsers(){
    this.recipesService.getRecipesUser().subscribe(
      (recipes) => {
        this.recipes = recipes.map((r:any)=> {
            r.comments.map((c:any)=> {
            c.create_at=c.create_at.substring(0, 9)
            return c;
          })
          return r;
        });
      },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }



  onChangueComent(id:any,commentA:any,title:any,idcomment:any){
    this.commentReponse.response='';
    this.commentReponse.recipe=id;
    this.commentReponse.comment=commentA;
    this.commentReponse.id=idcomment;
    this.title=title;
    this.id=id;
  }
  addComment(){
    this.recipesService.addCommentResponse(this.id,this.commentReponse).subscribe(
      (response) => {
        this.getRecipeUsers()
      }
    );
  }

}
