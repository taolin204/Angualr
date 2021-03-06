import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;

  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  feedback: Comment;

  errMess: string;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'author is required.',
      'minlength': 'author must be at least 2 characters long.',
      'maxlength': 'author cannot be more than 25 characters long.'
    },
    'rating': {
      'required': 'rating Name is required.'
    },
    'comment': {
      'required': 'comment is required.'
    }
  };

  @ViewChild('fform') commentFormDirective;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
    this.createForm();
  }

  // ngOnInit() {
  //   const id = +this.route.snapshot.params['id'];
  //   //this.dish = this.dishservice.getDish(id);
  //   //this.dishservice.getDish(id).then(dish => this.dish = dish);
  //   this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
  // }

  createForm() {
    // this.feedbackForm = this.fb.group({
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   telnum: ['', Validators.required],
    //   email: ['', Validators.required],
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required]]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.feedback = this.commentForm.value;
    console.log(this.feedback);
    this.feedback.date = new Date().toISOString();
    console.log(this.feedback.date);
    // this.dish.comments.push(this.feedback);
    // console.log(this.feedback);
    this.dishcopy.comments.push(this.feedback);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();


  }

  ngOnInit() {
    // this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // this.route.params.pipe(switchMap((params: Params) => this.dishservice
    //   .getDish(+params['id'])))
    //   .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
    //     errmess => this.errMess = <any>errmess);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    // //REst save feature
    // this.route.params.pipe(switchMap((params: Params) => { { return this.dishservice.getDish(+params['id']); } }))
    //   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
    //     errmess => this.errMess = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => {
    this.visibility =
      'hidden'; return this.dishservice.getDish(+params['id']);
    }))
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';
      },
      errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
