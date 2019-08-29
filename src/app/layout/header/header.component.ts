import { AddDealComponent } from './../../admin/deal/add-deal/add-deal.component';
import { LoaderService } from './../../services/loader.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { NewDealComponent } from './../../admin/deal/new-deal/new-deal.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	// Properties
	private deal2: NgbModalRef
	@Input() showNotifMenu: boolean = false;
	@Input() showToggleMenu: boolean = false;
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(
		private config: NgbDropdownConfig,
		private themeService: ThemeService,
		private modalService: NgbModal,
		private authSer: AuthService,
		private router: Router,
		private loader: LoaderService
	) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {

	}

	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu() {
		this.themeService.showHideMenu();
	}
	addDeal() {
		// check here
		this.deal2 = this.modalService.open(AddDealComponent, {
			backdrop: 'static',
			centered: true,
			windowClass: 'modal-modified'
		});
	}
	
	logout() {
		this.authSer.logout().then(r => {
			this.router.navigateByUrl('/authentication/page-login')
		}, e => { })
	}
}
