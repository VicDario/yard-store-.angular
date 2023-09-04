import { Component, OnInit, inject } from '@angular/core';
import { User } from '@models/user.model';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  user: User | null = null;

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (data) => this.user = data
    })
  }
}
