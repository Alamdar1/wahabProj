import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistroComponent } from "./registro/components/registro.component";
import { OnlyfansComponent } from "./onlyfans/components/onlyfans.component";
import { CreacionPostComponent } from "./creacion-post/components/creacion-post.component";
import { FanslyComponent } from "./fansly/components/fansly.component";
import { FacebookComponent } from "./login/facebook/facebook.component";
import { SigninComponent } from "./signin/signin.component";

const routes: Routes = [
  { path: "registro", component: RegistroComponent },
  { path: "onlyfans", component: OnlyfansComponent },
  { path: "fansly", component: FanslyComponent },
  { path: "post-cr", component: CreacionPostComponent },
  { path: "login", component: FacebookComponent },
  { path: "signin", component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
