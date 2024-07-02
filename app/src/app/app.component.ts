import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  query: string = '';
  suggestions: any[] = [];
  searchType: string = 'artist'; 
  selectedItems: any[] = []; 
  noResults: boolean = false; 

  constructor(private http: HttpClient) { }



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
    this.selectedItems = []; // Clear selected items when search type changes
    this.noResults = false; // Reset noResults flag
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedItem = event.option.value;
    this.query = selectedItem.name || selectedItem.title;
    this.selectedItems = [selectedItem]; // Display only the selected item
    // Fetch detailed information for the selected item
    this.http.get<any[]>(`http://localhost:5000/api/search?q=${this.query}&type=${this.searchType}&detailed=true`)
      .subscribe(
        (response) => {

          this.selectedItems = response;
        },
        (error) => {
          console.error('Error fetching detailed data', error);
          this.noResults = false;
        }
      );
  }

  onSearchButtonClick() {
    this.noResults = false;
    if (this.query.length) {
      // Fetch detailed information for the current query
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
    }
    this.suggestions = [];
    this.selectedItems = []; // Clear selected items when search type changes
    this.noResults = false;
  }

  displayFn(suggestion: any): string {
    return suggestion ? suggestion.name || suggestion.title : '';
  }
}
