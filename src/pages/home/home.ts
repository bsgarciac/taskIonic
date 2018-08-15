import { Component,  } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todoarray: any[];
  card: any;

  constructor(public navCtrl: NavController) {
    this.todoarray = [];
    this.card = {
      "header":"",
      "body": "",
    };
  }

  createTask(){
    this.card = {
      "header":"University",
      "body": "Study new words in German"
    };
    this.todoarray.push(this.card);
  }
}
