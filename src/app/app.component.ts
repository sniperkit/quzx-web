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
  styles: [`
    #application { margin-left: 12px;
                   margin-right: 12px;
                   margin-top:  5px; }                                              
`]
})

export class AppComponent  {

}
