import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';
/**
 * Generated class for the ModalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-info',
  templateUrl: 'modal-info.html',
  providers: [TataskLogicProvider]
})
export class ModalInfoPage {
  item: any;
  remaining: any;

  constructor(public myProvider: TataskLogicProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInfoPage');
    this.daysRemainig();
  }
  daysRemainig(){
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = d.getMonth()+1;
    var dd = d.getDate();
    console.log(dd);
    var aux = yyyy.toString() + '-' + mm.toString() + '-' + dd.toString();
    var date1 = Date.parse(aux);
    var date2 = Date.parse(this.item.date);
    
    console.log(this.item.date);
    var timeDiff = date2 - date1;
    this.remaining = (Math.floor(timeDiff / (1000 * 60 * 60 * 24)))+1;
  }
  close(){
    this.myProvider.closeModal();
  }

}
