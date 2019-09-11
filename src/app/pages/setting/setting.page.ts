import {Component, OnInit, ViewChild} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {AuthService} from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingService} from '../../services/setting.service';
import {Storage} from '@ionic/storage';
import {DataFile} from '../../component/models/file';
import {BgChangeService} from '../../services/bg-change.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public isNewPassword = false;
  public changePasswordForm: FormGroup;
  public changingPassword = false;
  public isCancel = false;
  @ViewChild('fileBtn') fileBtn: {
    nativeElement: HTMLInputElement
  };

  constructor(
      public alertController: AlertController,
      private profileService: ProfileService,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private settingService: SettingService,
      private storage: Storage,
      private bgService: BgChangeService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
      ],
    }, {
      validator: this.MatchPassword // Inject the provider method
    });
  }

  private MatchPassword(AC: AbstractControl): void {
    const newPassword = AC.get('newPassword').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (newPassword !== confirmPassword) {
      AC.get('confirmPassword').setErrors( { MatchPassword: true } );
    } else {
      AC.get('confirmPassword').setErrors(null);
    }
  }

  public submit() {
    this.changingPassword = true;
    this.isCancel = true;
    this.settingService.changePassword(this.changePasswordForm.value.newPassword).then(() => {
      this.isNewPassword = false;
    });
  }

  async presentAlertButtons() {
    const alert = await this.alertController.create({
      header: 'Удалить аккаунт',
      message: 'Вы уверены, что хотите удалить аккаунт?',
      buttons: [{
          text: 'Удалить',
          role: 'delete',
          handler: () => {
            this.deleteAccount();
          }
        }, {
          text: 'Отмена',
          role: 'cancel',
        }],
      cssClass: 'alertDanger'
    });

    await alert.present();
  }

  public deleteAccount() {
    this.storage.get('uid').then(value => {
      this.settingService.deleteUser(value).then(() => {
        return this.authService.logOut();
      });
    });
  }

  uploadPic(event) {
    const files = event.target.files;

    this.generationData(files);
  }

  public generationData(files): void {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');

    this.savePhoto(data);
  }

  public savePhoto(data: FormData) {
    this.profileService.uploadImg(data).then(value => {
      this.storage.get('uid').then(uid => {
        this.bgService.changeBg(value, uid);
      });
    });
  }

  public openGallery(): void {
    this.fileBtn.nativeElement.click();
  }

}
