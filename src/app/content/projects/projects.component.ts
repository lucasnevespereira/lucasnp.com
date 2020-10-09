import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getAllProjects().subscribe((res) => {
      this.projects = res;
    });
  }
}
