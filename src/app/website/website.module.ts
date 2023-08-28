import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { QuicklinkModule } from 'ngx-quicklink';

import { NavComponent } from './components/nav/nav.component';

import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [NavComponent, LayoutComponent],
  imports: [CommonModule, WebsiteRoutingModule, QuicklinkModule],
})
export class WebsiteModule {}
