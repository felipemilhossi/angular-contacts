import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: Contact[]

  constructor(
    private service: DataService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.service.getContacts()
      .subscribe(
        (res: Contact[]) => {
          console.log(res);
          this.contacts = res;
          ContactUtil.set(res);
        },
        (err) => {
          this.showError('Falha ao obter os contatos. Tente novamente mais tarde.');
        },
      );
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

  async remove(contact: Contact) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja excluir o contato?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sim',
          handler: () => {
            this.service.deleteContact(contact)
              .subscribe(
                async (res: any) => {
                  const toast = await this.toastCtrl.create({
                    message: "Contato removido com sucesso",
                    duration: 3000,
                    showCloseButton: true,
                    closeButtonText: 'Fechar'
                  });
                  toast.present();
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }
}
