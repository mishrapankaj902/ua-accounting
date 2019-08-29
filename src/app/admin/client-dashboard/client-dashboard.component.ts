import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { whenRendered } from '@angular/core/src/render3';
import { BasicInfoModel } from '../app-forms/basic-info/basic-info.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewDealComponent } from '../deal/new-deal/new-deal.component';
import * as moment from 'moment'
import { AclService } from '../../shared/service/acl.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  dealRef = null
  deal: BasicInfoModel = new BasicInfoModel();
  created_at: string = '';
  public currentActiveMenu = "light";
  public currentActiveSubMenu;
  public title = 'Unique Accounting';
  
  constructor(
		protected activatedRoute: ActivatedRoute,
		protected titleService: Title,
    private auth: AclService,
    private db: AngularFirestore,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
			this.getActiveRoutes();
    });
    let that = this;
		this.router.events
			.filter((event) => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter((route) => route.outlet === 'primary')
			.mergeMap((route) => route.data)
			.subscribe((event) => this.titleService.setTitle(event['title']));
    this.getUserForms();
  }

  getActiveRoutes() {
		let segments: Array<string> = this.router.url.split('/');
		this.currentActiveMenu = segments[2];
		this.currentActiveSubMenu = segments[3];
  }
  
  redirectRoute($event, route) {
    $event.target.closest('ul').querySelector('.active') && $event.target.closest('ul').querySelector('.active').classList.remove('active')
    $event.target.closest('li').classList.add('active')
    this.router.navigate([route]);
  }

  getUserForms() {
    this.db.collection<any>('ClientBasicInfo', ref => ref.where('email', '==', this.auth.user.email)).get().subscribe(r => {
      if (r.docs.length) {
        this.deal = <BasicInfoModel>r.docs[0].data();
      }
      this.created_at = moment(this.deal._createdAt).format('DD/MMM/YYYY');
    })
  }

  openDeal(form: any) {
    this.dealRef = this.modalService.open(NewDealComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      windowClass: 'modal-modified'
    });
    this.dealRef.componentInstance.basicInfoModel = this.deal;
    this.dealRef.componentInstance.tab = form.key;
  }
}
