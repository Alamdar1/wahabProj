import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionPost } from '../../creacion-post/models/creacion-post.model';
import { PostService } from 'src/app/post-card/services/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/post-card/model/post.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-creacion-post-fl',
  templateUrl: './creacion-post-fl.component.html',
  styleUrls: ['./creacion-post-fl.component.css']
})
export class CreacionPostFlComponent {
  postForm: FormGroup;
  active = 1;
  creacionPost: CreacionPost;
  postPrecargado: Post;
  urlImgApi = environment.urlImgApi;
  messageError:string="";

  imagenSeleccionada: File;
  urlImagenSeleccionada;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.creacionPost = {
      idPerfil: null,
      foto: null,
      descripcion: null,
    };
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getPost(999);

  }

  buildForm(): void {
    this.postForm = this.formBuilder.group({
      idPerfil: [999],
      descripcion: [this.postPrecargado ? this.postPrecargado.descripcion : null,
      [Validators.required]],
      foto: []
    })
  }

  async getPost(idPerfil: number): Promise<void> {
    this.postService.getPostsByIdPerfil(idPerfil)
      .then((response: any) => {
        console.log(response);
        this.postPrecargado = response;
        this.buildForm();
        this.spinner.hide();
      })
      .catch((e:string)=>{
        this.messageError = this.translate.instant("API_ERROR."+e);
        this.spinner.hide();
      })
  }

  subidaFoto(event): void {
    var reader = new FileReader();
    this.imagenSeleccionada = event.target.files[0];
    reader.onload = (event: any) => {
      this.urlImagenSeleccionada = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  addPost(): void {
    if (this.postForm.invalid || this.controlImgNoSubida()) {
      this.controlImgNoSubida()
      this.postForm.markAllAsTouched();
    } else {
      this.spinner.show();
      const creacionRequest = this.postForm.getRawValue() as CreacionPost;
      if (this.imagenSeleccionada) {
        creacionRequest.foto = this.imagenSeleccionada;
      }
      this.postService.addPost(creacionRequest, this.imagenSeleccionada)
        .then((result: string) => {
          this.spinner.hide();
          Swal.fire({
            title: '¡Felicidades!',
            text: 'Tu post se ha creado correctamente, empieza a ganar puntos para que tu post sea visible para el resto de usuarios',
            icon: 'success',
            confirmButtonText: 'Nice'
          })
        })
        .catch((e:string)=>{
          this.spinner.hide();
          this.messageError = this.translate.instant("API_ERROR."+e);
        })
    }

  }

  getControl(name: any): AbstractControl | null {
    return this.postForm.get(name);
  }

  controlImgNoSubida(): boolean{
    if(!this.imagenSeleccionada && !this.postPrecargado.foto){
      this.messageError = this.translate.instant("CREACION_POST.FORM.ERROR.NOT_IMG_ATT");
      return true;
    }else if(this.imagenSeleccionada.type.indexOf('image') < 0){
      this.messageError = this.translate.instant("CREACION_POST.FORM.ERROR.FILE_NOT_IMG");
      return true;
    }else{
      this.messageError = "";
      return false;

    }
  }
}
