import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MovieTmdbService } from 'src/app/services/tmdb-service';

@Component({
  selector: 'app-movie-searched-container',
  templateUrl: './movie-searched-container.component.html',
  styleUrls: ['./movie-searched-container.component.scss'],
})
export class MovieSearchedContainerComponent implements OnInit {
  @Input() randomMovie?: any;
  backDropImage?: string;
  constructor(private movieTmdbService: MovieTmdbService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
   this.cdref.detectChanges();
  }
}
