import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }
  // getPromotion(id: number): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }
  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }

  // getPromotions(): Promise<Promotion[]> {
  //   return Promise.resolve(PROMOTIONS);
  // }
  // getPromotion(id: number): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  // }
  // getFeaturedPromotion(): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]);    
  // }

  // getPromotions(): Promise<Promotion[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(PROMOTIONS), 2000);
  //   });
  // }
  // getPromotion(id: number): Promise<Promotion> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
  //   });
  // }
  // getFeaturedPromotion(): Promise<Promotion> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
  //   });
  // }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: number): Observable<Promotion> {
    return of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).pipe(delay(2000));
  }


}
