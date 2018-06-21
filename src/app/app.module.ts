import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currencies/currencies.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencyDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
