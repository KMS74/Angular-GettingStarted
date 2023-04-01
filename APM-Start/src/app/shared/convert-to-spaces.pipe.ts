import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpace',
})
export class ConvertToSpacePipe implements PipeTransform {
  transform(value: string, charachter: string): string {
    return value.replace(charachter, ' ');
  }
}
