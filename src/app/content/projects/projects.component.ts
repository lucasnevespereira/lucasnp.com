import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service'
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  rootUrl: string = environment.adminUrl
  projects = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllProjects().subscribe(res => {
      this.projects = res;
    })
  }

}
