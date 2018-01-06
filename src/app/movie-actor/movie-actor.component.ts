import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css'],
  animations: [fadeInAnimation]
})
export class MovieActorComponent implements OnInit {
  movieActorForm: NgForm;
  @ViewChild('movieActorForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  movieId: number;
  actors;

  getActors() {
    this.dataService.getRecords("actors")
      .subscribe(
      actors => console.log(this.actors = actors),
      error => this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.movieId = +params['id'];
      });
      this.getActors();
  }

  saveActorToMovie(movieActorForm: NgForm) {
    console.log(movieActorForm.value);
    this.dataService.addRecord(`movies/${this.movieId}/actors`, movieActorForm.value)
      .subscribe(
      actor => this.successMessage = "Record updated successfully",
      error => this.errorMessage = <any>error);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.movieActorForm = this.currentForm;
    this.movieActorForm.valueChanges
      .subscribe(
      data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.movieActorForm.form;

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

  formErrors = {};

  validationMessages = {};

}
