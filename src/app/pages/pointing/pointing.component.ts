import { Component, OnInit } from '@angular/core';
import * as  moment from 'moment';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { PointingService } from 'src/app/services/pointing.service';
import { IPointing } from 'src/app/shared/interfaces/IPointing';
@Component({
  selector: 'app-pointing',
  templateUrl: './pointing.component.html',
  styleUrls: ['./pointing.component.scss']
})
export class PointingComponent {
  time = new Date();
  isVisible = false;

  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  timeIn =  new Date().setHours(8);
  timeOut =  new Date().setHours(17);
  timeLunchIn =  new Date().setHours(12);
  timeLunchOut =  new Date().setHours(12);
  durationWork = 0;
  durationWorkMin = 0;
  pointingList: any[] = [];
  supplOrLost = 0;
  supplOrLostMin = 0;
  visualised = false;
  activatyList: any[] = []

  constructor(private pointing: PointingService,private  spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.pointing.get().subscribe((response:any)  => {
      this.spinner.hide()
      this.pointingList = response
    },(e)=> {
      alert(e)
      this.spinner.hide()

    })
  }
  
  getTime() {
    const DURATION_WORK = 480; // 8heures
    const mTimeIn = moment(this.timeIn)
    const mTimeOut= moment(this.timeOut)
    const mTimeInLunch = moment(this.timeLunchIn)
    const mTimeOutLunch = moment(this.timeLunchOut)

    const diffInOut = mTimeOut.diff(mTimeIn,'minutes')
    const diffLunch = mTimeOutLunch.diff(mTimeInLunch,'minutes')
    
    
    const workHourDiffLunch = diffInOut - diffLunch;

    console.log(workHourDiffLunch,'duration travail',60*8);
    const result = workHourDiffLunch -  DURATION_WORK ;



    
    this.durationWork = workHourDiffLunch;
    this.supplOrLost = result

    const duratioWork = moment.duration(this.durationWork, 'minutes');
       this.durationWork = Math.floor(duratioWork.asHours());
       this.durationWorkMin = duratioWork.minutes();
    const suppOrLostDuration = moment.duration(this.supplOrLost, 'minutes');
       this.supplOrLost = Math.floor(suppOrLostDuration.asHours());
       this.supplOrLostMin = suppOrLostDuration.minutes();


      if(this.visualised) {
         this.activatyList = [...this.activatyList,{
      timeIn: this.timeIn,
      timeOut: this.timeOut,
      timeLunchIn:this.timeLunchIn,
      timeLunchOut: this.timeLunchOut,
      rest: result
    }]
    const data = {
      timeIn: this.timeIn,
      timeOut: this.timeOut,
      timeLunchIn:this.timeLunchIn,
      timeLunchOut: this.timeLunchOut,
      rest: result,
      durationWork: workHourDiffLunch
    } as any as IPointing

    this.spinner.show()

    this.pointing.add(data).subscribe(res => {
      this.pointingList = [...this.pointingList,res]
      this.spinner.hide()
      this.isVisible = false;
    },
    (e) => {
      this.spinner.hide()
      alert(e)
    }

    
    )
      }
    this.visualised = true


   
  }

  resetDatabase() {
    
    const idList = this.pointingList.map(p => p._id)
    this.spinner.show()

    this.pointing.deleteAll(idList).subscribe(res => {
      this.spinner.hide()
      this.pointingList = []
    },
    (e) => {
      alert(e)
    this.spinner.hide()
    })
  }
  delete(id: string) {
    this.spinner.show();
    this.pointing.delete(id).subscribe(res => {
      this.spinner.hide();
      this.pointingList = this.pointingList.filter(p => p._id !== id)
    },
    (e) => {
      alert(e.error)
    this.spinner.hide()
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.visualised = false;
    
  }
}
