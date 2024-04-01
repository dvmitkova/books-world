// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'slice'
// })
// export class SlicePipe implements PipeTransform {

//   transform(value: string, maxLength: number = 100): string {
//     return `${value.substring(0, maxLength)}${
//       value.length > maxLength ? '...' : ''
//     }`;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxLength: number = 200): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}
