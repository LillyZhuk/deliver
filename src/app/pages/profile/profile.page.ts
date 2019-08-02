import {Component, ElementRef, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { Profile } from '../../component/models/profile.model';
import * as moment from 'moment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

    public person = {};
    public age;
    public isLoaded: boolean = false;
    public sub;
    currentImage;
    photos = [];
    @ViewChild('fileBtn') fileBtn: {
        nativeElement: HTMLInputElement
    };

    constructor(
      private profileService: ProfileService,
      private storage: Storage,
      private camera: Camera,
      public actionSheetController: ActionSheetController,
      private base64ToGallery: Base64ToGallery,
      private photoLibrary: PhotoLibrary,
      private file: File
  ) { }

  ngOnInit() {
        this.getProfile();
  }

  public getProfile(): void {
        this.storage.get('uid').then(val => {
            this.sub = this.profileService.getProfile(val)
                .subscribe(querySnapshot => {
                    querySnapshot.forEach(item => {
                        this.person = item.data();
                        this.isLoaded = true;
                        this.getAge(this.person['birthday']);
                    });
                });
        });
  }

    public getAge(birthday): number {
        const currentTime = new Date();
        this.age = ((currentTime.getTime() - birthday) / 31556952000).toFixed(0);
        return this.age;
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Выбрать фото',
            buttons: [{
                text: 'Загрузить из галереи',
                role: 'destructive',
                icon: 'images',
                handler: () => {
                    this.openGallery();
                }
            }, {
                text: 'Сделать снимок',
                icon: 'camera',
                handler: () => {
                    this.takePhoto();
                }
            },  {
                text: 'Удалить фото',
                icon: 'trash',
                role: '',
                handler: () => {
                    this.deletePhoto();
                }
            }, {
                text: 'Закрыть',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    changeUserData(form) {
        this.storage.get('uid').then(val => {
            this.profileService.editProfile(val, form.value).then(res => {
                this.getProfile();
            });
        });
    }

    openGallery() {
        this.fileBtn.nativeElement.click();
    }

    public takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true
        }

        this.camera.getPicture(options).then((imageData) => {
            this.file.resolveLocalFilesystemUrl(imageData) .then(fileEntry => {
                let fileName = '';
                const { name, nativeURL } = fileEntry;
                const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
                fileName = name;
                return this.file.readAsArrayBuffer(path, name);
            }).then(buffer => {
                const imgBlob = new Blob([buffer], {
                    type: 'image/jpeg'
                });
                const data = new FormData();
                data.append('file', imgBlob);
                data.append('UPLOADCARE_STORE', '1');
                data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');

                this.savePhoto(data);
            });
        }, (err) => {
            console.log(err);
        });
    }

    public uploadPic(event): void {
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('UPLOADCARE_STORE', '1');
        data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');

        this.savePhoto(data);
    }

    public savePhoto(data): void {
        this.profileService.uploadImg(data).subscribe(value => {
            this.storage.get('uid').then(val => {
                this.profileService.changeImg(val, value).then(res => {
                    this.getProfile();
                });
            });
        });
    }

    public deletePhoto() {
        this.storage.get('uid').then(val => {
            this.profileService.deleteImg(val).then(res => {
                this.getProfile();
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
