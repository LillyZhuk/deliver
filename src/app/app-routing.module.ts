import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
  // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  // { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  // { path: 'modal', loadChildren: './pages/home/list-cafe/modal/modal.module#ModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
