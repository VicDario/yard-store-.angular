import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { NavComponent } from './components/nav/nav.component';

import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [NavComponent, LayoutComponent],
  imports: [CommonModule, WebsiteRoutingModule],
})
export class WebsiteModule {}
