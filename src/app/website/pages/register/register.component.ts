import { Component } from '@angular/core';

import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  onExit() {
    const response = confirm('Are yopu sure?');
    return response;
  }

}
