import { Component } from '@angular/core';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent {
  employees: any[] = [];

  constructor() { }

  ngOnInit(): void {
    const storedData = localStorage.getItem('registration_data');
    if (storedData) {
      this.employees = JSON.parse(storedData);
    }
  }

}
