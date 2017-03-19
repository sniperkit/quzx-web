import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<div id="application">  
    <app-navigation-tabs></app-navigation-tabs>   
</div>
<div>
    <router-outlet></router-outlet>
</div>
`,
  styleUrls: ['app.component.css']
})

export class AppComponent  {
}
