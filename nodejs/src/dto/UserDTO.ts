import {UserInterface} from "../models/UserModel";

export class UserDTO {
    id: number;
    username: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;

    constructor(user: UserInterface) {
        this.id = user.id;
        this.username = user.username;
        this.displayName = user.displayName;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
