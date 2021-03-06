import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private restangular: Restangular) { }

  // getDishes(): Promise<Dish[]> {
  //   return Promise.resolve(DISHES);
  // }
  // getDish(id: number): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  // }
  // getFeaturedDish(): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }

  // getDishes(): Promise<Dish[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }
  // getDish(id: number): Promise<Dish> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),
  //       2000);
  //   });
  // }
  // getFeaturedDish(): Promise<Dish> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]),
  //       2000);
  //   });
  // }

  // getDishes(): Promise<Dish[]> {
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }
  // getDish(id: number): Promise<Dish> {
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  // }
  // getFeaturedDish(): Promise<Dish> {
  //   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  // }

  // getDishes(): Observable<Dish[]> {
  //   return of(DISHES).pipe(delay(2000));
  // }

  // getDish(id: number): Observable<Dish> {
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  // }

  // getFeaturedDish(): Observable<Dish> {
  //   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  // }

  // getDishIds(): Observable<number[] | any> {
  //   return of(DISHES.map(dish => dish.id));
  // }

  // //use Observable
  // getDishes(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes');
  // }
  // getDish(id: number): Observable<Dish> {
  //   return this.http.get<Dish>(baseURL + 'dishes/' + id);
  // }
  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  // }
  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  // }

  // //handle error
  // getDishes(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes')
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  // getDish(id: number): Observable<Dish> {
  //   return this.http.get<Dish>(baseURL + 'dishes/' + id)
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map
  //     (dishes => dishes[0]))
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  //     .pipe(catchError(error => error));
  // }

  // use rest API
  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }
  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }
  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({ featured: true })
      .pipe(map(dishes => dishes[0]));
  }
  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error));
  }
}
