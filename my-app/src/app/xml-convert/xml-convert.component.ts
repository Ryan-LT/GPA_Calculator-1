import { Component, Output, EventEmitter } from '@angular/core';
import * as xml2js from "xml2js";
import { Course } from '../gpa-calculator/Course';

@Component({
    selector: 'xml-convert',
    templateUrl: './xml-convert.component.html',
    styleUrls: ['./xml-convert.component.css']
})

export class xmlConvertComponent {
    xml: any;
    xmlconvert:string = "";
    courses : Course[] =[];
    @Output()transcript: EventEmitter<any> = new EventEmitter<any>();
    constructor(){

    }
    convert(any) {
        let obj4 : string = "";
        let data : Course[] =[];
        xml2js.parseString(any, function (err, result) {
            let table = result.Report.Table1;
            table.forEach(element => {
                obj4 += element.TXTTENMON[0];
                data.push({Day: element.TEXT33[0],CourseID: element.TEXT34[0],CourseTitle: element.TXTTENMON[0],Grade: element.TEXT36[0],CreditEarned: element.TEXT4[0]});
            });
            
        });
        this.xmlconvert = obj4;
        this.courses = data;
        this.transcript.emit(this.courses);
    }
    public previewFile(event) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.convert(e.target.result);
        };
        reader.readAsText(event.target.files[0]);
      }
}
