import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user) this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
    });
    loading.present();

    this.service.auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          console.log(res);
          this.showSuccess(res);
        },
        (err) => {
          loading.dismiss();
          this.showError('Usuário ou senha inválidos');
        },
      );
  }

  async showSuccess(user) {
    UserUtil.set(user);
    this.navCtrl.navigateRoot('/');
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });
    toast.present();
  }

}
