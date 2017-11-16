import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { GpaCalculatorComponent } from "./gpa-calculator/gpa-calculator.component";
import { GpaCalculatorService } from "./gpa-calculator/gpa-calculator.service";
import { xmlConvertComponent } from "./xml-convert/xml-convert.component";

@NgModule({
  declarations: [
    AppComponent,
    GpaCalculatorComponent,
    xmlConvertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GpaCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
