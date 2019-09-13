import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { Contact } from 'src/app/models/contact.model';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  public contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private service: DataService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('contact');

    let contacts = ContactUtil.get();
    this.contact = contacts.find(x => x.id == id);
  }

  async remove() {
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
            this.service.deleteContact(this.contact)
              .subscribe(
                async (res: any) => {
                  const toast = await this.toastCtrl.create({
                    message: "Contato removido com sucesso",
                    duration: 3000,
                    showCloseButton: true,
                    closeButtonText: 'Fechar'
                  });
                  this.navCtrl.navigateRoot('/');
                  toast.present();
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async call() {
    const loading = await this.loadingCtrl.create({ message: 'Realizando ligação...', duration: 3000 });
    loading.present();
  }

  async sendEmail() {
    const loading = await this.loadingCtrl.create({ message: 'Enviando email...', duration: 3000 });
    loading.present();
  }
}
