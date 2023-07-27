import { Multimedia } from "../Multimedia";
import { SalonDto } from "../SalonDto";
import { UserDto } from "./UserDto";

export class PublicacionDto {
    salonDto: SalonDto;
    userDto: UserDto;
    multimedia: Multimedia[];
    images: string[];
}