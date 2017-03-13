import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<div id="application">  
    <ul class="nav nav-tabs">
      <li role="presentation" [ngClass]="{active: currentSection === 1}"><a [routerLink]="['/torrents']" (click)="toggleSection(1)">Torrents</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 2}"><a [routerLink]="['/stack']" (click)="toggleSection(2)">Stack</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 3}"><a [routerLink]="['/rss']" (click)="toggleSection(3)">RSS</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 4}"><a [routerLink]="['/twitter']" (click)="toggleSection(4)">Twitter</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 5}"><a [routerLink]="['/reddit']" (click)="toggleSection(5)">Reddit</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 6}"><a [routerLink]="['/vk']" (click)="toggleSection(6)">VK</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 7}"><a [routerLink]="['/youtube']" (click)="toggleSection(7)">YouTube</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 8}"><a [routerLink]="['/hn']" (click)="toggleSection(8)">HN</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 9}"><a [routerLink]="['/lj']" (click)="toggleSection(9)">LJ</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 10}"><a [routerLink]="['/tags']" (click)="toggleSection(10)">Tags</a></li>
      <li role="presentation" [ngClass]="{active: currentSection === 999}" class="pull-right">
        <div class="btn-group" dropdown>
          <button type="button" class="btn btn-default btn-xs dropdown-toggle settings" dropdownToggle>
            <span class="glyphicon glyphicon-cog"></span>
          </button>
          <ul dropdownMenu role="menu" aria-labelledby="single-button" class="dropdown-menu-right">
            <li role="menuitem"><a [routerLink]="['/feeds']">Feeds</a></li>
          </ul>
        </div>
      </li>
    </ul>
    
</div>
<div>
    <router-outlet></router-outlet>
</div>
`,
  styles: [`
    #application { margin-left: 12px;
                   margin-right: 12px;
                   margin-top:  5px; }
                   
    .nav>li>a { padding: 5px 10px; }
    .settings {
      margin-top: 2px;
      margin-right: 2px;
    }                       
`]
})

export class AppComponent  {

  currentSection: number = 1;

  toggleSection(section: number) {

    this.currentSection = section;
  }

}
