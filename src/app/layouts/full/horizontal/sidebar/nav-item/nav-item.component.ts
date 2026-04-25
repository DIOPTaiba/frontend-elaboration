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

  const windowWidth = window.innerWidth;
  const dropdownWidth = 300;
  const anchor = this.el.nativeElement.querySelector('a.menuLink');
  const anchorRect = anchor.getBoundingClientRect();

  if (this.depth === 0) {
    this.dropdownTop = anchorRect.bottom;
    this.dropdownLeft = anchorRect.left;
  } else {
    this.dropdownTop = anchorRect.top;
    
    // Utilise exactement le bord droit du <a> sans aucun écart
    if (anchorRect.right + dropdownWidth > windowWidth) {
      this.dropdownLeft = anchorRect.left - dropdownWidth;
    } else {
      this.dropdownLeft = anchorRect.right - 20; // réduit l'écart de 20px
    }
  }

  this.isHovered = true;
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