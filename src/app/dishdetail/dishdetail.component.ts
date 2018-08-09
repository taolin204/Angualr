import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;

  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  feedback: Comment;

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
    this.feedback.date = new Date().toLocaleString();
    console.log(this.feedback.date);
    this.dish.comments.push(this.feedback);
    console.log(this.feedback);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice
      .getDish(+params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
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
