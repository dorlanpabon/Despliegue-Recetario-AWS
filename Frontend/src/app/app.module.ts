import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { TokenBearerService } from './services/token-bearer.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreatorComponent } from './creator/creator.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { CreatorCommentComponent } from './creator-comment/creator-comment.component';
import { PublicHeaderComponent } from './shared/components/public-header/public-header.component';
import { PublicFooterComponent } from './shared/components/public-footer/public-footer.component';
import { PrivateHeaderComponent } from './shared/components/private-header/private-header.component';
import { PrivateModalsCrudComponent } from './shared/components/private-modals-crud/private-modals-crud.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecipesComponent,
    DashboardComponent,
    CreatorComponent,
    RecipeDetailComponent,
    CreatorCommentComponent,
    PublicHeaderComponent,
    PublicFooterComponent,
    PrivateHeaderComponent,
    PrivateModalsCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    CommonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenBearerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
