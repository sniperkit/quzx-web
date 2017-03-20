import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { StackState } from '../../actions/stack.actions';

@Component({
  selector: 'stack-tags',
  templateUrl: './stack-tags.component.html',
  styleUrls: ['./stack-tags.component.css']
})
export class StackTagsComponent implements OnInit {

  @Output() handleTagSelect = new EventEmitter();
  state: StackState;

  constructor(private store: Store<StackState>) {
    store.select('stackReducer').subscribe((data: StackState) => this.state = data );
  }

  onTagSelect(e: MouseEvent, classification: string) {
    this.handleTagSelect.emit(classification);
    event.preventDefault();
  }

  ngOnInit() {
  }

}
