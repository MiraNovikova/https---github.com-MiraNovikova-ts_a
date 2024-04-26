import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RestInterceptorsService } from './services/interceptor/rest-interceptors.service';
import { ConfigService } from './services/config/config.service';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { StatisticComponent } from './pages/setting/statistic/statistic.component';
// для даты на русском языке


import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { RouterModule } from '@angular/router';
registerLocaleData(localeRu);
// 

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TabViewModule,
    TableModule,
    TreeTableModule,
    ToastModule, 
    RouterModule

  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},
    { provide: LOCALE_ID, useValue: 'ru' },
    {provide: MessageService}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

