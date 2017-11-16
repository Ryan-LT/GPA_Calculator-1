import { Component, Input, SimpleChanges,ElementRef, ViewChild } from '@angular/core';
import { Course } from "./Course";
import { GpaCalculatorService } from "./gpa-calculator.service";
import jsPDF from 'jspdf';
import { fail } from 'assert';
declare let jsPDF: any;
@Component({
    selector: 'gpa-calculator',
    templateUrl: './gpa-calculator.component.html',
    styleUrls: ['./gpa-calculator.component.css']
})

export class GpaCalculatorComponent {
    @ViewChild('report') el: ElementRef;
    title = 'Gpa Calculator';
    @Input() transcript: any;
    transcript_default: any;
    hopeGPA: any = null;
    colorSelected = "Full";
    constructor(private gpaCalculatorService: GpaCalculatorService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        changes.transcript.currentValue;
        this.transcript_default = this.deepCopy(this.transcript);
        this.hopeGPA = null;
    }

    public download() {
        let pdf = new jsPDF('l', 'pt', 'a5');
        let options = {
          pagesplit: true
        };
        pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
          pdf.save("report.pdf");
        });
    }

    showCheck(color: string): boolean {
        if (this.hopeGPA == null)
            return true;
        if (this.colorSelected == "Full")
            return true;
        else if (color == this.colorSelected)
            return true;
    }
    setColor(grade): string {
        if (this.hopeGPA == null || this.hopeGPA == 0)
            return "white";
        if (grade < this.hopeGPA - 0.7) {
            return "red";
        }
        if (grade < this.hopeGPA) {
            return "yellow";
        }
        if (grade >= this.hopeGPA) {
            return "green";
        }
    }

    modifiedCourses(transcript): any {
        let modifiedTranscript: any[] = [];
        for (var i in this.transcript_default) {
            if (this.convertGrade(this.transcript_default[i].Grade) != this.convertGrade(transcript[i].Grade)) {
                modifiedTranscript.push(transcript[i]);
            }
        }
        return modifiedTranscript;
    }
    gradeBeforeModified(CourseID): any {
        let grade = 0;
        let run=true;
        this.transcript_default.forEach(element => {
            if(run){
                if(element.CourseID==CourseID){
                    grade=element.Grade;
                    run = false;
                }
            }   
        });
        return grade;
    }
    refreshData() {
        this.transcript = this.deepCopy(this.transcript_default);
        this.colorSelected = "Full";
    }
    deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }
    gpaCalculator(transcript): number {
        if (transcript != null) {
            let gpa = 0;
            let sumGradePoints = 0;
            let sumCreditEarned: number = 0;
            transcript.forEach(course => {
                sumGradePoints += Number(this.convertGrade(course.Grade) * course.CreditEarned);
                sumCreditEarned += Number(course.CreditEarned);
            });
            return sumGradePoints / sumCreditEarned;
        }
    }
    grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
    onSellectGrades(CourseID) {
        let grade;
        this.transcript_default.forEach(element => {
            if (element.CourseID == CourseID) {
                grade = element.Grade;
            }
        });
        let newGrades = [];
        let keepGoing = true;
        this.grades.forEach(element => {
            if (keepGoing) {
                newGrades.push(element);
                if (grade == element) {
                    keepGoing = false;
                }
            }
        });
        return newGrades;
    }
    text = "";
    openExport() {
        this.text = "text done!";
    }
    deleteChange(CourseID) {
        this.transcript_default.forEach(element => {
            if (element.CourseID == CourseID) {
                let Course = element;
                this.transcript.forEach(element => {
                    if (element.CourseID == CourseID) {
                        element.Grade = Course.Grade;
                    }
                });
            }
        });
    }
    convertGrade(grade): number {
        switch (grade) {
            case ("A"): { return 4.0 }
            case ("A-"): { return 3.7 }
            case ("B+"): { return 3.3 }
            case ("B"): { return 3.0 }
            case ("B-"): { return 2.7 }
            case ("C+"): { return 2.3 }
            case ("C"): { return 2.0 }
            case ("C-"): { return 1.7 }
            case ("D+"): { return 1.3 }
            case ("D"): { return 1.0 }
            case ("D-"): { return 0.7 }
            case ("F"): { return 0 }
            case ("a"): { return 4.0 }
            case ("a-"): { return 3.7 }
            case ("a+"): { return 3.3 }
            case ("b"): { return 3.0 }
            case ("b-"): { return 2.7 }
            case ("c+"): { return 2.3 }
            case ("c"): { return 2.0 }
            case ("c-"): { return 1.7 }
            case ("d+"): { return 1.3 }
            case ("d"): { return 1.0 }
            case ("d-"): { return 0.7 }
            case ("f"): { return 0 }
        }
        return 0;
    }
}

