import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRegistro } from '../models/usuario-registro.model';
import { FormsValidation } from 'src/validators/forms.validator';
import { MasterdataService } from 'src/app/shared/services/masterdata.service';
import { Pais } from 'src/app/shared/models/pais-model';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @ViewChild("content") content : any;
  registerForm: FormGroup;
  usuarioRegistro: UsuarioRegistro;

  usuarioOauth: UsuarioRegistro = {nombre:"Sergi", apellido1:"Ahmad", apellido2:null,email:"sak@gmail.com",idPais:null,sexo:null}

  sexoItems: Array<string>;
  paisItems: Array<Pais>;

  panelOpenState: boolean = false;

  messageError:string;
  openModalSuccess = false;
  
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private masterDataService: MasterdataService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) {
    this.usuarioRegistro = {
      nombre:null,
      apellido1:null,
      apellido2:null,
      email:null,
      idPais:null,
      sexo:null,
      onlyFansAccount: null,
      fanslyAccount: null
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
      idPais: [
        this.usuarioOauth.idPais ? this.usuarioOauth.idPais : null,
        [Validators.required],
      ],
      onlyFansAccount:[],
      fanslyAccount: []
    })
  }

  loadSexoItems():void {
    this.translate.get('CORE.HOMBRE').subscribe((translated: string) => {
      this.sexoItems = [this.translate.instant("CORE.HOMBRE"),this.translate.instant('CORE.MUJER'),this.translate.instant('CORE.OTRO')];
    });
  }

   loadPaisItems(): void{
    this.masterDataService.getPaises()
    .then((r:Array<Pais>)=>{
      this.paisItems = r;
    })
    .catch((e:string)=>{
      console.log(this.translate.instant("API_ERROR."+e));
    })
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
      .then((r:String)=>{
        this.modalService.open(this.content);
      })
      .catch((e:string)=>{
        this.messageError = this.translate.instant("API_ERROR."+e);
      })
      
    }
  }

  closeModal(): void{
    this.router.navigate(["/home"]);
  }
}
