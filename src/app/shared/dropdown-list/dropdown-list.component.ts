import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent {

  @Input() itemsRender: any[] = [];
  public itemsOriginal: any;

  @Output() itemSelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.itemsOriginal = this.itemsRender.slice();
    this.itemsRender.forEach(item => {
      const itemFullDesc = item.description;
      let code = itemFullDesc.substring(0, itemFullDesc.indexOf(' '));
      let desc = itemFullDesc.substring(itemFullDesc.indexOf(' ') + 1);
      item.code = code;
      item.desc = desc;
    });
  }

  itemsFiltering(event: any) {
    const valFilter = event.target.value;
    this.itemsRender = this.itemsOriginal.slice();
    const itemsTemp = this.itemsRender.filter(
      item => {
        return (item.description.toLowerCase().indexOf(valFilter) !== -1 || !valFilter);
      }
    );
    this.itemsRender = itemsTemp.slice();
  }

  itemClicked(event: any) {
    this.itemSelected.emit(event);
  }

}
