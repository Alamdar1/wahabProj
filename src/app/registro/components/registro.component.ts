import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRegistro } from '../models/usuario-registro.model';
import { FormsValidation } from 'src/validators/forms.validator';
import { MasterdataService } from 'src/app/shared/services/masterdata.service';
import { Pais } from 'src/app/shared/models/pais-model';
import { UsuarioService } from 'src/app/usuarios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForm: FormGroup;
  usuarioRegistro: UsuarioRegistro;

  usuarioOauth: UsuarioRegistro = {nombre:"Sergi", apellido1:"Ahmad", apellido2:null,email:"sak@gmail.com",pais:null,sexo:null}

  sexoItems: Array<string>;
  paisItems: Array<Pais>;
  
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private masterDataService: MasterdataService,
    private usuarioService: UsuarioService,
  ) {
    this.usuarioRegistro = {
      nombre:null,
      apellido1:null,
      apellido2:null,
      email:null,
      pais:null,
      sexo:null
    };
  }

  ngOnInit(): void {
    this.loadSexoItems();
    this.loadPaisItems();
    this.buildForm()
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      nombre: [
        this.usuarioOauth.nombre ? this.usuarioOauth.nombre : null,
        [Validators.required, FormsValidation.isNotNumber],
      ],
      apellido1: [
        this.usuarioOauth.apellido1 ? this.usuarioOauth.apellido1 : null,
        [Validators.required, FormsValidation.isNotNumber],
      ],
      apellido2: [
        this.usuarioOauth.apellido2 ? this.usuarioOauth.apellido2 : null,
        [FormsValidation.isNotNumber],
      ],
      email: [
        {
          value: this.usuarioOauth.email ? this.usuarioOauth.email : null,
          disabled: true
        },
        [Validators.required],
      ],
      sexo: [
        this.usuarioOauth.sexo ? this.usuarioOauth.sexo : null,
        [Validators.required],
      ],
      pais: [
        this.usuarioOauth.pais ? this.usuarioOauth.pais : null,
        [Validators.required],
      ],
    })
  }

  loadSexoItems():void {
    this.translate.get('CORE.HOMBRE').subscribe((translated: string) => {
      this.sexoItems = [this.translate.instant("CORE.HOMBRE"),this.translate.instant('CORE.MUJER'),this.translate.instant('CORE.OTRO')];
    });
  }

  loadPaisItems(): void{
    this.masterDataService.getPaises()
    .subscribe({
      next: (v) => {this.paisItems = v},
      error: (e) => console.log(e),
      complete: () => console.log("completado")
    }
    )
  }

  getControl(name: any): AbstractControl | null{
    return this.registerForm.get(name);
  }

  onSubmit():void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }else{
      const usuarioRequest = this.registerForm.getRawValue() as UsuarioRegistro;
      this.usuarioService.addUsuario(usuarioRequest)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
        complete: () => console.log("completado")
        }
      )
      
    }
  }
}
