export class Tweet {
  created_at: string;
  id: number;
  id_str: string;
  source: string;
  full_text: string;
  user: TweetUser;
}

export class TweetUser {
  description: string;
  name: string;
}
