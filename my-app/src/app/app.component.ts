import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GPA Calculator';
  transcript : any;
  updateTranscript(event){
    this.transcript = event;
  }
}
