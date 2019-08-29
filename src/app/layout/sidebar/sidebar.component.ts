import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sidebarVisible = true;
  @Input() navTab = 'menu';
  @Input() currentActiveMenu;
  @Input() currentActiveSubMenu;
  @Output() changeNavTabEvent = new EventEmitter();
  @Output() activeInactiveMenuEvent = new EventEmitter();
  public themeClass = 'theme-cyan';
  defaultSidebar = true;
  currentUrl: String = '';
  ptglaccord: any;
  tglaccord: any;
  otglaccord: any;

  constructor(private themeService: ThemeService) {
    this.themeService.themeClassChange.subscribe(themeClass => {
      this.themeClass = themeClass;
    });
  }

  ngOnInit() {  }

  changeNavTab(tab: string) {
    this.navTab = tab;
  }

  activeInactiveMenu(menuItem: string) {
    this.activeInactiveMenuEvent.emit({ item: menuItem });
  }

  changeTheme(theme: string) {
    this.themeService.themeChange(theme);
  }

  clickEvent() {}
  orgclickEvent() {}
  prsnclickEvent() {}
}
