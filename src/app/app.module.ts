import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WspersonaProvider } from '../providers/wspersona/wspersona';
import { WsregionProvider } from '../providers/wsregion/wsregion';
import { PersonaDetailPage } from '../pages/persona-detail/persona-detail';
import { RegionFilterPage } from '../pages/region-filter/region-filter';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PersonaDetailPage,
    RegionFilterPage
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PersonaDetailPage,
    RegionFilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WspersonaProvider,
    WsregionProvider
  ]
})
export class AppModule {}
