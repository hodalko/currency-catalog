import { Injectable } from '@angular/core';

import { Currency } from './currency';
import { CURRENCIES } from './mock-currencies';
//import { Http} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/vnd.api+json' })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    constructor(private http: HttpClient) { }
    
    private baseUrlGoldenSource = "https://api.openfintech.io/v1/";
    private currenciesUrl = "currencies";
    
    getCurrenciesMock(): Observable<Currency[]> {
        return of(CURRENCIES);
    } 
    
    getCurrencies(): Observable<any> {
        var currencies = [];
        let paramFirstHundred = new HttpParams().set('page[number]',"1").set('page[size]',"10");
        return this.http.get<Currency[]>(this.baseUrlGoldenSource+this.currenciesUrl, {params: paramFirstHundred});
    }
    
    getCurrencies200(): Observable<any>[] {
        var currencies = [];
        let paramFirstHundred = new HttpParams().set('page[number]',"1").set('page[size]',"100");
        const reqFirstHundred = this.http.get<Currency[]>(this.baseUrlGoldenSource+this.currenciesUrl, {params: paramFirstHundred});
        let paramSecondHundred = new HttpParams().set('page[number]',"2").set('page[size]',"100");
        const  reqSecondHundred = this.http.get<Currency[]>(this.baseUrlGoldenSource+this.currenciesUrl, {params: paramSecondHundred}).pipe(map(response => response['data']));
        return [reqFirstHundred, reqSecondHundred];
    }
    
    getCurrenciesByCriteria(currentPage,size,filterName,filterValue):Observable<any> {
        console.log("hello");
        if(filterName==null || filterValue==null || filterValue === ""){
            console.log("hello filterName==null");
            let param = new HttpParams()
                .set('page[number]',currentPage)
                .set('page[size]',size);
            return this.http.get(this.baseUrlGoldenSource+this.currenciesUrl, {params: param});
        }
    
        if(filterName !=="id"){
            console.log("hello filterName!=null&&filterName==!id");
                let apiFilterNam;
            apiFilterNam = filterName=="type"? "currency_type" : (filterName=="all"? "search" : filterName);
            let param = new HttpParams()
                .set('page[number]',currentPage)
                .set('page[size]',size)
                .set('filter['+apiFilterNam+']',filterValue);
            return this.http.get(this.baseUrlGoldenSource+this.currenciesUrl, {params: param});
        }
        if(filterName==="id"){
            console.log("hello filterName===id");
            return this.http.get(this.baseUrlGoldenSource+this.currenciesUrl+"/"+filterValue);
        }
    }
    getCurrency(id): Observable<Currency>{
        return this.http.get(this.baseUrlGoldenSource+this.currenciesUrl+"/"+id).pipe(
        map(response => response['data']));
    } 
}