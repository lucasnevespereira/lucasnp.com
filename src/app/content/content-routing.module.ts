import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ContentComponent } from './content.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: '', component: ContentComponent, children: [
      {
        path: '', 
        component: ProjectsComponent, 
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
      },
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
