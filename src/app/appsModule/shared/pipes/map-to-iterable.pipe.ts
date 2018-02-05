import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mapToIterable'
})
export class MapToIterable implements PipeTransform  {
  transform(dict:any, args:any = [], trigger:number): any {
    var a:any[] = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}

export var MAPTOITERABLE_PROVIDERS = [
    MapToIterable
];