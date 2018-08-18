import { Component } from '@angular/core';
import { IonicPage, NavParams} from 'ionic-angular';
import {TataskLogicProvider} from '../../providers/tatask-logic/tatask-logic';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  myphoto:any;

  constructor(public myProvider: TataskLogicProvider, public navParams: NavParams, private camera: Camera) {
    this.aux = this.navParams.get("isNew");
    this.tag = this.navParams.get("cardtag");
    this.description = this.navParams.get("carddes");
    this.priority = this.navParams.get('cardpri');
    this.type = this.navParams.get('type');
    this.date = this.navParams.get('date');
    this.hour = this.navParams.get('hour');
    this.myphoto = this.navParams.get('icon'); 
  }

  ionViewDidLoad() {
    
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  create(){
    if(this.description==''){
      this.isEmpty=true;
    }else{
      this.isEmpty=false;
      this.myProvider.createTask(this.tag, this.description, this.priority, this.date, this.hour, this.myphoto);  
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
      this.myProvider.editTask(this.navParams.get("card"),this.tag,this.description,this.priority,this.type, this.date, this.hour, this.myphoto);
    }
    
  }
}
