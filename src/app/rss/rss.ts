export class RssFeed {
  Id: number;
  Title: string;
  Description: string;
  Link: string;
  LastSyncTime: number;
  ImageUrl: string;
  AlternativeName: string;
  Total: number;
  Unreaded: number;
  SyncInterval: any;
  RssType: number;
  ShowContent: number;
  ShowOrder: number;
  Folder: string;
  Broken: number;
}

export class RssItem {
  Id: number;
  FeedId: number;
  Title: string;
  Summary: string;
  Content: string;
  Link: string;
  Date: number;
}
