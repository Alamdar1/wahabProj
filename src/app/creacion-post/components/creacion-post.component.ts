import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionPost } from '../models/creacion-post.model';
import { PostService } from 'src/app/post-card/services/post.service';


@Component({
  selector: 'app-creacion-post',
  templateUrl: './creacion-post.component.html',
  styleUrls: ['./creacion-post.component.css']
})
export class CreacionPostComponent {
  active = 1;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
  }

  subidaFoto(event): void{
  }

  addPost(): void{
  }
}
