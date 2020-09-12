import { Pipe, PipeTransform } from '@angular/core';
import { Card, Column } from '@services/board/board-interfaces';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: Column[] | Card[]) {
    if (data) {
      return data.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
    }

    return data;
  }
}
