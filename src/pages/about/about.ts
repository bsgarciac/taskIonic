import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';

@Component({
  selector: 'page-contact',
  templateUrl: 'about.html',
  providers: [TataskLogicProvider]
})
export class AboutPage {
  doingarray: any[];
  message: any;

  constructor(public myProvider: TataskLogicProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.doingarray=[]; 
  }
  ionViewDidLoad() {
    this.doingarray = this.myProvider.getDoingTask();
  }
  
  moveTask(item){
    this.myProvider.move(item,'doing','done');
  }
  editTask(item){
    let modal = this.modalCtrl.create('ModalTaskPage', {'type': 'doing','isNew': false, 'cardtag': item['header'], 'carddes': item['body'], 'cardpri': item['color'], 'card': item, 'hour': item['hour'],'date': item['date'], 'icon': item['icon']});
    modal.present();
    this.doingarray = this.myProvider.getDoingTask();
  }
  deleteTask(item){
    this.myProvider.removeTask(item, 'doing', true);
  }
  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }
  showInfo(item){
    let modal = this.modalCtrl.create('ModalInfoPage', {'item': item});
    modal.present();
    console.log(item);
  }
}


