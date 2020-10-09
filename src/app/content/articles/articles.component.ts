import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getAllArticles().subscribe((res) => {
      this.articles = res;
    });
  }
}
