//export modelo recipe

export class Recipe {
    id!: number;
    title!: string;
    description!: string;
    images!: string[];
    ingredients!: Ingredient[];
    steps!: Step[];
    user!: number;
    stars!: Star[];
    comments!: Comment[];
    qualification!: number;
    category!: number;
    categoryName!: string;
    date!: Date;
}
export class Ingredient {
    id!: number;
    name!: string;
}
export class Step {
    id!: number;
    description!: string;
}
export class Star {
    id!: number;
    user!: number;
    recipe!: number;
}
export class Comment {
    id!: number;
    user!: number;
    content!: string;
    response!: string;
    date!: Date;
}
