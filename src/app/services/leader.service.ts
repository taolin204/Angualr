import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  // getLeaders(): Leader[] {
  //   return LEADERS;
  // }

  // getFeaturedLeader(): Leader {
  //   return LEADERS.filter((Leader) => Leader.featured)[0];
  // }

  // getLeaders(): Promise<Leader[]> {
  //   return Promise.resolve(LEADERS);
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   return Promise.resolve(LEADERS.filter((Leader) => (Leader.featured))[0]);    
  // }

  // getLeaders(): Promise<Leader[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(LEADERS), 2000);
  //   });
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(LEADERS.filter((Leader) => Leader.featured)[0]), 2000);
  //   });
  // }


  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }


  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }


}
