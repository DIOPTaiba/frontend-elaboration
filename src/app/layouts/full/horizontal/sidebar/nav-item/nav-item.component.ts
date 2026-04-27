import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../../../services/nav.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-horizontal-nav-item',
  imports: [CommonModule, MatIconModule],
  templateUrl: './nav-item.component.html',
})
export class AppHorizontalNavItemComponent implements OnInit {
  @Input() depth: any;
  @Input() item: any;
  
  dropdownTop = 0;
  dropdownLeft = 0;
  isHovered = false;

  constructor(
    public navService: NavService,
    public router: Router,
    private el: ElementRef
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {}
private hideTimeout: any;
onMouseEnter() {
  clearTimeout(this.hideTimeout);

  const anchor = this.el.nativeElement.querySelector('a.menuLink');
  const anchorRect = anchor.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  if (this.depth === 0) {
    this.dropdownTop = anchorRect.bottom;
    // Vérifie si le dropdown dépasse à droite
    this.dropdownLeft = Math.min(anchorRect.left, windowWidth - 240);
    this.isHovered = true;
  } else {
    this.dropdownTop = -9999;
    this.dropdownLeft = -9999;
    this.isHovered = true;

    setTimeout(() => {
      const childBox = this.el.nativeElement.querySelector('.childBox');
      const realWidth = childBox ? childBox.offsetWidth : 300;

      this.dropdownTop = anchorRect.top;

      if (anchorRect.right + realWidth > windowWidth) {
        // Pas assez de place à droite : affiche à gauche
        this.dropdownLeft = anchorRect.left - realWidth - 10;
      } else {
        this.dropdownLeft = anchorRect.right - 9;
      }

      // S'assure que le dropdown ne dépasse jamais le bord droit
      if (this.dropdownLeft + realWidth > windowWidth) {
        this.dropdownLeft = windowWidth - realWidth - 9;
      }

      // S'assure que le dropdown ne dépasse jamais le bord gauche
      if (this.dropdownLeft < 0) {
        this.dropdownLeft = 10;
      }

    }, 0);
  }
}

cancelHide() {
  clearTimeout(this.hideTimeout);
  this.isHovered = true;
}

onMouseLeave() {
  this.hideTimeout = setTimeout(() => {
    this.isHovered = false;
  }, 150);
}


  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
  }
}