import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PollCreateComponent} from './components/poll-create/poll-create.component';
import {PollViewComponent} from './components/poll-view/poll-view.component';
import {PollResultsComponent} from './components/poll-results/poll-results.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: PollCreateComponent},
  {path: ':pollId', component: PollViewComponent},
  {path: ':pollId/results', component: PollResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
