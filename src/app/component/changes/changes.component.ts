import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.scss'],
})
export class ChangesComponent implements OnInit {

  @Input() title;
  private form: FormGroup;
  @Output() newValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if (this.title === 'пароль') {
      this.form = new FormGroup({
        text: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern('[a-zA-Z0-9 ]*')]),
        retext: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern('[a-zA-Z0-9 ]*')])
      });
    } else {
      this.form = new FormGroup({
        text: new FormControl('', [Validators.required]),
        retext: new FormControl('', [Validators.required])
      });
    }
  }

  change() {
    if (this.form.value.text === this.form.value.retext) {
      let value = this.form.value.text;
      this.newValue.emit(value);
    }
  }

}
