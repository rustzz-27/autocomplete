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
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.fetchData ();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:5000/data')
      .subscribe(
        response => this.data = response,
        error => console.error('Error fetching data', error)
      );
  }

  onSearchChange(value: string) {
    this.query = value;
    if (value.length > 2) {
      this.suggestions = this.data.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.albums.some((album:any) => album.title.toLowerCase().includes(value.toLowerCase())) ||
        item.albums.some((album:any) => album.songs.some((song:any) => song.title.toLowerCase().includes(value.toLowerCase())))
      );
    } else {
      this.suggestions = [];
    }
  }
}
