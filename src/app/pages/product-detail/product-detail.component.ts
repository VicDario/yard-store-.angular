import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId)
            return this.productsService.get(this.productId);
          else return of<null>();
        })
      )
      .subscribe((data) => (this.product = data));
  }

  goToBack(id:any) {
    this.router.navigate(['/category', id]);
  }
}
