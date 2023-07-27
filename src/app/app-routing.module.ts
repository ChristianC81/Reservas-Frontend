import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginRegisComponent } from './login-regis/login-regis.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { FormComponentPubli } from './publicacion/form.component';
import { AdmininicioComponent } from './administrador/admininicio/admininicio.component';
import { AdminusuarioComponent } from './administrador/adminusuario/adminusuario.component';
import { AdminpublicacionComponent } from './administrador/adminpublicacion/adminpublicacion.component';
import { AdmingestionComponent } from './administrador/admingestion/admingestion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { MisSalonesComponent } from './mis-salones/mis-salones.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
//import { formC } from './edit-profile/edit-profile.component';
import { FormComponent } from './mis-salones/salon/form.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InicioComponent},
  { path: 'loginReg', component: LoginRegisComponent },
  { path: 'publicaciones', component: PublicacionesComponent},
  { path: 'mis-salones', component: MisSalonesComponent},
  { path: 'salon', component: PublicacionComponent },
  { path: 'admininicio', component: AdmininicioComponent },
  { path: 'admininicio/usuarios', component: AdminusuarioComponent },
  { path: 'admininicio/publicaciones', component: AdminpublicacionComponent},
  { path: 'admininicio/gestion', component: AdmingestionComponent},
  { path: 'salon/publicar', component: FormComponentPubli },
  { path: 'regisUsu', component: RegistroUsuarioComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'salon/editar', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


