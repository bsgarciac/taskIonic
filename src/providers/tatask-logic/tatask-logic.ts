import { Injectable } from '@angular/core';
import { ViewController,ToastController,AlertController} from 'ionic-angular';

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
  

  constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, public toastCtrl: ToastController) {
  }
  
  createTask( tag, description, priority, date, hour, icon){
    card = {
      "header":tag,
      "body": description,
      "color": priority,
      "date": date,
      "hour": hour,
      'icon': icon
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
  showConfirm(card, kind) {
    const confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to remove this card?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            if(kind=='todo'){
              todoarray.splice(todoarray.indexOf(card), 1);
            }else if(kind=='doing'){
              doingarray.splice(doingarray.indexOf(card), 1);  
            }else{
              donearray.splice(donearray.indexOf(card), 1);  
            } 
          }
        }
      ]
    });
    confirm.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present(toast);
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
  removeTask(card, kind, key){
    if(key){
      this.showConfirm(card, kind);
    }else{
      if(kind=='todo'){
        todoarray.splice(todoarray.indexOf(card), 1);
      }else if(kind=='doing'){
        doingarray.splice(doingarray.indexOf(card), 1);  
      }else{
        donearray.splice(donearray.indexOf(card), 1);  
      }   
    } 
  }

  editTask(card, newtag, newdescription, newpriority, kind, newdate, newhour, newicon){
    this.removeTask(card, kind, false);
    card = {
      "header":newtag,
      "body": newdescription,
      "color": newpriority,
      "date": newdate,
      "hour": newhour,
      'icon': newicon
    };
    if(kind=='todo'){
      this.createTask(newtag,newdescription,newpriority, newdate, newhour, newicon);
    }else if(kind=='doing'){
      this.createDoingTask(card);
      this.closeModal();     
    }else{
      this.createDoneTask(card);
      this.closeModal(); 
    }
    this.showToast('Task edited');
  }
  move(card, from, to){
    if(from=='todo' && to=='doing'){
      this.removeTask(card, 'todo', false);
      this.createDoingTask(card);
      this.showToast('Task moved to Doing');
    }else if(from=='doing' && to=='done'){
      this.removeTask(card, 'doing', false);
      this.createDoneTask(card);
      this.showToast('Task moved to Done');
    }
  }
}

