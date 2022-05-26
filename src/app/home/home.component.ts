import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  sign: any;
  road: any;
  speed: any;
  style: any;
  destination: any;
  L1: any;
  L2: any;
  L3: any;
  designSpeed: any = [];
  languages: any = [];
  designStyle: any = [];
  roadCategory: any = [];
  signTypes: any = [];
  signvalue: boolean | undefined;

  constructor(private Rou: Router, private fb: FormBuilder, private commonservice: CommonService) {
    this.form = fb.group({
      sign: ['', Validators.required],
      road: ['', Validators.required],
      speed: ['', Validators.required],
      style: ['', Validators.required],
      destination: ['', Validators.required],
      L1: ['', Validators.required],
      L2: [''],
      L3: ['']
    })
  }

  ngOnInit(): void {
    this.signvalue = true;
    this.commonservice.RequestGet().subscribe((res: any) => {
      console.log(res);
      this.designSpeed = res[0].designSpeed;
      this.designStyle = res[0].designStyle;
      this.languages = res[0].languages;
      this.roadCategory = res[0].roadCategory;
      this.signTypes = res[0].signTypes;
    })
  }

  Next() {
    let params = {
      "signTypes": this.form.value.sign,
      "roadCategory": this.form.value.road,
      "designSpeed": this.form.value.speed,
      "designStyle": this.form.value.style,
      "languages": [this.form.value.L1, this.form.value.L2, this.form.value.L3]
    }
    this.commonservice.HomeData = params;
    this.Rou.navigate(['/detail', { param: this.form.value.destination }]);

  }

  signvalues() {
    if (this.form.value.sign == "PLACE IDENTIFICATION") {
      this.signvalue = false;
    }
    console.log(this.signvalue);

  }
}
