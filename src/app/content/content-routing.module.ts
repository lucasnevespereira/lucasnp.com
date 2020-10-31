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
        pathMatch: 'prefix',
        component: SkillsComponent,
      },
      {
        path: 'articles',
        pathMatch: 'prefix',
        component: ArticlesComponent,
      },
      {
        path: 'admin',
        pathMatch: 'prefix',
        component: AdminComponent,
      },
      {
        path: '**', redirectTo: '/',
        pathMatch: 'prefix',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
