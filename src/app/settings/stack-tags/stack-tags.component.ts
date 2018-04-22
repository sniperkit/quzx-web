import { Component, OnInit } from '@angular/core';

import {SettingsStackTagsState} from './actions/stack-tags-settings.actions';
import {Store} from '@ngrx/store';
import {StackService} from '../../stack/services/stack.service';
import {GET_STACK_TAGS, CHANGE_STACK_TAG_VISIBILITY} from './actions/stack-tags-settings.actions';
import {StackTag} from '../../common/models/stack-tag';

@Component({
  moduleId: module.id,
  selector: 'app-stack-tags-setting',
  templateUrl: 'stack-tags.component.html',
  styleUrls: ['stack-tags.component.css'],
  providers: [ StackService ]
})

export class StackTagsSettingComponent {

  state: SettingsStackTagsState;

  constructor(private store: Store<SettingsStackTagsState>,
              private stackService: StackService) {

    store.select('settingsStackTagsReducer').subscribe((data: SettingsStackTagsState) =>  {
      this.state = data;
      console.log(this.state);
    });
  }

  ngOnInit() {

    this.stackService.getStackTags().subscribe(
      (tags: StackTag[]) => this.store.dispatch({type: GET_STACK_TAGS, payload: tags}),
      (err: any) => console.log(err));
  }

  public onChangeVisibility(stackTagId: number) {
    this.stackService.changeTagVisibility(stackTagId).then(result => {
      this.store.dispatch({type: CHANGE_STACK_TAG_VISIBILITY, payload: stackTagId});
    });
  }
}

