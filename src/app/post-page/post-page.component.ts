import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private rout: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.post$ = this.rout.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }

}
