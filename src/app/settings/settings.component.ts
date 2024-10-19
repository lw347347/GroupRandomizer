import { NotAllowedTogether } from './../NotAllowedTogether';
import { Component, Inject } from '@angular/core';
import { NamesService } from '../names.service';
import { Student } from '../Student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [
    NamesService
  ]
})
export class SettingsComponent {
  public students: Student[];
  public notAllowedNames: NotAllowedTogether[];
  public name: string = "";
  public firstName: string = "";
  public secondName: string = "";

  constructor(@Inject(NamesService) private namesService: NamesService) {
    this.students = namesService.getStudents();
    this.notAllowedNames = namesService.getNotAllowedNames();
  }

  public addName() {
    this.namesService.addName(this.name);
    this.students = this.namesService.getStudents();
    this.name = "";
  }

  public removeName(name: string) {
    this.namesService.removeName(name);
    this.students = this.namesService.getStudents();
  }

  public addNotAllowedName() {
    this.namesService.addNotAllowedName(this.firstName, this.secondName);
    this.notAllowedNames = this.namesService.getNotAllowedNames();
  }

  public removeNotAllowedName(notAllowedTogether: NotAllowedTogether) {
    this.namesService.removeNotAllowedTogether(notAllowedTogether);
    this.notAllowedNames = this.namesService.getNotAllowedNames();
  }

  public toggleNotHere(student: Student) {
    this.namesService.markStudentAsNotHere(student.Name, !student.NotHere);    
    this.students = this.namesService.getStudents();
  }
}
