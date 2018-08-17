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
  days(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear().toString();
    var dd2 = dd.toString();
    var mm2 = mm.toString();
    if(dd<10) {
      dd2='0'+dd.toString()
    }
    if(mm<10) {
      mm2='0'+mm.toString()
    }
    var date2 = yyyy+'/'+mm2+'/'+dd2;
  }
  openModal() {
    let modal = this.modalCtrl.create('ModalTaskPage', {'isNew': true, 'cardtag': '', 'carddes': '', 'cardpri': 1});
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
  deleteTask(item){
    this.myProvider.removeTask(item, 'todo', true);
  }
  editTask(item){
    let modal = this.modalCtrl.create('ModalTaskPage', {'type': 'todo','isNew': false, 'cardtag': item['header'], 'carddes': item['body'], 'cardpri': item['color'], 'card': item, 'hour': item['hour'],'date': item['date']});
    modal.present();
    this.taskarray = this.myProvider.getListTask();
  }
  moveTask(item){
    this.myProvider.move(item,'todo','doing');
  }
}