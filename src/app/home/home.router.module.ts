import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import {ListCafePage} from './list-cafe/list-cafe.page';
import {HistoryPage} from './history/history.page';
import {ChatPage} from './chat/chat.page';

const routes: Routes = [
    {
        path: 'home',
        component: HomePage,
        children: [
            {
                path: 'list-cafe',
                children: [
                    {
                        path: '',
                        loadChildren: './list-cafe/list-cafe.module#ListCafePageModule'
                    }
                ]
            },
            {
                path: 'history',
                children: [
                    {
                        path: '',
                        loadChildren: './history/history.module#HistoryPageModule'
                    }
                ]
            },
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: './chat/chat.module#ChatPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home/list-cafe',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/list-cafe',
        pathMatch: 'full'
    }
    // {path: 'home', component: HomePage, children: [
    //         {path: 'list-cafe', component: ListCafePage, children: [
    //                         {path: '', loadChildren: '../list-cafe/list-cafe.module#ListCafePageModule'},
    //                     ]},
    //         {path: 'history', component: HistoryPage},
    //         {path: 'chat', component: ChatPage}
    //     ]}
    // {
    //     path: 'home',
    //     component: HomePage,
    //     children: [
    //         {path: '', loadChildren: '../list-cafe/list-cafe.module#ListCafePageModule'},
    //     ]
    // },
    // {
    //     path: 'history',
    //     component: HomePage,
    //     children: [
    //         {path: '', loadChildren: '../history/history.module#HistoryPageModule'},
    //     ]
    // },
    // {
    //     path: 'chat',
    //     component: HomePage,
    //     children: [
    //         {path: '', loadChildren: '../chat/chat.module#ChatPageModule'},
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {}
