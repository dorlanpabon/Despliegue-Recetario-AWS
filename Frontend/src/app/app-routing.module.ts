import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatorComponent } from './creator/creator.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { CreatorCommentComponent } from './creator-comment/creator-comment.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path:'recipes', component: RecipesComponent, children: [
    /* {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent} */
  ]},
  { path:'login', component: LoginComponent},
  { path:'register', component: RegisterComponent},
  {path: 'detail/:id', component: RecipeDetailComponent},
  { path:'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ]},
  { path:'creator', component: CreatorComponent, canActivate: [ AuthGuard ]},
  { path:'creator-comment', component: CreatorCommentComponent, canActivate: [ AuthGuard ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
