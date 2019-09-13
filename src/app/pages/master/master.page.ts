import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  logout() {
    UserUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
