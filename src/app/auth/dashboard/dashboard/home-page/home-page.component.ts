import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { debounceTime, timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  Category,
  Client,
  CreateMovieDto,
  LikedMovieDto,
  MovieDto,
} from 'src/app/services/movie-service';
import { MovieTmdbService } from 'src/app/services/tmdb-service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  selectedNodes!: TreeNode[];
  first: number = 0;
  items: any[] | undefined;
  rows: number = 10;
  categories: any[] = [];
  selectedCategory: any | undefined;
  likedMovie: boolean = false;
  hasResult: boolean = true;
  suggestions: any[] = [];
  searchedMovie: any;
  hasMovieResult: 'default' | 'hasResult' | 'notFound' = 'default';
  likedMovieModel: LikedMovieDto = {};
  username: string = '';
  movies!: MovieDto[];
  loadingBody: boolean = false;
  value?: string;
  createMovie: CreateMovieDto = {};

  constructor(
    private client: Client,
    private authService: AuthService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private movieTmdbService: MovieTmdbService
  ) {}

  ngOnInit(): void {
    this.initData();
  }
  isLiked(movieId: number): boolean {
    return this.movies.some((x) =>
      x.likedByUsers?.find(
        (x) => x.movieId === movieId && x.userName == this.username
      )
    );
  }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
  initData() {
    this.client.getMovies().subscribe((movies: any) => {
      this.movies = movies;
      this.categories = [
        { name: Category.ACTION, code: 'Action' },
        { name: Category.COMEDY, code: 'Comedy' },
        { name: Category.DRAMA, code: 'Drama' },
        { name: Category.FANTASY, code: 'Fantasy' },
        { name: Category.HORROR, code: 'Horror' },
        { name: Category.ROMANCE, code: 'Romance' },
        { name: Category.THRILLER, code: 'Romance' },
      ];
      if (!this.movies) {
        return;
      }
      this.randomMovie();
      console.log(this.movies);
    });
  }

  likeMovie(movieId: number, movieTitle: string): void {
    this.client
      .likedMovie(this.username, movieTitle, movieId)
      .subscribe((likedMovie) => {
        this.likedMovieModel = likedMovie;
        this.initData();
        const addedToLiked = this.isLiked(this.likedMovieModel.movieId!);
        console.log(addedToLiked);
        if (!addedToLiked && this.likedMovieModel) {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: `${this.likedMovieModel.title} movie is added to your Likes`,
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: `${this.likedMovieModel.title} movie is removed from your Likes`,
          });
        }
      });
  }
  searchMovie(): void {
    // if (!this.value) {
    //   return;
    // }
    // this.movieTmdbService.searchMovies(this.value).subscribe((movie) => {
    //   this.searchedMovie = movie.results[0];
    //   console.log(movie);
    //   this.client.getMovie(movie.results[0].id).subscribe(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error) => {
    //       this.hasMovieResult = 'notFound';
    //     }
    //   );
    // });
  }

  randomMovie(): void {
    const random = Math.floor(Math.random() * this.movies.length);
    this.searchedMovie = this.movies[random];
  }

  autoComplete(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    if (!this.value) {
      return;
    }

    this.movieTmdbService.searchMovies(this.value).subscribe((movie) => {
      for (let i = 0; i < (movie.results as any[]).length; i++) {
        let searchMovie = (movie.results as any[])[i];
        filtered.push(searchMovie);
      }
      this.suggestions = filtered;
      console.log(movie);
      // this.suggestions = movie.results.map((item: any) => item.original_title);
      // movie.results.forEach((element: { title: any; poster_path: any }) => {
      //   console.log(element);
      //   this.items?.push(element);
      // });
    });
  }
  addMovie(movie: any) {
    this.createMovie = {
      tmdbId: movie.id,
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      title: movie.title,
      popularity: movie.popularity,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      castMembers: [],
    };
    this.client.addMovie(this.createMovie).subscribe((result) => {
      if (result) {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: `Succesfully Added`,
        });
        this.initData();
      }
    });
  }
}
