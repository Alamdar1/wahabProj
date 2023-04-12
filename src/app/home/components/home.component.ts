import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
  
  @ViewChild("content") content : any;
  modalTitle: string = "";
  modalBody: string = "";

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  openModal(idPost:string): void{
    var post = this.postsMock.find(p=> p.idPost===idPost);
    this.modalTitle = post.title;
    this.modalBody = post.desc;
    this.modalService.open(this.content);
  }

  closeModal(): void{

  }
}
