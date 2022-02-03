import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    constructor(private http: HttpClient) { }

    getRecipes() {
        return this.http.get<any>(environment.apiURL + '/recipes');
    }
    getRecipe(id: any) {
        return this.http.get<any>(environment.apiURL + '/recipes/show/' + id);
    }
    getRecipesUser() {
        return this.http.get<any>(environment.apiURL + '/recipes/user/');
    }
    getUsersRecipes() {
        return this.http.get<any>(environment.apiURL + '/recipes/users/');
    }
    postFilters(filters: any) {
        return this.http.post<any>(environment.apiURL + '/recipes/filters', filters);
    }

    getCategories() {
        return this.http.get<any>(environment.apiURL + '/recipes/categories');
    }
    getTopRecipes() {
        return this.http.get<any>(environment.apiURL + '/recipes/top');
    }
    createRecipe(recipe: any) {
        return this.http.post<any>(environment.apiURL + '/recipes/save', recipe);
    }
    updateRecipe(id: any, recipe: any) {
        return this.http.put<any>(environment.apiURL + '/recipes/update/' + id, recipe);
    }
    deleteRecipe(id: any) {
        return this.http.delete<any>(environment.apiURL + '/recipes/delete/' + id);
    }
    addComment(id: any, comment: any) {
        return this.http.post<any>(environment.apiURL + '/recipes/comment/save/' + id, comment);
    }
    getComments(id: any) {
        return this.http.get<any>(environment.apiURL + '/recipes/comments/show/' + id);
    }
    addQualification(id: any, qualification: any) {
        return this.http.post<any>(environment.apiURL + '/recipes/qualification/save/' + id, qualification);
    }
    addCommentResponse(id: any, event: any) {
        return this.http.post<any>(environment.apiURL + '/recipes/comment/response/' + id, event);
    }


}
