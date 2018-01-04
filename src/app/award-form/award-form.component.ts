import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-award-form',
  templateUrl: './award-form.component.html',
  styleUrls: ['./award-form.component.css'],
  animations: [fadeInAnimation]
})
export class AwardFormComponent implements OnInit {
  awardForm: NgForm;
  @ViewChild('awardForm')
  currentForm: NgForm;
  successMessage: string;
  errorMessage: string;
  actorId;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.actorId = params['id'];
      });
  }

  saveAward(awardForm: NgForm) {
      this.dataService.addRecord(`actors/${this.actorId}/awards`, awardForm.value)
        .subscribe(
        actor => this.successMessage = "Record updated successfully",
        error => this.errorMessage = <any>error);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.awardForm = this.currentForm;
    this.awardForm.valueChanges
      .subscribe(
      data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.awardForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'organization': '',
    'lastName': '',
    'title': ''
  };

  validationMessages = {
    'organization': {
      'required': 'Organization is required.',
      'minlength': 'Organization must be at least 2 characters long.'
    },
    'title': {
      'required': 'Title is required.',
      'minlength': 'Title must be at least 2 characters long.'
    }
  };

}
