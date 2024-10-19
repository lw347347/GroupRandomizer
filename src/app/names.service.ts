import { Injectable } from '@angular/core';
import { Student } from './Student';
import { NotAllowedTogether } from './NotAllowedTogether';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  constructor() { }

  getStudents() : Student[] {
    return JSON.parse(localStorage.getItem('names') ?? "[]") as Student[];
  }

  addName(name: string) {
    let names = this.getStudents();
    names.push(new Student(name));

    localStorage.setItem('names', JSON.stringify(names));
  }

  removeName(name: string) {
    let allNames = this.getStudents();
    const index = allNames.findIndex(x => x.Name === name);
    if (index > -1) {
      allNames.splice(index, 1);
      localStorage.setItem('names', JSON.stringify(allNames));
    }

    this.removeNotAllowedName(name);
  }

  getNotAllowedNames() : NotAllowedTogether[] {
    return JSON.parse(localStorage.getItem('notAllowedNames') ?? "[]") as NotAllowedTogether[];
  }

  addNotAllowedName(name1: string, name2: string) {
    let notAllowedNames = this.getNotAllowedNames();
    notAllowedNames.push(new NotAllowedTogether(name1, name2));

    localStorage.setItem('notAllowedNames', JSON.stringify(notAllowedNames));
  }

  removeNotAllowedTogether(notAllowedTogether: NotAllowedTogether) {
    let notAllowedTogetherList = this.getNotAllowedNames();
    const index = notAllowedTogetherList.findIndex(x => x.FirstName === notAllowedTogether.FirstName 
      && x.SecondName === notAllowedTogether.SecondName);
    if (index > -1) {
      notAllowedTogetherList.splice(index, 1)
      localStorage.setItem('notAllowedNames', JSON.stringify(notAllowedTogetherList));
    }
  }
  
  removeNotAllowedName(notAllowedName: string) {
    const itemsToRemove = this.getNotAllowedNames().filter(x => x.FirstName == notAllowedName || x.SecondName == notAllowedName);
    let originalNames = this.getNotAllowedNames();

    for (let item of itemsToRemove) {
      originalNames.splice(originalNames.indexOf(item), 1);
    }
      
    localStorage.setItem('notAllowedNames', JSON.stringify(originalNames));
  }

  markStudentAsNotHere(name: string, notHere: boolean = true) {
    let allNames = this.getStudents();
    const index = allNames.findIndex(x => x.Name === name);
    if (index > -1) {
      allNames[index].NotHere = notHere;
      localStorage.setItem('names', JSON.stringify(allNames));
    }
  }
}
