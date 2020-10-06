import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
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
      {
        path: 'admin',
        component: AdminComponent,
      },
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
