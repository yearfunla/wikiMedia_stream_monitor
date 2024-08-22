import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Stream details'
  // }
];

export default routeConfig;
