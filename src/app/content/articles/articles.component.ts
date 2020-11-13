import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllArticles().pipe(
      map(articles => articles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()))
    ).subscribe((res) => {
      this.articles = res;
    });
  }
}
