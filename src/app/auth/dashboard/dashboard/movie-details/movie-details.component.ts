import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { MovieTmdbService } from 'src/app/services/tmdb-service';
import ColorThief from 'colorthief';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieId: string = '';
  movieDetails: any;
  backdrops: any = [];
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  videos: any = [];
  responsiveOptions: any[] = [];
  message: Message[] = [];
  backgroundPosterColors: string[] = [];
  fromColor: string = '';
  toColor: string = '';
  constructor(
    private route: ActivatedRoute,
    private movieTmdbService: MovieTmdbService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.message = [
      {
        severity: 'warn',
        summary: 'Waning',
        detail: 'This Movie is not in your Library',
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
    this.movieTmdbService.getMovie(this.movieId).subscribe((result) => {
      this.movieDetails = result;
      console.log(this.movieDetails);
    });
    this.movieTmdbService
      .getBackdropsImages(this.movieId)
      .subscribe((result: any) => {
        if (result) {
          this.backdrops = result.backdrops;
          this.getColorPalette();
          console.log(this.backdrops);
        }
      });

    this.movieTmdbService
      .getMovieVideos(this.movieId)
      .subscribe((result: any) => {
        console.log(result);
        result.results.forEach((element: { key: string }, index: any) => {
          this.videos.push(this.baseUrl + element.key);
        });
        console.log(this.videos);
      });
  }
  getColorPalette() {
    const img = document.getElementById('imgPoster') as HTMLImageElement;
    if (img) {
      this.loadImage(img.src).then(() => {
        this.extractColorPalette(img);
      });
    }
  }
  loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
  private extractColorPalette(img: HTMLImageElement) {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img, 2);
    palette.forEach((color: number[]) => {
      this.getHexValues(color[0], color[1], color[2]);
    });
    this.fromColor = this.backgroundPosterColors[0];
    this.toColor = this.backgroundPosterColors[1];
  }

  public getHexValues(r: number, g: number, b: number) {
    const hex =
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
    if (hex != null) {
      this.backgroundPosterColors.push(hex);
    }
    console.log(this.backgroundPosterColors);
  }
}
