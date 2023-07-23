import { CategoriaDto } from "../CategoriaDto";
import { ComplementoDto } from "./ComplementoDto";

export class SalonDto {
    idSalon: number;
    nombre: string;
    direccion: string;
    capacidad: number;
    disponibilidad: boolean;
    descripcion: string;
    precioSalon: number;
    calificacion: number;
    estado: boolean;
    garantiaDanos: number;
    complementos: ComplementoDto[];
    categoria: CategoriaDto;
}