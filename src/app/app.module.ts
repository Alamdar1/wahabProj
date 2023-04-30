import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { gapi } from "gapi-script";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { RegistroComponent } from "./registro/components/registro.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { UsuarioService } from "./usuarios/usuario.service";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CreacionPostOfComponent } from "./creacion-post-of/components/creacion-post-of.component";
import { CreacionPostFlComponent } from "./creacion-post-fl/components/creacion-post-fl.component";

//Externos
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "angularx-social-login";
import { AuthService } from "./auth.service";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OnlyfansComponent } from "./onlyfans/components/onlyfans.component";
import { PostCardComponent } from "./post-card/components/post-card.component";
import { CreacionPostComponent } from "./creacion-post/components/creacion-post.component";
import { TruncatePipe } from "src/pipes/truncate.pipe";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FanslyComponent } from "./fansly/components/fansly.component";
// import { GoogleComponent } from "./login/google/google/google.component";
import { FacebookComponent } from "./login/facebook/facebook.component";
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from "angularx-social-login";
import { SigninComponent } from "./signin/signin.component";
registerLocaleData(localeEs, "es");

export const createTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(
    http,
    environment.LANGUAGE_ASSETS_PATH,
    `.json?cb=${new Date().getTime()}`
  );

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    OnlyfansComponent,
    PostCardComponent,
    CreacionPostComponent,
    TruncatePipe,
    CreacionPostOfComponent,
    CreacionPostFlComponent,
    FanslyComponent,
    FacebookComponent,
    // GoogleComponent,
  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    NgbAccordionModule,
    BrowserModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NgbNavModule,
    CdkVirtualScrollViewport,
    ScrollingModule,
    ExperimentalScrollingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    NgxSpinnerModule.forRoot({ type: "square-jelly-box" }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],

  exports: [TranslateModule],
  providers: [
    UsuarioService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("1863761144006894"),
          },
          AuthService,
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     "1062030842794-muv1i2v33c275tasf62knvmv1m0g8cgu.apps.googleusercontent.com"
          //   ),
          // },
        ],
      } as SocialAuthServiceConfig,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
