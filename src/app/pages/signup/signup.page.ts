import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private service: DataService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.minLength(6)],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      username: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit() {
  }

  async submit() {
    console.log(this.form.value)
    const loading = await this.loadingCtrl.create({ message: 'Enviando os dados...' });
    loading.present();

    this.service.createCustomer(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess();
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError('Falha ao realizar o cadastro');
        },
      )
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

  async showSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'Cadastro realizado com sucesso!!',
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });
    await alert.present();
  }

}
