import { NewDealComponent } from './new-deal/new-deal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit, OnDestroy {

  private deal: NgbModalRef
  myData = {a: 'Mydata'};
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  open() {
    this.deal = this.modalService.open(NewDealComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }

  ngOnDestroy(){
    console.log('aa',this.myData)
  }
}
