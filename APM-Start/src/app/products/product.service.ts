import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  // we can access this service from any component or other service in the application
  // inject ProductService in the angular root injector
  providedIn: 'root',
})
export class ProductService {
  private productURl: string = 'api/products/products.json';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productURl).pipe(
      // allow us to look at the emmited items(data) without modifying it.
      tap((data) => console.log('Data: ', JSON.stringify(data))),
      // catching errors
      catchError(this.errorHandler)
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    let errMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client side error or network error
      errMessage = 'An error occured: ' + err.error.message;
    } else {
      // server side error
      errMessage =
        'Server returned code: ' +
        err.status +
        ', error messge: ' +
        err.message;
    }
    console.log(errMessage);

    return throwError(() => errMessage);
  }
}
