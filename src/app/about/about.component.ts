import { Component, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leaderErrMess: string;
  
  constructor(private leaderService: LeaderService) { }
  
  ngOnInit() {
    //this.leadserervice.getLeaders().then(leaders => this.leaders = leaders);
    //this.leaders = this.leaderService.getLeaders();subscribe
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, 
      errmess => this.leaderErrMess = <any>errmess.message);
  }


}
