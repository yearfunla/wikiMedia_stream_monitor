import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { StreamInt } from '../streamInterface';
import { StreamListService } from '../stream.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { DOCUMENT } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-stream-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './stream-list.component.html',
  styleUrl: './stream-list.component.css'
})
export class StreamListComponent  implements AfterViewInit  {
  // @Input() streamList!: StreamInt[];
  @Input() filter!: string;
  expandedElement: StreamInt | undefined;
  columnsToDisplay = ['id','title','user', 'domain','viewed'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];

  streamListService: StreamListService = inject(StreamListService);
  streamList: StreamInt[] = [];
  filterStreamList: StreamInt[] = [];


  dataSource = new MatTableDataSource<StreamInt>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(@Inject(DOCUMENT) private document: Document){
    console.log('StreamListComponent')
    console.log(this.streamList)
    console.log(this.filter)
    this.streamListService.getAllStreams().then((streamList: StreamInt[]) => {
      this.streamList=streamList;
      this.filterStreamList=streamList;
      this.dataSource.data = this.streamList;
      console.log('constructor home component')
      console.log(streamList[0])
      console.log(streamList.length)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log('in filter')
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickExpendedElement(element:any) {
    element.viewed=true
    this.expandedElement = this.expandedElement === element ? null : element
  }

  gotopage(element:any) {
    // open a new tab
    // window.location.href=element.title_url;
    // this.document.location.href=element.title_url;
    window.open(element.title_url, "_blank");
  }

}
