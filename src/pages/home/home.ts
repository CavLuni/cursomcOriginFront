import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);   } 
 
  ionViewDidLeave() {
    this.menu.swipeEnable(true);   } 
 
  ionViewDidEnter(){
    if (this.storage.getLocalUser() !== null){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }
}

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }
}
