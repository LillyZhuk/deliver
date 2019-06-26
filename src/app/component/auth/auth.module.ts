import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        AuthRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {}
