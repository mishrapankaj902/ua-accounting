import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service'
import { AngularFirestore } from 'angularfire2/firestore';
import { BasicInfoModel } from '../../admin/app-forms/basic-info/basic-info.model';
import * as moment from 'moment'
import { AclService } from '../../shared/service/acl.service';

@Component({
	selector: 'app-sidebar-client',
	templateUrl: './sidebar-client.component.html',
	styleUrls: ['./sidebar-client.component.css']
})
export class SidebarClientComponent implements OnInit {


	tglaccord: boolean = false;
	ptglaccord: boolean = false;
	otglaccord: boolean = false;

	deal: BasicInfoModel = new BasicInfoModel();
  	created_at: string = '';

	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
	public themeClass: string = "theme-cyan";

	constructor(private themeService: ThemeService, 
		private db: AngularFirestore,
		private auth: AclService) {
		this.themeService.themeClassChange.subscribe(themeClass => {
			this.themeClass = themeClass;
		});
	}

	ngOnInit() {
		this.getUserForms();
	}

	getUserForms() {
		this.db.collection<any>('ClientBasicInfo', ref => ref.where('email', '==', this.auth.user.email)).get().subscribe(r => {
			if (r.docs.length) {
				this.deal = <BasicInfoModel>r.docs[0].data();
			}
			this.created_at = moment(this.deal._createdAt).format('MMM DD, YYYY');
		})
	}

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme:string){
		this.themeService.themeChange(theme);
	}

	clickEvent(){
		this.tglaccord = !this.tglaccord;       
	}
	prsnclickEvent(){
		this.ptglaccord = !this.ptglaccord;       
	}
	orgclickEvent(){
		this.otglaccord = !this.otglaccord;       
	}
}