import { Dish } from "./dish.type";
import { User } from "./user.type";

export type Rating = {
    id: number;
    iDish: Dish;
    idUser: User;
    nbStars: number;
    feedback: string;
};
