import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  rootUrl = environment.adminUrl
  articles = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllArticles().subscribe(res => {
      this.articles = res;
    })
  }

}
