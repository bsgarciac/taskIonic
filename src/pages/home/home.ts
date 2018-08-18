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
  myDate: String;
  constructor(public myProvider: TataskLogicProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.taskarray=[]
  }
  ionViewDidLoad() {
    this.taskarray = this.myProvider.getListTask();
  }
  openModal() {
    let modal = this.modalCtrl.create('ModalTaskPage', {'isNew': true, 'cardtag': '', 'carddes': '', 'cardpri': 1, });
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
  deleteTask(item){
    this.myProvider.removeTask(item, 'todo', true);
  }
  editTask(item){
    let modal = this.modalCtrl.create('ModalTaskPage', {'type': 'todo','isNew': false, 'cardtag': item['header'], 'carddes': item['body'], 'cardpri': item['color'], 'card': item, 'hour': item['hour'],'date': item['date'], 'icon': item['icon']});
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
  moveTask(item){
    this.myProvider.move(item,'todo','doing');
  }
}