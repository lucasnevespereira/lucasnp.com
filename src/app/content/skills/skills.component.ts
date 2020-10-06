import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  rootUrl = environment.adminUrl;
  skills = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllSkills().subscribe(res => {
      this.skills = res; 
    })
  }

}
