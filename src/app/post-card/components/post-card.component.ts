import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() postInfo;
  @Output() idPostEvent = new EventEmitter<number>();
  urlImgApi = environment.urlImgApi;
  
  
  constructor(
  ) {
  }

  ngOnInit(): void {
    
  }

  openPost():void{
    this.idPostEvent.emit(this.postInfo.idPost);
  }
}

