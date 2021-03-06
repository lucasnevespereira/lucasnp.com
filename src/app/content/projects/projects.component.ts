import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllProjects().pipe(
      map(projects => projects.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()))
    ).subscribe((res) => {
      this.projects = res;
    });
  }
}
