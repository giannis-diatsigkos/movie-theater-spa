import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, finalize, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    console.log('authToken:', authToken); // Check the value in the console
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next.handle(request).pipe(
      finalize(() => {
      }),
      catchError((err: any) => {
        let errorMessage = '';
        if (err.error instanceof Blob) {
          this.getProblemDetails(err).subscribe({
            next: (problemDetails) => {
              errorMessage = problemDetails;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error,
              });
            },
          });
        } else {
          errorMessage = `Message: ${err.message}`;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  private getProblemDetails(err: HttpErrorResponse): Observable<string> {
    return new Observable<string>((observer) => {
      if (!err.error) {
        observer.error(err);
        observer.complete();
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const problemDetails = JSON.stringify((event.target as any).result);
          observer.next(problemDetails);
          observer.complete();
          return;
        } catch {
          observer.error(err);
          observer.complete();
          return;
        }
      };
      reader.readAsText(err.error);
    });
  }
}
