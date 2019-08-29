import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-client-notes',
  templateUrl: './client-notes.component.html',
  styleUrls: ['./client-notes.component.css']
})
export class ClientNotesComponent implements OnInit {
  posts: { class: string; date: string; header: string; user: string; location: string; message: string; }[];
  public Editor = ClassicEditor;
  constructor() { 

    this.posts = [
      {
        class: "green",
        date: "20-04-2018 - Today",
        header: "Hello, 'Im a single div responsive timeline without media Queries!",
        user: "Elisse Joson",
        location: "San Francisco, CA",
        message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card."
      },
      {
        class: "blue",
        date: "19-04-2018 - Yesterday",
        header: "Oeehhh, that's awesome.. Me too!",
        user: "Katherine Lumaad",
        location: "Oakland, CA",
        message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card."
      },
      {
        class: "warning",
        date: "21-02-2018",
        header: "An Engineer Explains Why You Should Always Order the Larger Pizza",
        user: "Gary Camara",
        location: "San Francisco, CA",
        message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, is the Lorem card."
      }
    ]
    
  }

  ngOnInit() {
  }

}
