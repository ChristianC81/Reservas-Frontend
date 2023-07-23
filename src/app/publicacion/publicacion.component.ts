import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GrupoComplemento } from '../modelo/GrupoComplemento';
import { GrupocomplementoService } from '../../service/grupocomplemento.service';
import { SalonService } from '../../service/salon.service';
import { Salon } from '../modelo/Salon';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  grupocomplemento2: GrupoComplemento[] = []

  salones: Salon[] = []

  slickCarouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  public grupocomplemento: GrupoComplemento = new GrupoComplemento()

  constructor(private salonService: SalonService,private grupocomplementoService: GrupocomplementoService, private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    // this.cargarGrupoComplemento()
    // this.grupocomplementoService.getGrupoComplementos().subscribe(
    //   grupocomplemento => this.grupocomplemento2 = grupocomplemento
    // );
    // this.salonService.getSalones().subscribe(
    //   salones => this.salones = salones
    // );
  }

  cargarGrupoComplemento(): void {
    this.activatedRoute.params.subscribe(params => {
      let comgrupoid = params['comgrupoid']
      if (comgrupoid) {
        this.grupocomplementoService.getGrupoComplemento(comgrupoid).subscribe((grupocomplemento) => this.grupocomplemento = grupocomplemento)
      }
    })
  }
  public creategrupocomplemento(): void {
    this.grupocomplementoService.createGrupoComplemento(this.grupocomplemento).subscribe(
      grupocomplemento => {
        Swal.fire('Grupo Complemento Creado', `Grupo Complemento ${grupocomplemento.comgrupoid}`, 'success');
        this.router.navigate(['/publicacion/form']);
      }
    )
  }

  eliminarGrupoComplemento(comgrupoid: number) {
    this.grupocomplementoService.eliminarGrupoComplemento(comgrupoid).subscribe(
      grupocomplemento => {
        this.grupocomplementoService.getGrupoComplementos().subscribe(
          response => this.grupocomplemento2 = response
        )
        Swal.fire(
          'Eliminado!',
          'Grupo Complemento ha sido eliminado'
        )
      })
  }

}
