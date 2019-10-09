import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {BookComponent} from './book/book.component';
import { BookService } from './book/book.service';

@NgModule({
  declarations: [
    AppComponent,BookComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,
    AppRoutingModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
