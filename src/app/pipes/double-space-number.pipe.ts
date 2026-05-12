import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'dsNumber', standalone: true })
export class DoubleSpaceNumberPipe implements PipeTransform {
  private decimal = new DecimalPipe('fr-FR');

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';
    const formatted = this.decimal.transform(value, '1.0-0') ?? '';
    return formatted.replace(/\s/g, '  ');
  }
}
