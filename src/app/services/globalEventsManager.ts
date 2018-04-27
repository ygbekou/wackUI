import { EventEmitter, Injectable} 	from "@angular/core";
import { User } 					from '../models/user';

@Injectable()

export class GlobalEventsManager {
    public showNavBar: EventEmitter<User> = new EventEmitter<User>();


    constructor() {

    }
}