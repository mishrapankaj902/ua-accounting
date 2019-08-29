import { Directive, ElementRef, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { AclService } from '../service/acl.service';
import * as _ from 'lodash';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private requestedPermission = [];
  private operator = 'AND';

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private acl: AclService
  ) {  }

  ngOnInit(): void {
    this.acl.aclChange.subscribe(() => {
      this.updateView();
    })
  }

  @Input()
  set hasPermission(val) {
    if (_.isString(val)) {
      this.requestedPermission = [val];
    } else if (_.isArray(val)) {
      this.requestedPermission = val;
    } else {
      console.error('Requested Permission should be Array or String ', val);
    }
    this.updateView();
  }

  @Input()
  set hasPermissionOperation(op) {
    this.operator = (_.unescape(op) == 'OR') ? 'OR' : 'AND';
  }

  updateView() {
    this.viewContainer.clear();
    if (this.acl.isAdmin || this.acl.checkPermission(this.requestedPermission, this.operator)) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}