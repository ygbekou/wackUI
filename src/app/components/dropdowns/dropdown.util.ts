import {Injectable} from '@angular/core';

@Injectable()
export class DropdownUtil {


  static filter(event, entities) {
    const query = event.query;
    const filteredEntities = [];
    if (query) {
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filteredEntities.push(entity);
        }
      }
    } else {
      filteredEntities.push(...entities);
    }

    return filteredEntities;
  }

  static filterLastFirstName(event, entities) {
    const query = event.query;
    const filteredEntities = [];
    if (query) {
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const name = entity.lastName + ' ' + entity.firstName;
        if (name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filteredEntities.push(entity);
        }
      }
    } else {
      filteredEntities.push(...entities);
    }

    return filteredEntities;
  }

  static handleDropdownClick(entities) {
    let filteredEntities = [];
    setTimeout(() => {
      filteredEntities = entities;
    }, 100);

    return filteredEntities;
  }


}

