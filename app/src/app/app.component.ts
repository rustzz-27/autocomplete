import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  query: string = '';
  suggestions: any[] = [];
  searchType: string = 'artist';

  constructor(private http: HttpClient) { }



  onSearchChange(value: string) {
    this.query = value;
    if (value.length > 1) {
      this.http.get<any[]>(`http://localhost:5000/api/search?q=${value}&type=${this.searchType}`)
        .subscribe(
          (response) => {
            this.suggestions = response;
          },
          (error) => {
            console.error('Error fetching data', error);
          }
        );
    } else {
      this.suggestions = [];
    }
  }

  onSearchTypeChange() {
    this.query = '';
    this.suggestions = [];
  }
}
