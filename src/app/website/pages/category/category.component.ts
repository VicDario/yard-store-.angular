import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private activedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  categoryId!: string | null;
  products: Product[] = [];

  ngOnInit(): void {
    this.activedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId)
            return this.productsService.getByCategory(this.categoryId);
          else return [];
        })
      )
      .subscribe((data) => (this.products = data));
  }
}
