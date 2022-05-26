import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

export interface PeriodicElement {
  place: string;
  direction: string;
  distance: string;

}
const TABLE_DATA: any = [
  { place: '', direction: '', distane: '' },
];
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  displayedColumns: string[] = ['demo-place', 'demo-direction', 'demo-distance'];
  dataSource = new MatTableDataSource<any>(TABLE_DATA);
  public form1: FormGroup;
  count: any;
  cell1: boolean = false;
  cell2: boolean = false;
  cell3: boolean = false;
  cell4: boolean = false;
  load: boolean = true;
  width: any;
  height: any;


  constructor(private active: ActivatedRoute, private rou: Router, private formbuilder: FormBuilder, private commonservice: CommonService) {
    this.form1 = formbuilder.group({
      place1: ['', Validators.required],
      direction1: [''],
      distance1: [''],
      place2: ['', Validators.required],
      direction2: [''],
      distance2: [''],
      place3: ['', Validators.required],
      direction3: [''],
      distance3: [''],
      place4: ['', Validators.required],
      direction4: [''],
      distance4: [''],
    })
  }

  ngOnInit(): void {

    this.active.params.subscribe(params => {
      console.log(params);
      this.count = params['param'];
      console.log(params['param']);
      console.log("count=", this.count);

      if (this.count == 1) {
        this.cell1 = true;
        this.cell2 = false;
        this.cell3 = false;
        this.cell4 = false;

      } else if (this.count == 2) {
        this.cell1 = true;
        this.cell2 = true;
        this.cell3 = false;
        this.cell4 = false;

      } else if (this.count == 3) {
        this.cell1 = true;
        this.cell2 = true;
        this.cell3 = true;
        this.cell4 = false;

      } else {
        this.cell1 = true;
        this.cell2 = true;
        this.cell3 = true;
        this.cell4 = true;

      }

    });
  }
  previous() {
    this.rou.navigate(['/home'])
  }

  preview() {

    console.log(this.commonservice.HomeData);
    let homecomponent = this.commonservice.HomeData;
    this.active.params.subscribe(params => {
      console.log(params);
      this.count = params['param'];
      console.log(params['param']);
      console.log("count=", this.count);
    })
    let params: any = [];
    if (this.count == 1) {
      params = {
        "signType": homecomponent.signTypes,
        "roadCategory": homecomponent.roadCategory,
        "designSpeed": homecomponent.designSpeed,
        "designStyle": homecomponent.designStyle,
        "languages": homecomponent.languages,
        "places": [{
          "name": this.form1.value.place1,
          "direction": this.form1.value.direction1,
          "distance": this.form1.value.distance1
        }]

      }
    }

    else if (this.count == 2) {
      params = {
        "signType": homecomponent.signTypes,
        "roadCategory": homecomponent.roadCategory,
        "designSpeed": homecomponent.designSpeed,
        "designStyle": homecomponent.designStyle,
        "languages": homecomponent.languages,
        "places": [{
          "name": this.form1.value.place1,
          "direction": this.form1.value.direction1,
          "distance": this.form1.value.distance1
        },
        {
          "name": this.form1.value.place2,
          "direction": this.form1.value.direction2,
          "distance": this.form1.value.distance2
        }]
      }
    }

    else if (this.count == 3) {
      params = {
        "signType": homecomponent.signTypes,
        "roadCategory": homecomponent.roadCategory,
        "designSpeed": homecomponent.designSpeed,
        "designStyle": homecomponent.designStyle,
        "languages": homecomponent.languages,
        "places": [{
          "name": this.form1.value.place1,
          "direction": this.form1.value.direction1,
          "distance": this.form1.value.distance1
        },
        {
          "name": this.form1.value.place2,
          "direction": this.form1.value.direction2,
          "distance": this.form1.value.distance2
        },
        {
          "name": this.form1.value.place3,
          "direction": this.form1.value.direction3,
          "distance": this.form1.value.distance3
        }]
      }
    }

    else if (this.count == 4) {
      params = {
        "signType": homecomponent.signTypes,
        "roadCategory": homecomponent.roadCategory,
        "designSpeed": homecomponent.designSpeed,
        "designStyle": homecomponent.designStyle,
        "languages": homecomponent.languages,
        "places": [{
          "name": this.form1.value.place1,
          "direction": this.form1.value.direction1,
          "distance": this.form1.value.distance1
        },
        {
          "name": this.form1.value.place2,
          "direction": this.form1.value.direction2,
          "distance": this.form1.value.distance2
        },
        {
          "name": this.form1.value.place3,
          "direction": this.form1.value.direction3,
          "distance": this.form1.value.distance3
        },
        {
          "name": this.form1.value.place4,
          "direction": this.form1.value.direction4,
          "distance": this.form1.value.distance4
        }]
      }
    }

    console.log(params);
    this.commonservice.postData(params).subscribe((res: any) => {
      console.log(res);
      this.load = false;
    })
    this.commonservice.getboardsize().subscribe((res: any) => {
      console.log(res);
      this.width = res.width;
      this.height = res.height;
    })

  }

  download() {
    window.open("https://dxf-proj.herokuapp.com/getsignboard/");
  }

}
