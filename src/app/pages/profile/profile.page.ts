import {Component, ElementRef, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Storage } from '@ionic/storage';
import { Profile } from '../../component/models/profile.model';
import * as moment from 'moment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';

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
    }

    constructor(
      private profileService: ProfileService,
      private storage: Storage,
      private camera: Camera,
      public actionSheetController: ActionSheetController,
      private base64ToGallery: Base64ToGallery,
      private photoLibrary: PhotoLibrary
  ) { }

  ngOnInit() {
        this.getProfile();
        this.loadSaved();
  }

  public getProfile() {
        this.storage.get('uid').then(val => {
            this.sub = this.profileService.getProfile(val)
                .subscribe(querySnapshot => {
                    querySnapshot.forEach(item => {
                        this.person = item.data();
                        this.isLoaded = true;
                    });
                });
        });
  }

    public getAge(birthday): number {
        const currentTime = new Date();
        const birthDate: any = moment(birthday).format('x');
        this.age = ((currentTime.getTime() - birthDate) / 31556952000).toFixed(0);
        return this.age;
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Загрузить из галереи',
                role: 'destructive',
                icon: 'images',
                handler: () => {
                    this.changeAvatar();
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
                    console.log('Cancel clicked');
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

    changeUserData() {}

    changeAvatar() {
        this.fileBtn.nativeElement.click();
    }

    public takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.currentImage = `data:image/jpeg;base64,${imageData}`;
            // this.base64ToGallery.base64ToGallery(this.currentImage, options).then(
            //     res => console.log(res, 'save'),
            //     err => console.log('Error saving image to gallery ', err)
            // );
            this.photoLibrary.requestAuthorization().then(() => {
            // this.photoLibrary.saveImage(this.currentImage + '&ext=.jpg').then()
                });
            })
            console.log(this.photos, 'photos');
            // this.currentImage = `data:image/jpeg;base64,${imageData}`;
            //
            // console.log(this.currentImage, 'photo');

            // const data = new FormData();
            // data.append('file', this.currentImage);
            // data.append('UPLOADCARE_STORE', '1');
            // data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');
            //
            // this.savePhoto(data);
        // }, (err) => {
        //     console.log('Camera issue:' + err);
        // });
    }

    uploadPic(event) {
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('UPLOADCARE_STORE', '1');
        data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82');

        this.savePhoto(data);
    }

    savePhoto(data) {
        this.profileService.uploadImg(data).subscribe(value => {
            this.storage.get('uid').then(val => {
                this.profileService.changeImg(val, value).then(res => {
                    this.getProfile();
                });
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadSaved() {
        this.storage.get('photos').then((photos) => {
            this.photos = photos || [];
        });
    }

}
