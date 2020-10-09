import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  socials = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getAllSocials().subscribe((res) => {
      this.socials = res;
    });
  }
}
