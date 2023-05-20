import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css'],
})
export class LazyImageComponent implements OnInit {
  @Input()
  public src!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  onLoad() {
    console.log('Image loaded');
    setTimeout(() => {
      this.hasLoaded = true;
    }, 500);
  }

  ngOnInit(): void {
    if (!this.src) {
      throw new Error('Attribute "src" is required');
    }
  }
}
