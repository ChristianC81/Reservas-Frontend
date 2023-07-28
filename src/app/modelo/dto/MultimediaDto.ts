import { Salon } from "../Salon";
import { SalonDto } from "../SalonDto";

export class MultimediaDto {
    idMultimedia: number;
    url: string;
    imagen: string;
    salonDto: SalonDto;

    constructor(idMultimedia?: number, url?: string, imagen?: string, salonDto?: SalonDto){
        this.idMultimedia = idMultimedia || 0;
        this.url = url || "";
        this.imagen = imagen || "";
        this.salonDto = salonDto || new SalonDto;
    }
}
