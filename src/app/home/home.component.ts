import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamInt } from '../streamInterface';
import { StreamListService } from '../stream.service';
import { StreamListComponent } from '../stream-list/stream-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    StreamListComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

  public filter1: string = '';

  streamListService: StreamListService = inject(StreamListService);
  streamList: StreamInt[] = [];
  filterStreamList: StreamInt[] = [];
  

  constructor() {

    this.streamListService.getAllStreams().then((streamList: StreamInt[]) => {
      this.streamList=streamList;
      this.filterStreamList=streamList;
      console.log('constructor home component')
      console.log(streamList[0])
    })
  }

  filterResults(text: string) {
    console.log("filter")
    console.log(text)
    if (!text) {
      this.filterStreamList=this.streamList;
      return;
    }

    this.filter1=text;
    this.filterStreamList=this.streamList;
  }
}
