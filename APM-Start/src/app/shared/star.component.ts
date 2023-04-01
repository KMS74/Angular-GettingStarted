import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input('productRating') rating: number = 0;
  // by defalut 75px-> the width of 5 stars
  cropWidth: number = 75;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter();

  // A lifecycle hook that is called when any data-bound property changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.cropWidth = (this.rating * 75) / 5;
  }

  onClick(): void {
    console.log(`The rating ${this.rating} was clicked`);
    // emmitting custom event
    this.ratingClicked.emit(`The rating ${this.rating}`);
  }
}
