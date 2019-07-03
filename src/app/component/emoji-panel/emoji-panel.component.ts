import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji-panel',
  templateUrl: './emoji-panel.component.html',
  styleUrls: ['./emoji-panel.component.scss'],
})
export class EmojiPanelComponent implements OnInit {

  @Input() showEmojis: boolean = false;
  @Input() result = {};
  // @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

  public emojiList = {
    positive: [128512, 128513, 128536, 128516],
    neutral: [128528, 128529, 128566, 129300],
    negative: [128543, 128577, 128546, 128542],
  };

  constructor() { }

  ngOnInit() {}

  codePoint(emojiCodePoint) {
    return String.fromCodePoint(emojiCodePoint);
  }

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    // this.onEmojiSelect.emit(emoji);
  }

}
