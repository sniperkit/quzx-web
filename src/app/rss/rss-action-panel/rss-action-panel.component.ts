import { Component, OnInit, Output, EventEmitter} from '@angular/core';

enum EventType {
  ShowContent,
  SortByNewest,
  SortByOldest,
  Edit,
  Unsubscribe,
  ReadAll
}

@Component({
  selector: 'rss-action-panel',
  templateUrl: './rss-action-panel.component.html',
  styleUrls: ['./rss-action-panel.component.css']
})

export class RssActionPanelComponent implements OnInit {

  @Output() onShowContent = new EventEmitter();
  @Output() onSortByNewest = new EventEmitter();
  @Output() onSortByOldest= new EventEmitter();
  @Output() onReadAll = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onUnsubscribe = new EventEmitter();

  public eventType = EventType;

  constructor() { }

  ngOnInit() {
  }

  generateEvent(e: MouseEvent, eventType: EventType) {

    switch (eventType) {
      case EventType.ShowContent:
        this.onShowContent.emit();
        break;
      case EventType.SortByNewest:
        this.onSortByNewest.emit();
        break;
      case EventType.SortByOldest:
        this.onSortByOldest.emit();
        break;
      case EventType.Edit:
        this.onEdit.emit();
        break;
      case EventType.ReadAll:
        this.onReadAll.emit();
        break;
      case EventType.Unsubscribe:
        this.onUnsubscribe.emit();
        break;
      default:
        break;
    }

    e.preventDefault();
  }
}
