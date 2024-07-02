import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  query: string = '';
  suggestions: any[] = [];
  searchType: string = 'artist'; // Default search type

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initial data fetch if needed
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
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

  displayFn(suggestion: any): string {
    return suggestion ? suggestion.name || suggestion.title : '';
  }
}
