import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // ProductService is now available to this component and its children
  // providers: [ProductService],
})
export class ProductListComponet implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  showImage: boolean = false;
  products: IProduct[] = [];
  filiterredProducts: IProduct[] = [];
  private _listFilter: string = '';
  errorMessage: string = '';
  //  sub: Subscription | undefined;
  sub!: Subscription;

  constructor(private productService: ProductService) {
    // it is primarily used for initialization
    // we use constructor to inject dependencies
    console.log('constructor called');
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In value', value);
    this.filiterredProducts = this.performFiliter(value);
  }

  performFiliter(filiterBy: string): IProduct[] {
    // we want a case-insensitive comparison
    filiterBy = filiterBy.toLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLowerCase().includes(filiterBy) ||
        product.price.toString().includes(filiterBy) ||
        product.productCode.toLowerCase().includes(filiterBy)
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    console.log(message);
    this.pageTitle = `Product List ${message}`;
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    // calling setter method of _listFilter
    // this.listFilter = 'cart';

    this.sub = this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.filiterredProducts = this.products;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
