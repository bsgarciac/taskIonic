import { Injectable } from '@angular/core';
import { ViewController} from 'ionic-angular';

/*
  Generated class for the TataskLogicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var todoarray = [];
var doingarray = [];
var donearray = [];
var card={};

@Injectable()
export class TataskLogicProvider {
  

  constructor(public viewCtrl: ViewController) {
  }
  
  createTask( tag, description, priority){
    card = {
      "header":tag,
      "body": description,
      "color": priority
    };
    if(todoarray.length==0){
      todoarray.push(card);
    }else{
      const aux = todoarray.length
      for (var i = 0; i < aux; i++){
        if(todoarray[i]['color']<=card['color']){
          todoarray.splice(i, 0, card);
          break;
        }
        if( i==aux-1){
          todoarray.push(card);
          break;
        }
      }
    }
    this.closeModal();  
  }
  createDoingTask(card){
    if(doingarray.length==0){
      doingarray.push(card);
    }else{
      const aux = doingarray.length
      for (var i = 0; i < aux; i++){
        if(doingarray[i]['color']<=card['color']){
          doingarray.splice(i, 0, card);
          break;
        }
        if( i==aux-1){
          doingarray.push(card);
          break;
        }
      }
    } 
  }

  createDoneTask(card){
    if(donearray.length==0){
      donearray.push(card);
    }else{
      const aux = donearray.length
      for (var i = 0; i < aux; i++){
        if(donearray[i]['color']<=card['color']){
          donearray.splice(i, 0, card);
          break;
        }
        if( i==aux-1){
          donearray.push(card);
          break;
        }
      }
    } 
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  getListTask(){
    return todoarray;
  }
  getDoingTask(){
    return doingarray;
  }
  getDoneTask(){
    return donearray;
  }
  removeTask(card, kind){
    if(kind=='todo'){
      todoarray.splice(todoarray.indexOf(card), 1);
    }else if(kind=='doing'){
      doingarray.splice(doingarray.indexOf(card), 1);  
    }else{
      donearray.splice(donearray.indexOf(card), 1);  
    }  
  }

  editTask(card, newtag, newdescription, newpriority, kind){
    this.removeTask(card, kind);
    card = {
      "header":newtag,
      "body": newdescription,
      "color": newpriority
    };
    if(kind=='todo'){
      this.createTask(newtag,newdescription,newpriority);
    }else if(kind=='doing'){
      this.createDoingTask(card);
      this.closeModal();     
    }else{
      this.createDoneTask(card);
      this.closeModal(); 
    }
  }
  move(card, from, to){
    if(from=='todo' && to=='doing'){
      this.removeTask(card, 'todo');
      this.createDoingTask(card);
    }else if(from=='doing' && to=='done'){
      this.removeTask(card, 'doing');
      this.createDoneTask(card);
    }
  }
}

