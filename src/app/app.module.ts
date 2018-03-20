import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes : Routes = [
  {path:'', component : HomeComponent, pathMatch: 'full'},
  {path:'user', component: UserComponent},
  {path:'about', component: AboutComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
