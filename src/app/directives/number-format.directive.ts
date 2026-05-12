import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numberFormatInput]',
  standalone: true
})
export class NumberFormatDirective implements OnInit {

  constructor(private el: ElementRef<HTMLInputElement>, private control: NgControl) {}

  ngOnInit(): void {
    this.display(this.control.value);
  }

  @HostListener('focus')
  onFocus(): void {
    const raw = this.parse(this.el.nativeElement.value);
    this.el.nativeElement.value = raw !== null ? String(raw) : '';
  }

  @HostListener('blur')
  onBlur(): void {
    const raw = parseFloat(this.el.nativeElement.value.replace(/\s/g, '').replace(',', '.'));
    const val = isNaN(raw) ? 0 : raw;
    this.control.control?.setValue(val, { emitEvent: false });
    this.display(val);
  }

  private display(value: number | null | undefined): void {
    if (value === null || value === undefined || isNaN(Number(value))) {
      this.el.nativeElement.value = '';
      return;
    }
    const formatted = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Number(value));
    this.el.nativeElement.value = formatted.replace(/ |\s/g, '  ');
  }

  private parse(displayed: string): number | null {
    const cleaned = displayed.replace(/\s/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  }
}
