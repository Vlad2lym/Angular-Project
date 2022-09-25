import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { catchError, Observable, retry, throwError } from "rxjs";
import { IProduct } from "../moduls/product";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    constructor (
        private http: HttpClient,
        private errorService: ErrorService
        ) { 
    }

    getAll (): Observable<IProduct[]> {
       return this.http.get<IProduct[]> ('https://fakestoreapi.com/products', {
        params: new HttpParams ({  // new HttpParams().append('limit', 5)
            fromObject: {limit: 5}
            //fromString: 'limit=5'
        })
       }).pipe(
        retry(1),
        catchError(this.errorHandler.bind(this))
       )
    }

    private errorHandler (error: HttpErrorResponse) {
        this.errorService.handle(error.message)
        return throwError(() => error.message)
    }
}