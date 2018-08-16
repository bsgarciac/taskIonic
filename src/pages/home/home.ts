import { Component,  } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TataskLogicProvider]
})
export class HomePage {
  taskarray: any[];

  constructor(public myProvider: TataskLogicProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.taskarray=[]
  }
  openModal() {
    let modal = this.modalCtrl.create('ModalTaskPage', {'isNew': true, 'cardtag': '', 'carddes': '', 'cardpri': ''});
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
  deleteTask(item){
    this.myProvider.removeTask(item);
  }
  editTask(item){
    let modal = this.modalCtrl.create('ModalTaskPage', {'isNew': false, 'cardtag': item['header'], 'carddes': item['body'], 'cardpri': item['color'], 'card': item});
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
}