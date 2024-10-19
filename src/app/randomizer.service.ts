import { NamesService } from './names.service';
import { Inject, Injectable } from '@angular/core';
import { NotAllowedTogether } from './NotAllowedTogether';
import { Student } from './Student';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor(@Inject(NamesService) private NamesService: NamesService) { }

  public randomize(): string[][] {
    let names = this.NamesService.getStudents().filter(x => !x.NotHere);
    let notAllowedNames = this.NamesService.getNotAllowedNames();
    let pairings: string[][] = [];
    let usedNames: string[] = [];

    // put the troublesome names at the first of the list
    names = names.sort((a, b) => {
      let aNotAllowed = notAllowedNames.filter(x => x.FirstName == a.Name || x.SecondName == a.Name).length;
      let bNotAllowed = notAllowedNames.filter(x => x.FirstName == b.Name || x.SecondName == b.Name).length;
      return bNotAllowed - aNotAllowed;
    });

    for (let i = 0; i < names.length; i++) {
      let name: string = names[i].Name;
      if (!usedNames.includes(name)) {
        const possibleNames = this.getPossibleNames(name, names, usedNames, notAllowedNames);

        if (names.length - usedNames.length == 1) {
          // There's an odd number of names, so put the name as a third person
          
          // Get the groups that are allowed
          let allowedGroups: number[] = [];
          const namesNotAllowed = notAllowedNames.filter(x => x.FirstName == name).concat(notAllowedNames.filter(x => x.SecondName == name));
          let iCount = 0;
          for (let group of pairings) {
            if (!(namesNotAllowed.map(x => x.FirstName).includes(group[0])
            || namesNotAllowed.map(x => x.SecondName).includes(group[0]))) {
              allowedGroups.push(iCount);
            }
            iCount++
          }

          if (allowedGroups.length == 0) {
            alert("There are no possible pairings for " + name + ". Please remove some restrictions or try again.");
            return [];
          }

          // Get a random pairing
          const index = Math.floor(Math.random() * allowedGroups.length);
          pairings[allowedGroups[index]][2] += name;

          return pairings;
        } else if (possibleNames.length == 0) {
          alert("There are no possible pairings for " + name + ". Please remove some restrictions or try again.");
          return [];
        }

        let randomName = this.getRandomName(possibleNames);

        if (randomName === "") {
          return [];
        }

        usedNames.push(name);
        usedNames.push(randomName);
        pairings.push([name, randomName, ""]);
      }
    }

    return pairings;
  }

  public getPossibleNames(nameToMatch: string, allNames: Student[], usedNames: string[], notAllowedNames: NotAllowedTogether[]) {
    let possibleNames: string[] = [];
    for (let name of allNames) {
      if (name.Name !== nameToMatch && !usedNames.includes(name.Name) && 
      notAllowedNames.findIndex(y => (y.FirstName == nameToMatch && y.SecondName == name.Name)
        || (y.FirstName == name.Name && y.SecondName == nameToMatch)) == -1) {
        possibleNames.push(name.Name);
      }
    }
    return possibleNames;
  }

  public getRandomName(possibleNames: string[]): string {    
    let randomIndex = Math.floor(Math.random() * possibleNames.length);
    return possibleNames[randomIndex];
  }
}
