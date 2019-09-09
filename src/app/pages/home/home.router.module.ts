import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { HomePage } from './home.page';


const routes: Routes = [
    { path: 'home', component: HomePage, children: [
            { path: 'list-cafe',
                children: [
                { path: '', loadChildren: './list-cafe/list-cafe.module#ListCafePageModule'}
                ], canActivateChild: [AuthGuard]
            }, { path: 'history', children: [
                { path: '', loadChildren: './history/history.module#HistoryPageModule'}]
            }, { path: 'chat', children: [
                { path: '', loadChildren: './chat/chat.module#ChatPageModule'}]
            }, { path: '', redirectTo: '/home/list-cafe', pathMatch: 'full'}
        ]
    },
    { path: '', redirectTo: '/home/list-cafe', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {}
