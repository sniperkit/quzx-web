import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: 'navigation-tabs.component.html',
  styleUrls: ['navigation-tabs.component.css']
})
export class NavigationTabsComponent implements OnInit {

  currentSection: number = 1;

  constructor() { }

  ngOnInit() {
  }

  toggleSection(section: number) {

    this.currentSection = section;
  }
}
