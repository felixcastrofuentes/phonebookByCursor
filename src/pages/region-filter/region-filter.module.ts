import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegionFilterPage } from './region-filter';

@NgModule({
  declarations: [
    RegionFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegionFilterPage),
  ],
})
export class RegionFilterPageModule {}
