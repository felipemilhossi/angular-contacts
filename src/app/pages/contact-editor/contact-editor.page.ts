import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.page.html',
  styleUrls: ['./contact-editor.page.scss'],
})
export class ContactEditorPage implements OnInit {
  public form: FormGroup;
  public contact: Contact = new Contact();
  public isUpdate: boolean = false;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private service: DataService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      cpf: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf
      ])],
      fone: ['', Validators.compose([
        Validators.minLength(13),
        Validators.maxLength(14),
        Validators.required
      ])],
      street: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(120),
        Validators.required
      ])],
      zipcode: ['', Validators.compose([
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(120),
        Validators.required
      ])],
      state: ['', Validators.compose([
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
      image: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('contact');
    console.log(id);
    if (id != "0") {
      this.isUpdate = true;
      let contacts = ContactUtil.get();
      this.contact = contacts.find(x => x.id == id);
      this.id = this.contact.id;
      this.form.controls['name'].setValue(this.contact.name);
      this.form.controls['email'].setValue(this.contact.email);
      this.form.controls['cpf'].setValue(this.contact.cpf);
      this.form.controls['fone'].setValue(this.contact.fone);
      this.form.controls['street'].setValue(this.contact.street);
      this.form.controls['zipcode'].setValue(this.contact.zipcode);
      this.form.controls['city'].setValue(this.contact.city);
      this.form.controls['state'].setValue(this.contact.state);
      this.form.controls['country'].setValue(this.contact.country);
      this.form.controls['image'].setValue(this.contact.image);
    }
    else {
      this.isUpdate = false;
      this.contact = new Contact();
    }
  }

  async update() {
    const loading = await this.loadingCtrl.create({ message: 'Atualizando o contato' });
    loading.present();

    this.service.updateContact(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess("Contato atualizado com sucesso");
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError('Falha ao atualizar o cadastro');
        },
      )
  }

  async add() {
    console.log(this.form.value)
    const loading = await this.loadingCtrl.create({ message: 'Inserindo um novo contato' });
    loading.present();

    this.service.updateContact(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess("Contato inserido com sucesso");
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

  async showSuccess(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.navCtrl.navigateRoot('/');
        }
      }]
    });
    await alert.present();
  }

}
