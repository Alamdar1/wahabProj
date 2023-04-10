import {formatNumber} from '@angular/common';

export class Numbers {
  static format(value: number, digitsInfo = '1.2-2', locale = 'en'): string {
    return formatNumber(value, locale, digitsInfo);
  }
}

export interface HeaderCustom {
  text: string;
  class?: string;
  colspan?: number;
  rowspan?: number;
}
