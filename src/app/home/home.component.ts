import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private promotionservice: PromotionService,
    private leadservice: LeaderService) { }

  ngOnInit() {
    // this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    // this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    // this.leadservice.getFeaturedLeader().then(leader => this.leader = leader);

    // this.dish = this.dishservice.getFeaturedDish();
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    // this.leader = this.leadservice.getFeaturedLeader();

    // //use error message
    // this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrMess = <any>errmess);
    // this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    // this.leadservice.getFeaturedLeader().subscribe(leader => this.leader = leader);

    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess.message);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess.message);
    this.leadservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess.message)

  }


}
