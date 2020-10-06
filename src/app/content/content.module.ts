import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContentService } from './content.service';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [ContentComponent, ProjectsComponent, SkillsComponent, ArticlesComponent, AdminComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ContentRoutingModule,
  ],
  providers: [ContentService]
})
export class ContentModule { }
