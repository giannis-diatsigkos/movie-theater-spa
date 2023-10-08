import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Client, UserDto } from '../services/movie-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userExists: boolean = true;
  username: string = '';
  password!: string;
  confirmPassword!: string;
  token!: string;
  formGroup!: FormGroup;
  user?: UserDto = { password: '', username: '' };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private client: Client,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  login(): void {
    this.userExists = true;
    this.user!.username! = this.username;
    this.user!.password = this.formGroup.value.password;
    this.client.login(this.user).subscribe((token: any) => {
      if (token) {
        this.authService.setToken(token.token);
        const test = this.authService.setDecodedAccessToken(
          JSON.stringify(token)
        );
        console.log(test);
        this.router.navigate(['dashboard']);
      }
    });
  }

  signUp(): void {
    this.userExists = false;
    this.user!.username = this.username!;
    this.user!.password = this.formGroup.value.password!;
    if (this.user!.password === this.formGroup.value.confirmPassword!) {
      this.client.signup(this.user).subscribe((token) => {
        if (token) {
          const test = this.authService.setDecodedAccessToken(
            JSON.stringify(token)
          );
          console.log(test);
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.messageService.add({
        //key: 'bc',
        severity: 'error',
        summary: 'Error',
        detail: 'Use the same password',
      });
    }
  }
}
