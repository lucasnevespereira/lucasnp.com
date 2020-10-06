import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalOpen: boolean = false;
  infos = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllInfos().subscribe(res => {
      this.infos = res;
      
    })
  }

  onClickModal() {
    this.modalOpen = !this.modalOpen;
  }

}
