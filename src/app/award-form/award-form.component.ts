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
  actorForm: NgForm;
  @ViewChild('actorForm')
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

}
