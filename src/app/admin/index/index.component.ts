import { AddDealComponent } from './../deal/add-deal/add-deal.component';
import { BasicInfoModel } from './../app-forms/basic-info/basic-info.model';
import { NewDealComponent } from './../deal/new-deal/new-deal.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as _ from 'lodash'

import { ViewDealComponent } from './../../admin/deal/view-deal/view-deal.component';
import { EditDealComponent } from './../../admin/deal/edit-deal/edit-deal.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, AfterViewInit {
  private dealRef: NgbModalRef
  public sidebarVisible: boolean = true;
  public render: boolean = false;
  private coldDeal: Observable<BasicInfoModel[]>;
  pipe_line_options: any[];
  @ViewChild('dealinwip') dealinwip: ElementRef
  @ViewChild('piChart') piChart: ElementRef
  public chartData = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private db: AngularFirestore,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getDeals('all');
  }

  ngAfterViewInit() {
    this.piChart.nativeElement.parentElement.style.height = this.dealinwip.nativeElement.style.height;
  }


  getDeals(filter: any) {

    this.db.collection<BasicInfoModel>('ClientBasicInfo', ref => ref.orderBy('_createdAt', 'desc')).snapshotChanges().subscribe(d => {
      this.initPipeLine();
      d.forEach(e => {
        const data = e.payload.doc.data();
        data.$id = e.payload.doc.id;
        let year = moment(data._createdAt).format('YYYY')
        if (this.chartData[year] && this.chartData[year][+data.pipe_line]) {
          this.chartData[year][+data.pipe_line] += data.deal_value || 100
        } else {
          _.isObject(this.chartData[year]) || (this.chartData[year] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
          this.chartData[year][+data.pipe_line] += data.deal_value || 100
        }
        var pipeline = (data.pipe_line) ? data.pipe_line - 1 : 0;
        if (filter == 'all') {
          this.pipe_line_options[pipeline]['items'].push(data);
        } else if (data.pipe_line == filter) {
          this.pipe_line_options[pipeline]['items'].push(data);
        } else {
          console.log('nothing!');
        }
      });
      console.log(this.chartData);
      this.initChart();
      this.render = true;
      this.cdr.markForCheck();
    });
  }
  initChart() {

    var config = {
      type: 'line',
      data: {
        labels: _.keys(this.chartData),
        datasets: [{
          label: 'INBOUND',
          backgroundColor: '#1b77ff',
          borderColor: '#1b77ff',
          data: _.map<any, any>(this.chartData, 1),
          fill: false,
        }, {
          label: 'WAITING',
          fill: false,
          backgroundColor: '#ff1a55',
          borderColor: '#ff1a55',
          data: _.map<any, any>(this.chartData, 2),
        }, {
          label: 'ON HOLD',
          fill: false,
          backgroundColor: '#ff7b19',
          borderColor: '#ff7b19',
          data: _.map<any, any>(this.chartData, 3),
        }]
      },
      options: {
        title: {
          display: true,
          text: 'DEALS IN WIP'
        },
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: []
        }
      }
    };
    var ctx = this.dealinwip.nativeElement.getContext('2d');
    var ctx2 = this.piChart.nativeElement.getContext('2d');
    new Chart(ctx, config);
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    _.map<any, any>(this.chartData, 1).forEach(v => s1 += v)
    _.map<any, any>(this.chartData, 2).forEach(v => s2 += v)
    _.map<any, any>(this.chartData, 3).forEach(v => s3 += v)
    const config2 = {
      type: 'pie',
      data: {
        datasets: [{
          data: [s1, s2, s3],
          backgroundColor: [
            '#1b77ff',
            '#ff1a55',
            '#ff7b19',
            //'#0cb325',
          ],
        }],
        labels: [
          'INBOUND',
          'WAITING',
          'ON HOLD',
          //'Work In Progress',
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'WIP Breakdown'
        },
      }
    };
    const myLine2 = new Chart(ctx2, config2);
  }

  randomScalingFactor() {
    return Math.ceil(Math.random() * 100);
  }

  initPipeLine() {
    this.chartData = {}
    this.pipe_line_options = [
      { id: 1, name: 'Inbound', items: [] },
      { id: 2, name: 'Waiting', items: [] },
      { id: 3, name: 'On Hold', items: [] },
      { id: 4, name: 'Work in Progress', items: [] },
      { id: 5, name: 'Awaiting Approval', items: [] },
    ];
  }

  openDeal(deal: BasicInfoModel) {
    this.dealRef = this.modalService.open(NewDealComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      windowClass: 'modal-modified'
    });
    this.dealRef.componentInstance.basicInfoModel = deal;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getDays(created_date: any) {
    var date1: any = new Date(created_date);
    var date2: any = new Date();
    var msec = date2 - date1;
    var mins = Math.floor(msec / 60000);
    var hrs = Math.floor(mins / 60);
    var days = Math.floor(hrs / 24);
    return days;
  }

  getDate(created_date: any) {
    return moment(created_date)
      .format('DD.MMM.YYYY');
  }

  /**
   * To View Deal
   */
  viewDeal(dealId) {
    const ref = this.modalService.open(ViewDealComponent, {
      backdrop: 'static',
      centered: true,
      windowClass: 'modal-modified'
    });
    ref.componentInstance.dealId = dealId;
  }

  /**
   * To edit deal 
   */
  editDeal(item) {
    const ref = this.modalService.open(AddDealComponent, {
      backdrop: 'static',
      centered: true,
      windowClass: 'modal-modified'
    });
    ref.componentInstance.model = item;
    ref.componentInstance.isUpdate = true;
  }
}