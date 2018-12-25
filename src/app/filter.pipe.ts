import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'//Filter used for real time search
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.message.toLowerCase().includes(searchText);
    });
  }
}
