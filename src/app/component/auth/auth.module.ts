import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        AuthRoutingModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ]
})
export class AuthModule {}
