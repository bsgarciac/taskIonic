import { Injectable } from '@angular/core';
import { ViewController} from 'ionic-angular';

/*
  Generated class for the TataskLogicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var todoarray = [];
var card={};

@Injectable()
export class TataskLogicProvider {
  

  constructor(public viewCtrl: ViewController) {
  }
  
  createTask( tag, description){
    card = {
      "header":tag,
      "body": description
    };
    todoarray.push(card);
    this.closeModal();  
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  getListTask(){
    return todoarray;
  }

  removeTask(card){
    todoarray.splice(todoarray.indexOf(card), 1);
  }

  editTask(card, newtag, newdescription){
    const i = todoarray.indexOf(card);
    todoarray[i]['header']= newtag;
    todoarray[i]['body']= newdescription;
    this.closeModal();  
  }
}

