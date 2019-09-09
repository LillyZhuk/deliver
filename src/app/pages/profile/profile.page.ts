import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { Subscription } from 'rxjs';
import { Profile } from '../../component/models/profile.model';
import * as firebase from 'firebase';
import { DataFile } from '../../component/models/file';
import {Entry} from '@ionic-native/file';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

    public person: firebase.firestore.DocumentData;
    public isLoaded = false;
    public imgIsLoaded = false;
    private profileSub: Subscription;
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

  public ngOnInit(): void {
        this.getProfile();
  }

  public getProfile(): void {
        this.storage.get('uid').then(val => {
            this.profileSub = this.profileService.getProfile(val)
                .subscribe(querySnapshot => {
                    querySnapshot.forEach(item => {
                        this.person = item.data();
                        this.isLoaded = true;
                        this.imgIsLoaded = true;
                    });
                });
        });
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
            }]
        });
        await actionSheet.present();
    }

    public changeUserData(form): void {
        this.storage.get('uid').then(val => {
            this.profileService.editProfile(val, form.value).then(() => {
                this.getProfile();
            });
        });
    }

    public openGallery(): void {
        this.fileBtn.nativeElement.click();
    }

    public takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true
        };

        this.camera.getPicture(options).then((imageData: string) => {
            this.file.resolveLocalFilesystemUrl(imageData) .then((fileEntry: Entry) => {
                const { name, nativeURL } = fileEntry;
                const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
                return this.file.readAsArrayBuffer(path, name);
            }).then(buffer => {
                const imgBlob = new Blob([buffer], {
                    type: 'image/jpeg'
                });
                this.imgIsLoaded = false;
                this.generationData(imgBlob);
            });
        });
    }

    public uploadPic(event): void {
        this.imgIsLoaded = false;
        const files = event.target.files;

        this.generationData(files[0]);
    }

    public generationData(files: string | Blob): void {
        const data = new FormData();
        data.append('file', files);
        data.append('UPLOADCARE_STORE', '1');
        data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');

        this.savePhoto(data);
    }

    public savePhoto(data: FormData): void {
        this.profileService.uploadImg(data).then((value: DataFile) => {
            this.storage.get('uid').then((val: string) => {
                this.profileService.changeImg(val, value).then(() => {
                    this.getProfile();
                    this.imgIsLoaded = true;
                });
            });
        });
    }

    public deletePhoto(): void {
        this.storage.get('uid').then((val: string) => {
            this.profileService.deleteImg(val).then(() => {
                this.getProfile();
            });
        });
    }

    ngOnDestroy() {
        this.profileSub.unsubscribe();
    }

}
