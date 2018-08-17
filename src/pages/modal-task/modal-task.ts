import { Component } from '@angular/core';
import { IonicPage, NavParams} from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';

/**
 * Generated class for the ModalTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-task',
  templateUrl: 'modal-task.html',
  providers: [TataskLogicProvider]
})
export class ModalTaskPage {
  tag: any;
  description: any;
  aux: any;
  priority: any;
  type: any;
  date: any;
  hour: any;
  isEmpty: any;

  constructor(public myProvider: TataskLogicProvider, public navParams: NavParams) {
    this.aux = this.navParams.get("isNew");
    this.tag = this.navParams.get("cardtag");
    this.description = this.navParams.get("carddes");
    this.priority = this.navParams.get('cardpri');
    this.type = this.navParams.get('type');
    this.date = this.navParams.get('date');
    this.hour = this.navParams.get('hour');
  }

  ionViewDidLoad() {
    
  }

  create(){
    if(this.description==''){
      this.isEmpty=true;
    }else{
      this.isEmpty=false;
      this.myProvider.createTask(this.tag, this.description, this.priority, this.date, this.hour);  
    }
  }

  close(){
    this.myProvider.closeModal();
  }

  update(){
    if(this.description==''){
      this.isEmpty=true;
    }else{
      this.isEmpty=false;
      this.myProvider.editTask(this.navParams.get("card"),this.tag,this.description,this.priority,this.type, this.date, this.hour);
    }
    
  }
}
