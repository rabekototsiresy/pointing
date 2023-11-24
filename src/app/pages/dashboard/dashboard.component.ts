import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PointingService } from 'src/app/services/pointing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private pointing: PointingService){}
  pointingList: any[] = [];
  restWork: number = 0;
  restWorkMin = 0
  durationWork: number = 0;
  percantageWork = 0;
  hoursWork = 0;
  miniutesWork = 0;
  monday: any;
  friday: any
  today: any
  formatOne = (percent: number): string => `${this.durationWork/60} H/40H`;
  optionsChart = {
    subtitleFormat: (percent: number): string => {
      return `${this.hoursWork}H ${this.miniutesWork}Min/ 40H`;
    }
  } as any
  ngOnInit(): void {
    this.spinner.show()
    this.today = moment();

  // Get the start of the week (Monday)
  this.monday = this.today.clone().startOf('isoWeek');

  // Get the end of the week (Sunday)
  const sunday = this.today.clone().endOf('isoWeek');

  // Calculate the Friday of the week
  this.friday = this.monday.clone().day(5);
    this.pointing.get().subscribe((response:any)  => {
      this.spinner.hide()
      this.pointingList = response;
      const restList = this.pointingList.map(point =>point.rest)
      const durationWorkList = this.pointingList.map(point =>point.durationWork)
      this.restWork = restList.reduce((acc,value) => {
        return acc + value
      },0)

      const restWork = moment.duration(this.restWork, 'minutes');
      this.restWork = Math.floor(restWork.asHours());
      this.restWorkMin = restWork.minutes();
      this.durationWork = durationWorkList.reduce((acc,value) => {
        return acc + value
      },0)

      console.log(this.durationWork,'duration workd',Math.round((this.durationWork/2400)))

      // 2400min --- 100%
      // durationWork ?
      // duation work -
      this.percantageWork = (this.durationWork/2400)*100

      const duration = moment.duration(this.durationWork, 'minutes');
       this.hoursWork = Math.floor(duration.asHours());
       this.miniutesWork = duration.minutes();

      console.log(this.percantageWork,'perce',this.durationWork);
     
    },(e)=> {
      alert(e)
      this.spinner.hide()

    })
  }
  
}
