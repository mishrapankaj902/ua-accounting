import { Component, OnInit } from '@angular/core';
import { DocusignService } from '../../../services/docusign.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-docusign',
  templateUrl: './docusign.component.html',
  styleUrls: ['./docusign.component.css']
})
export class DocusignComponent implements OnInit {

  constructor(
    public docusignService: DocusignService,
  ) { }

  ngOnInit() {
    this.docusignService.redirectHandler();
  }

}
