import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null) {
    if (id) this.onShowDetail(id);
  };
  @Output() loadMore = new EventEmitter();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen?: Product;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadPage();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.get(id)
    .subscribe({
      next: (data) => {
        this.statusDetail = 'success';
        this.productChosen = data;
        if (!this.showProductDetail) this.toggleProductDetail();
      },
      error: (error) => {
        this.statusDetail = 'error';
        console.error(error.message);
      }
    })
  }

  createNewProduct(dto: CreateProductDTO) {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: '',
      price: 1000,
      categoryId: 1,
      images: ['']
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log(data);
    });
  }

  updateProduct(id: string, dto: UpdateProductDTO) {
    const changes: UpdateProductDTO = {
      title: 'Little shirt',

    }
    this.productsService.update(id, changes)
    .subscribe(data => {
      this.showProductDetail = false;
      const index = this.products.findIndex(item => item.id === id)
      this.products[index] = data;
    });
  }

  deleteProduct(id: string) {
    this.productsService.delete(id)
    .subscribe(() => {
      const index = this.products.findIndex(item => item.id === id)
      this.products.splice(index, 1)
      this.showProductDetail = false;
    });
  }

  loadPage() {
    this.productsService.getAll(this.limit, this.offset)
    .subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
    });
  }

  readAndUpdate(id: string) {
    this.productsService.get(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'New title'}))
    )
    .subscribe((data) => {
      console.log(data);
    });
    zip(
      this.productsService.get(id),
      this.productsService.update(id, {title: 'New title 2'})
    )
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
