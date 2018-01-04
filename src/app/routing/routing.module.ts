import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent }   from '../movie/movie.component';
import { MovieFormComponent }   from '../movie-form/movie-form.component';
import { ActorComponent } from '../actor/actor.component';
import { ActorFormComponent } from '../actor-form/actor-form.component'
import { HomeComponent }   from '../home/home.component';
import { AwardFormComponent } from 'app/award-form/award-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'movie',  component: MovieComponent },
  { path: 'actor', component: ActorComponent },
  { path: 'actor/add', component: ActorFormComponent},
  { path: 'actor/edit/:id', component: ActorFormComponent },
  { path: 'movie/edit/:id', component: MovieFormComponent },
  { path: 'movie/add', component: MovieFormComponent },
  { path: 'actor/award/:id', component: AwardFormComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
