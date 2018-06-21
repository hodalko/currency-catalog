import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';


@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

    currentPage: number = 1;
    maxPage: number;
    pageSizes: number[] = [10,50,100];
    pageSize: number = 10;
    filterName: string = "all";
    filterValue: string = null;
    filterNames: string[];
    
    title = 'Available currencies';
    currencies: Currency[];
    selectedCurrency: Currency;
    
  constructor(
     private currencyService: CurrencyService) {
         this.filterNames = ["all","id","code","name","type"]
     }
    
  ngOnInit() {
      this.getCurrencies();
  }

   updatePageSize(){
       this.currentPage=1;
       this.onChange();
   }
    
   searchFilter(){
       this.currentPage=1;
       this.onChange();
    }
   onChange(){
       console.log(this.currentPage);
       console.log(this.pageSize);
       console.log(this.filterName);
       console.log(this.filterValue );
       this.currencyService.getCurrenciesByCriteria(this.currentPage,this.pageSize,this.filterName,this.filterValue).subscribe(result=>{
           console.log("getCurrenciesByCriteria");
           console.log(result['data']);
           this.currencies= result['data'];
           this.maxPage= result['meta']['pages'];
       })
    }

   navigateTo(pageNum){
       this.currentPage = pageNum;
       this.onChange();
    }
    
    getCurrencies200(): void {
        this.currencyService.getCurrencies200()[0].subscribe(result => {
            this.currencies= result['data'];
            this.maxPage= result['meta']['pages'];
            this.currencyService.getCurrencies200()[1].subscribe(result => {
                this.currencies = this.currencies.concat(result);
            });
        });
    }
    
    getCurrencies(): void {
        this.currencyService.getCurrencies().subscribe(result => {
               this.currencies= result['data'];
               this.maxPage= result['meta']['pages'];
        });
    }    
}
