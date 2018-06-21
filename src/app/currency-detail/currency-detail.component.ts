import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../currency';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {

  currency: Currency;
  attributes: string [];
    
  constructor(
    private route: ActivatedRoute,
   private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrency();
    this.attributes = Object.getOwnPropertyNames(this.currency.attributes); 
  }

  getCurrency(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.currencyService.getCurrency(id).subscribe(currency => this.currency = currency);
      console.log(this.currency);
      this.currency = 
  {
    id: 'CUC',
    attributes: {
      code: 'CUC',
      name: 'Peso Convertible',
      currency_type: 'national',
      code_iso_numeric3: '931',
      code_iso_alpha3: 'CUC',
      symbol: '\f',
      native_symbol: null,
      category: 'others'
    }
  };
  }
    
}
