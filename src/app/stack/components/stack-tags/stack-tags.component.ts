import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { StackState } from '../../actions/stack.actions';

@Component({
  selector: 'stack-tags',
  templateUrl: './stack-tags.component.html',
  styleUrls: ['./stack-tags.component.css']
})
export class StackTagsComponent implements OnInit {

  state: StackState;

  constructor(private store: Store<StackState>) {
    store.select('stackReducer').subscribe((data: StackState) => this.state = data );
  }

  ngOnInit() {
  }

}
