import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollCreateComponent } from './components/poll-create/poll-create.component';
import {FormsModule} from '@angular/forms';
import { PollViewComponent } from './components/poll-view/poll-view.component';
import { PollResultsComponent } from './components/poll-results/poll-results.component';
import { LatestPollsComponent } from './components/latest-polls/latest-polls.component';

import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { PollPieChartComponent } from './components/poll-pie-chart/poll-pie-chart.component';
import {ChartsModule} from 'ng2-charts';
import { PollBarChartComponent } from './components/poll-bar-chart/poll-bar-chart.component';
import { HomeComponent } from './components/home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { UserPollsComponent } from './components/user-polls/user-polls.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollViewComponent,
    PollResultsComponent,
    LatestPollsComponent,
    PollPieChartComponent,
    PollBarChartComponent,
    HomeComponent,
    UserPollsComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
