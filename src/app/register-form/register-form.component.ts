import { Component, OnInit } from '@angular/core';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../forms.component.scss']
})
export class RegisterFormComponent implements OnInit {

  faPencilAlt = faPencilAlt;

  constructor() { }

  ngOnInit(): void {
  }
}
