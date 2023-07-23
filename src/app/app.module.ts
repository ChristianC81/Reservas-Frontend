import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu'; // Import 'mat-menu' component from Angular Material
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule} from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { ServiLoginRegService } from '../service/servi-login-reg.service';

import { HttpClientModule } from '@angular/common/http';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { RegistrosComponent } from './registros/registros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponentRegistro } from './registros/form.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AdminheaderComponent } from './administrador/adminheader/adminheader.component';
import { AdminpublicacionComponent } from './administrador/adminpublicacion/adminpublicacion.component';
import { AdminusuarioComponent } from './administrador/adminusuario/adminusuario.component';
import { AdmingestionComponent } from './administrador/admingestion/admingestion.component';
import { AdminfooterComponent } from './administrador/adminfooter/adminfooter.component';
import { AdmininicioComponent } from './administrador/admininicio/admininicio.component';
import { FormComponentPubli } from './publicacion/form.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ReservaComponent } from './reserva/reserva.component';
import { FormComponentPedido } from './reserva/form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { MisSalonesComponent } from './mis-salones/mis-salones.component';
import { PublicacionesDetalleComponent } from './publicaciones/publicaciones-detalle/publicaciones-detalle.component';
import { SalonDetalleComponent } from './mis-salones/salon-detalle/salon-detalle.component';
import { ModalReservasComponent } from './mis-salones/modal-reservas/modal-reservas.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    LoginRegisComponent,
    PublicacionComponent,
    RegistrosComponent,
    FormComponentRegistro,
    AdminheaderComponent,
    AdminpublicacionComponent,
    AdminusuarioComponent,
    FormComponentPubli,
    AdmingestionComponent,
    AdminfooterComponent,
    AdmininicioComponent,
    RegistroUsuarioComponent,
    ReservaComponent,
    FormComponentPedido,
    PublicacionesComponent,
    MisSalonesComponent,
    PublicacionesDetalleComponent,
    SalonDetalleComponent,
    ModalReservasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    CarouselModule.forRoot(),
    SlickCarouselModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatIconModule,

  ],
  providers: [ServiLoginRegService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
      
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('270459842293906')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
