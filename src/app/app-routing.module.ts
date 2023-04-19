import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/components/registro.component';
import { OnlyfansComponent } from './onlyfans/components/onlyfans.component';
import { CreacionPostComponent } from './creacion-post/components/creacion-post.component';
import { FanslyComponent } from './fansly/components/fansly.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'onlyfans', component: OnlyfansComponent },
  { path: 'fansly', component: FanslyComponent },
  { path: 'post-cr', component: CreacionPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }