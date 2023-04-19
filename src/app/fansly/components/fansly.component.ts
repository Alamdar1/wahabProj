import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreacionHistoricoRequest } from 'src/app/post-card/model/creacion-hist-request';
import { FiltroPostRequest } from 'src/app/post-card/model/filtro-post-request';
import { Post } from 'src/app/post-card/model/post.model';
import { PostService } from 'src/app/post-card/services/post.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { createWorker, Worker } from 'tesseract.js';

@Component({
  selector: 'app-fansly',
  templateUrl: './fansly.component.html',
  styleUrls: ['./fansly.component.css']
})
export class FanslyComponent {

  /* posts: Array<Post> = []; */
  urlImgApi = environment.urlImgApi;

  @ViewChild("content") content: any;
  modalTitle: string = "";
  modalBody: string = "";
  modalImg: string = "";
  modalIdPost: number;

  openForm: boolean = false;

  imagenComprobante: File;
  textExtraido!: string;

  //infiniteScrollLogic
  array = [];
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  pageSize = 9;
  lastLoadedPage = 0;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private spinner: NgxSpinnerService
  ) {
    this.appendItems(0, this.pageSize);
  }

  ngOnInit(): void {

  }

  cargarPosts(): void {
  }

  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.pageSize; i++) {
      if (((i + 1) % 5) == 0) {
        var request = { "pais": ["España"], "sexo": "Hombre", "page": this.lastLoadedPage, "size": this.pageSize, "idTipoPerfil": 2 };
        this.postService.getPostsOF(request)
          .then((r: Array<Post>) => {
            this.array = this.array.concat(r);
            console.log(this.array);
            
            this.lastLoadedPage++;
          })
          .catch((e: string) => {

          })
      }
    }
  }


  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown() {
    this.appendItems([], this.pageSize);
    this.direction = "down";
  }

  openModal(idPost: number): void {
    var post = this.array.find(p => p.idPost === idPost);
    this.modalIdPost = post.idPost;
    this.modalTitle = post.username;
    this.modalBody = post.descripcion;
    this.modalImg = this.urlImgApi + post.foto;
    this.modalService.open(this.content);
  }

  verify(): void {
    this.openForm = true;
  }

  subidaComprobante(event): void {
    this.spinner.show();
    var reader = new FileReader();
    this.imagenComprobante = event.target.files[0];

    if (this.imagenComprobante) {
      var path = (window.URL || window.webkitURL).createObjectURL(this.imagenComprobante);
      this.recognizeText(path)
        .then(() => {
          let arrDesc: Array<string> = this.modalBody.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/[" """]+/);
          let arrOCR: Array<string> = this.textExtraido.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/[" """]+/);
          const parecidos = arrDesc.filter(x => arrOCR.includes(x) && x != "");
          console.log(parecidos);
          this.logicaComprobacion(parecidos);
        })
        .finally(() => {
          this.spinner.hide();
        })
    }
  }

  logicaComprobacion(parecidos: Array<string>): void {
    if (parecidos && parecidos.length > 2) {
      Swal.fire({
        title: 'Verificación completada',
        icon: 'success',
        confirmButtonText: 'Nice'
      })
      this.creacionHistorico();
      if(this.array.length<6){
        this.onScrollDown();
      }
    } else {
      Swal.fire({
        title: 'Verificación erronea',
        icon: 'error',
        confirmButtonText: 'Volver a verificar'
      })
      this.imagenComprobante = null;
    }
  }

  async creacionHistorico(): Promise<void> {
    const creaHistReq: CreacionHistoricoRequest = { idPerfilLogged: 999, idPost: this.modalIdPost };
    this.postService.createHistorico(creaHistReq)
      .then((r: string) => {
        var postObject = this.array.find(p => p.idPost === this.modalIdPost);
        var indexPostActual = this.array.indexOf(postObject);
        var postNewObject = this.array[indexPostActual + 1];
        this.array = this.array.filter(p => p.idPost != postObject.idPost);
        //Si no quedan mas posts...
        if (!postNewObject) {
          var postNewObjectBack = this.array[indexPostActual -2];
          if(postNewObjectBack){
            this.modalImg = this.urlImgApi + postNewObjectBack.foto;
            this.modalIdPost = postNewObjectBack.idPost;
            this.modalBody = postNewObjectBack.descripcion;
            this.modalTitle = postNewObjectBack.username;
            this.openForm = false;
          }else{
            this.modalService.dismissAll();
          this.imagenComprobante = null;
          }
          
        } else {
          this.modalImg = this.urlImgApi + postNewObject.foto;
          this.modalIdPost = postNewObject.idPost;
          this.modalBody = postNewObject.descripcion;
          this.modalTitle = postNewObject.username;
          this.openForm = false;
        }

      })
      .catch((e: string) => {
        //Si falla al crear el histórico, que lo vuelvan a intentar
        Swal.fire({
          title: 'Verificación errónea',
          text: 'Se ha producido un error al guardar el resultado en BBDD. Inténtelo de nuevo',
          icon: 'error',
          confirmButtonText: 'Volver a verificar'
        })
      })
  }

  async recognizeText(path: string): Promise<void> {
    const worker = createWorker({
    });
    await (await worker).load();
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    const { data: { text } } = await (await worker).recognize(path);
    this.textExtraido = text;
    console.log(this.textExtraido);

    await (await worker).terminate();
  }


}
