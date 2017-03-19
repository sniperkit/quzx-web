import { Routes } from '@angular/router'

import { StackComponent } from './stack/stack.component'
import { TwitterComponent } from "./twitter/twitter.component";
import { RssComponent } from "./rss/rss.component";
import { HackerNewsComponent } from "./hackernews/hackernews.component"
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./services/auth.guard";
import { FeedsComponent } from "./settings.feed/feeds.component";
import { FeedComponent } from "./settings.feed/feed.component";
import { TagsComponent } from "./tags/tag.component";

export const appRoutes:Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'torrents', component: RssComponent, data: { section: 5 }, canActivate: [AuthGuard] },
  { path: 'stack', component: StackComponent, canActivate: [AuthGuard] },
  { path: 'rss', component: RssComponent, data: { section: 1 }, canActivate: [AuthGuard]  },
  { path: 'twitter', component: TwitterComponent, canActivate: [AuthGuard] },
  { path: 'reddit', component: RssComponent, data: { section: 3 }, canActivate: [AuthGuard] },
  { path: 'vk', component: RssComponent, data: { section: 2 }, canActivate: [AuthGuard] },
  { path: 'youtube', component: RssComponent, data: { section: 4 }, canActivate: [AuthGuard] },
  { path: 'hn', component: HackerNewsComponent, canActivate: [AuthGuard] },
  { path: 'lj', component: RssComponent, data: { section: 6 }, canActivate: [AuthGuard] },
  { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
  { path: 'feeds', component: FeedsComponent, canActivate: [AuthGuard] },
  { path: 'feeds/:id', component: FeedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
