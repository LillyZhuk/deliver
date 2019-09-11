import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiPanelComponent } from './emoji-panel/emoji-panel.component';
import { ChangesComponent } from './changes/changes.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EmojiPanelComponent,
        ChangesComponent,
    ],
    exports: [
        EmojiPanelComponent,
        ChangesComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class CoreModule { }
