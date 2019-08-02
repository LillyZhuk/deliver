import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { ResetPassComponent } from './resset-pass/reset-pass.component';

const routes: Routes = [
    {path: '', component: AuthComponent, children: [
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegistrationComponent},
        ]
    },
    { path: 'reset-password', component: ResetPassComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
