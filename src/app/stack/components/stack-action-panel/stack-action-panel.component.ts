import { Component, OnInit, Output, EventEmitter } from '@angular/core';

enum StackEventType {
  MarkAllAsReaded,
  MarkAsReadedOlderOneDay,
  SortByRating,
  SortByDate
}

@Component({
  selector: 'stack-action-panel',
  templateUrl: './stack-action-panel.component.html',
  styleUrls: ['./stack-action-panel.component.css']
})
export class StackActionPanelComponent implements OnInit {

  @Output() onMarkAllAsReaded = new EventEmitter();
  @Output() onMarkAsReadedOlderOneDay = new EventEmitter();
  @Output() onSortByRating = new EventEmitter();
  @Output() onSortByDate = new EventEmitter();

  public eventType = StackEventType;

  constructor() { }

  ngOnInit() {
  }

  generateEvent(e: MouseEvent, eventType: StackEventType) {

    switch (eventType) {
      case StackEventType.MarkAllAsReaded:
        this.onMarkAllAsReaded.emit();
        break;
      case StackEventType.MarkAsReadedOlderOneDay:
        this.onMarkAsReadedOlderOneDay.emit();
        break;
      case StackEventType.SortByRating:
        this.onSortByRating.emit();
        break;
      case StackEventType.SortByDate:
        this.onSortByDate.emit();
        break;
      default:
        break;
    }

    e.preventDefault();
  }
}
