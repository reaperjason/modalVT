import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';



@NgModule({
  declarations: [
    ModalComponent,
    DropdownListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    DropdownListComponent
  ]
})
export class SharedModule { }
