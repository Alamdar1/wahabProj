import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() postInfo;
  @Output() idPostEvent = new EventEmitter<number>();

  
  
  constructor(
  ) {
  }

  ngOnInit(): void {
    
  }

  openPost():void{
    this.idPostEvent.emit(this.postInfo.idPost);
  }
}

