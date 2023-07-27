import { Persona } from '../Persona';
export class UserDto{
    idUser: number;
    email: string;
    username: string;
    persona: Persona;
    
    constructor(idUser?: number, email?: string, username?: string, persona?: Persona){
        this.idUser = idUser || 0;
        this.email = email || "";
        this.username = username || "";
        this.persona = persona || new Persona;
    }
}

