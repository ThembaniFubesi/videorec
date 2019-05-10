import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public model = {
    video: null,
    effect: null,
  };

  public effectsForm: FormGroup;

  public effectList = [
    { text: 'Option 1', value: './assets/images/text1.gif' },
    { text: 'Option 2', value: './assets/images/text2.gif' },
    { text: 'Option 3', value: './assets/images/text3.gif' },
  ]

  constructor() { }

  ngOnInit() {
    this.effectsForm = new FormGroup({
      effect: new FormControl(this.effectList[0].value, Validators.required),
    });

    this.model.effect = this.effectList[0].value;

    this.effectsForm.get('effect').valueChanges.subscribe(e => this.model.effect = e);
  }

  onCaptured(source) {
    this.model.video = source;
  }

}
