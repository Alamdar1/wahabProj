import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroPostRequest } from 'src/app/post-card/model/filtro-post-request';
import { Post } from 'src/app/post-card/model/post.model';
import { PostService } from 'src/app/post-card/services/post.service';
import { environment } from 'src/environments/environment';

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
    this.modalImg = this.urlImgApi+post.foto;
    this.modalService.open(this.content);
  }

  closeModal(): void{

  }
}
