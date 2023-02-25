import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalClass: any;
  @Input() contentClass: any;
  @Input() modalID: any;
  @Input() backDrop = false;
  constructor() { }

  ngOnInit() {

  }

  close(event: any) {

    const elements = document.getElementsByClassName('set-grey-card');

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      element.classList.remove('set-grey-card');
    }

    let element = document.querySelector('#' + event);

    if (element) {
      element.classList.remove('md-show');
    }

  }
}
