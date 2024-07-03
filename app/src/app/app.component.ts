import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  query: string = '';
  suggestions: any[] = [];
  searchType: string = 'artist'; 
  selectedItems: any[] = [];
  noResults: boolean = false; 
  showSuggestions: boolean = false;

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.query = value;
    if (value.length > 1) {
      this.http.get<any[]>(`http://localhost:5000/api/search?q=${value}&type=${this.searchType}&detailed=false`)
        .subscribe(
          (response) => {
            console.log(response);
            this.suggestions = response;
            this.showSuggestions = this.suggestions.length > 0;
          },
          (error) => {
            console.error('Error fetching data', error);
          }
        );
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onSearchTypeChange() {
    this.query = '';
    this.suggestions = [];
    this.selectedItems = []; 
    this.noResults = false; 
    this.showSuggestions = false;
  }

  onOptionSelected(suggestion: any) {
    this.query = suggestion.name || suggestion.title;
    this.selectedItems = [suggestion]; 
    this.showSuggestions = false; 
    
    this.http.get<any[]>(`http://localhost:5000/api/search?q=${this.query}&type=${this.searchType}&detailed=true`)
      .subscribe(
        (response) => {
          this.selectedItems = response;
          this.query = suggestion.name || suggestion.title;
        },
        (error) => {
          console.error('Error fetching detailed data', error);
          this.noResults = false;
        }
      );
  }

  onSearchButtonClick() {
    this.noResults = false;
    this.showSuggestions = false;
    if (this.query.length) {
      
      this.http.get<any[]>(`http://localhost:5000/api/search?q=${this.query}&type=${this.searchType}&detailed=true`)
        .subscribe(
          (response) => {
            console.log(response);
            this.noResults = response.length === 0;
            this.selectedItems = response;
          },
          (error) => {
            console.error('Error fetching detailed data', error);
            this.noResults = false;
          }
        );
    }else{
      this.suggestions = [];
    this.selectedItems = []; 
    }
  }

  displayFn(suggestion: any): string {
    return suggestion ? suggestion.name || suggestion.title : '';
  }
}
