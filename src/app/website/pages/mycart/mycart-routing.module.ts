import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycartComponent } from './mycart.component';

const routes: Routes = [{ path: '', component: MycartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycartRoutingModule {}
