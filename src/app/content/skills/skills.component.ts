import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllSkills().pipe(
      map(skills => skills.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()))
    ).subscribe((res) => {
      this.skills = res;
    });
  }
}
