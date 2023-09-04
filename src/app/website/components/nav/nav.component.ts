import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  user: User | null = null;
  categories: Category[] = [];
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('victor@email.com', '123456')
    .subscribe((user) => {
      this.user = user;
    })
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories,
    });
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/home']);
  }
}
