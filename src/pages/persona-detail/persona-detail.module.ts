import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaDetailPage } from './persona-detail';

@NgModule({
  declarations: [
    PersonaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaDetailPage),
  ],
})
export class PersonaDetailPageModule {}
