import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['JD', 'SAR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
  ]
  public flag:any;

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService) { 
    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];    
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  

}
