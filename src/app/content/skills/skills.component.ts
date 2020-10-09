import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getAllSkills().subscribe((res) => {
      this.skills = res;
    });
  }
}
