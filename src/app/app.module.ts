import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { feedsReducer } from './rss/actions/rss';
import { stackReducer } from './stack/actions/stack.actions';
import { settingsFeedReducer } from './settings.feed/actions/settings.feed.actions';
import { settingsStackTagsReducer } from './settings/stack-tags/actions/stack-tags-settings.actions';

import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {  ModalModule } from 'ngx-bootstrap';
import {  BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent }  from './app.component';
import { appRoutes } from './routes';
import { StackComponent } from "./stack/container/stack.component";
import { TwitterComponent } from "./twitter/containers/twitter.component";
import { StringDatePipe, CleanDatePipe } from "./common/pipes/unixtime.pipe"
import { TweetTextPipe } from "./common/pipes/twittertext.pipe"
import { RssComponent } from "./rss/container/rss.component";
import { HackerNewsComponent } from "./hackernews/hackernews.component";
import { FeedsComponent } from './settings.feed/feeds.component';
import { StackTagsSettingComponent } from './settings/stack-tags/stack-tags.component';
import { FeedComponent } from "./settings.feed/feed.component";
import { LoginComponent } from "./login/login.component";
import { TagSelectComponent } from './common/components/tag-select.component';
import { RenameFeedModalWindowComponent } from './common/components/renamefeed-modalwindow.component';
import { TagsComponent } from './tags/tag.component';
import {AuthGuard} from "./common/services/auth.guard";
import { NavigationTabsComponent } from './ui/navigation-tabs/navigation-tabs.component';
import { RssActionPanelComponent } from './rss/components/rss-action-panel/rss-action-panel.component';
import { RssFeedListComponent } from './rss/components/rss-feed-list/rss-feed-list.component';
import { RssFeedTableComponent } from './rss/components/rss-feed-table/rss-feed-table.component';
import { StackActionPanelComponent } from './stack/components/stack-action-panel/stack-action-panel.component';
import { StackTagsComponent } from './stack/components/stack-tags/stack-tags.component';
import { StackQuestionTableComponent } from './stack/components/stack-question-table/stack-question-table.component';
import { StackQuestionTableElementComponent } from './stack/components/stack-question-table-element/stack-question-table-element.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'auth_token',
    tokenGetter: (() => localStorage.getItem('auth_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StackComponent,
    TwitterComponent,
    HackerNewsComponent,
    RssComponent,
    FeedsComponent,
    FeedComponent,
    StackTagsSettingComponent,
    TagSelectComponent,
    RenameFeedModalWindowComponent,
    TagsComponent,
    StringDatePipe,
    CleanDatePipe,
    TweetTextPipe,
    NavigationTabsComponent,
    RssActionPanelComponent,
    RssFeedListComponent,
    RssFeedTableComponent,
    StackActionPanelComponent,
    StackTagsComponent,
    StackQuestionTableComponent,
    StackQuestionTableElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true }),
    StoreModule.provideStore({ feedsReducer, stackReducer, settingsFeedReducer, settingsStackTagsReducer })
  ],
  providers: [AuthGuard, AuthHttp, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
