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
  selector: 'app-onlyfans',
  templateUrl: './onlyfans.component.html',
  styleUrls: ['./onlyfans.component.css']
})
export class HomeComponent {

  posts: Array<Post> = [];
  urlImgApi = environment.urlImgApi;
  request: FiltroPostRequest = {"pais":["España"],"sexo":"Hombre"};
  
  @ViewChild("content") content : any;
  modalTitle: string = "";
  modalBody: string = "";
  modalImg: string = "";
  modalIdPost: number;

  openForm:boolean = false;

  imagenComprobante: File;
  textExtraido!: string;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.cargarPosts();
    
  }

  cargarPosts():void{
    this.postService.getPostsOF(this.request)
    .then((r: Array<Post>)=>{
      this.posts = r;
    })
    .catch((e: string)=>{

    })
  }

  openModal(idPost:number): void{
    var post = this.posts.find(p=> p.idPost===idPost);
    this.modalIdPost = post.idPost;
    this.modalTitle = post.username;
    this.modalBody = post.descripcion;
    this.modalImg = this.urlImgApi+post.foto;
    this.modalService.open(this.content);
  }

  verify(): void{
    this.openForm = true;
  }

  subidaComprobante(event): void {
    this.spinner.show();
    var reader = new FileReader();
    this.imagenComprobante = event.target.files[0];
    
    if (this.imagenComprobante) {
      var path = (window.URL || window.webkitURL).createObjectURL(this.imagenComprobante);
      this.recognizeText(path)
      .then(()=>{
        let arrDesc: Array<string> = this.modalBody.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/[" """]+/);
        let arrOCR: Array<string> = this.textExtraido.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/[" """]+/);
        const parecidos = arrDesc.filter(x=> arrOCR.includes(x) && x!="");
        console.log(parecidos);
        this.logicaComprobacion(parecidos);
      })
      .finally(()=>{
      this.spinner.hide();
      })
    }
  }

  logicaComprobacion(parecidos: Array<string>):void{
    if (parecidos && parecidos.length>2){
      Swal.fire({
        title: 'Verificación completada',
        icon: 'success',
        confirmButtonText: 'Nice'
      })
      this.creacionHistorico();
    }else{
      Swal.fire({
        title: 'Verificación erronea',
        icon: 'error',
        confirmButtonText: 'Volver a verificar'
      })
      this.imagenComprobante = null;
    }
  }

  async creacionHistorico(): Promise<void>{
    const creaHistReq : CreacionHistoricoRequest = {idPerfilLogged:999,idPost:this.modalIdPost};
    this.postService.createHistorico(creaHistReq)
    .then((r:string)=>{
      var postObject = this.posts.find(p=> p.idPost===this.modalIdPost);
      var indexPostActual = this.posts.indexOf(postObject);
      var postNewObject = this.posts[indexPostActual+1];
      this.posts = this.posts.filter(p=>p.idPost!=postObject.idPost);
      //Si no quedan mas posts...
      if(!postNewObject){
        this.modalService.dismissAll();
        this.imagenComprobante = null;
      }else{
        this.modalImg = this.urlImgApi+postNewObject.foto;
        this.modalIdPost = postNewObject.idPost;
        this.modalBody = postNewObject.descripcion;
        this.modalTitle = postNewObject.username;
        this.openForm = false;
      }
      
    })
    .catch((e:string)=>{
      //Si falla al crear el histórico, que lo vuelvan a intentar
      Swal.fire({
        title: 'Verificación errónea',
        text: 'Se ha producido un error al guardar el resultado en BBDD. Inténtelo de nuevo',
        icon: 'error',
        confirmButtonText: 'Volver a verificar'
      })
    })
  }

  async recognizeText(path: string):Promise<void>{
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
