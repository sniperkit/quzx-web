export class Tag {
  id: number;
  title: string;
  total: number;
  unreaded: number;
}

export class TaggedItem {
  id: number;
  tagid: number;
  title: string;
  summary: string;
  content: string;
  link: string;
  date: number;
  source: number;
}
