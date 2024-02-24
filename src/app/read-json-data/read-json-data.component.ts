import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-read-json-data',
  templateUrl: './read-json-data.component.html',
  styleUrls: ['./read-json-data.component.scss']
})
export class ReadJsonDataComponent implements OnInit {
  url = 'http://localhost:3000/locations';
  data: any[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllHousingLocations();
  }
  getAllHousingLocations() {
    this.http.get(this.url)
      .subscribe((data: any) => {
        this.data = data;
      });
  }
}
