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
  addUser() {
    const user = { name: 'John Doe', email: 'john@example.com' };
    this.http.post(this.url, user)
      .subscribe((data: any) => {
        console.log('User added successfully:', data);
      });
  }
  deleteUser(userId: number) {
    this.http.delete(`${this.url}/${userId}`)
      .subscribe((data: any) => {
        console.log('User deleted successfully:', data);
      });
  }
  updateUser(userId: number) {
    const updatedUser = { email: 'updated@example.com' };
    this.http.put(`${this.url}/${userId}`, updatedUser)
      .subscribe((data: any) => {
        console.log('User updated successfully:', data);
      });
  }


  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event?.dataTransfer?.files;
    this.handleFiles(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList | any) {
    for (let i = 0; i < files.length; i++) {
      const file = files;
      console.log(file);
      // Handle file upload logic here
    }
  }

}
