import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"


interface ProjectsResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  link: string;
  published_at: string;
  createdAt: string;
  image: {
    url: string;
  };
}

interface SkillsResponse {
  id: string;
  title: string;
  description: string;
  published_at: string;
  createdAt: string;
}

interface ArticlesResponse {
  id: string;
  title: string;
  description: string;
  link: string;
  published_at: string;
  createdAt: string;
  image: {
    url: string;
  };
}

interface SocialsResponse {
  id: string;
  link: string;
  published_at: string;
  createdAt: string;
  image: {
    url: string;
  }
}

interface InfosResponse {
  id: string;
  bio: string;
  published_at: string;
  createdAt: string;
  image?: {
    url: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  rootUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) { }

  getAllProjects() {
    return this.http.get<ProjectsResponse[]>(`${this.rootUrl}/projects`);
  }

  getAllSkills() {
    return this.http.get<SkillsResponse[]>(`${this.rootUrl}/skills`);
  }

  getAllArticles() {
    return this.http.get<ArticlesResponse[]>(`${this.rootUrl}/articles`);
  }

  getAllSocials() {
    return this.http.get<SocialsResponse[]>(`${this.rootUrl}/socials`);
  }

  getAllInfos() {
    return this.http.get<InfosResponse[]>(`${this.rootUrl}/infos`);
  }



}
