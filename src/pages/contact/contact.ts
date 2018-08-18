import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';

@Component({
  selector: 'page-about',
  templateUrl: 'contact.html',
  providers: [TataskLogicProvider]
})
export class ContactPage {
  donearray: any[];
  constructor(public myProvider: TataskLogicProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.donearray=[];
  }
  ionViewDidLoad() {
    this.donearray = this.myProvider.getDoneTask();
  }
  editTask(item){
    let modal = this.modalCtrl.create('ModalTaskPage', {'type': 'done','isNew': false, 'cardtag': item['header'], 'carddes': item['body'], 'cardpri': item['color'], 'card': item, 'hour': item['hour'],'date': item['date'], 'icon': item['icon']});
    modal.present();
    this.donearray = this.myProvider.getDoneTask();
  }
  deleteTask(item){
    this.myProvider.removeTask(item, 'done', true);
  }
}
