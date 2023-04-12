import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroPostRequest } from 'src/app/post-card/model/filtro-post-request';
import { Post } from 'src/app/post-card/model/post.model';
import { PostService } from 'src/app/post-card/services/post.service';

@Component({
  selector: 'app-onlyfans',
  templateUrl: './onlyfans.component.html',
  styleUrls: ['./onlyfans.component.css']
})
export class HomeComponent {
  postsMock = [{title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"2"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"1"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"2"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"3"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"4"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"5"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"1"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"2"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"3"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"4"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"2"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"3"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"4"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"5"},
  {title:"@sesi",desc:"hola soy el mas guapeton del barrio xupame too", idPost:"2"}];

  posts: Array<Post> = [];
  request: FiltroPostRequest = {"pais":["España"],"sexo":"Hombre"};
  
  @ViewChild("content") content : any;
  modalTitle: string = "";
  modalBody: string = "";

  constructor(
    private modalService: NgbModal,
    private postService: PostService
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
    this.modalTitle = post.username;
    this.modalBody = post.descripcion;
    this.modalService.open(this.content);
  }

  closeModal(): void{

  }
}
