import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './pages/home/components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
