import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [TataskLogicProvider]
})
export class LoginPage {
  email: any;
  password: any;
  wrongUser: any;
  constructor(public myProvider: TataskLogicProvider, private http: HTTP, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  logForm(){
   
    this.http.post('https://api.staging.taskgo.com.co/api/rest-auth/login/', 
      { 
        email : 'pruebataskgo1@yopmail.com',
        password: 'abcd!234'
      }, 
      {
        'Content-Type': 'application/json', 'Accept': 'application/json; version=ClientesV1' 
      })
      .then(data => {
        this.wrongUser = false;
        var response = JSON.parse(data.data);
        this.myProvider.setToken(response.key);
        this.myProvider.initTasks();
        this.navCtrl.push(TabsPage);
      }).catch(error => {
        this.wrongUser = true;
      });
  }
}
