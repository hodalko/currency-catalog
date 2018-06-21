import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrenciesComponent }      from './currencies/currencies.component';
import { CurrencyDetailComponent }      from './currency-detail/currency-detail.component';

const routes: Routes = [
    { path: 'currencies', component: CurrenciesComponent },
    { path: '', component: CurrenciesComponent , pathMatch: 'full'},
    { path: 'currency/:id', component: CurrencyDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 
}
