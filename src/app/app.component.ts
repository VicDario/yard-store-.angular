import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FilesService } from './services/files.service';
import { UserService } from './services/user.service';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  token!: string;
  imageFromServer: string | null = null;
  constructor(
    private title: Title,
    private userService: UserService,
    private fileService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('my-store');
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }
  imgParent = '';
  showImg = true;
  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'Victor',
      email: 'victor@email.com',
      password: '123456'
    })
    .subscribe((response) => {
      console.log(response);
    })
  }

  downloadFile() {
    this.fileService.getFile('file.pdf', `${environment.API_URL}/api/files/dummy.pdf`, 'application/pdf')
    .subscribe((response) => {
      console.log(response);
    })
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (!file) return;
    this.fileService.uploadFile(file, `${environment.API_URL}/api/files/upload`)
    .subscribe((response) => {
      this.imageFromServer = response.location;
    })
  }
}
