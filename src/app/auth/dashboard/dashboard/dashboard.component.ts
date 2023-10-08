import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuItem } from 'src/app/models/menu-item.model';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string = '';
  menuItem: IMenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Home',
      route: '',
    },
    {
      icon: 'pi pi-heart',
      label: 'Favorite',
      route: '',
    },
    {
      icon: 'pi pi-user',
      label: 'Profile',
      route: '',
    },
  ];
  sidebarVisible: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.username = this.authService.getDecodedAccessToken();
  }
  onClick() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  sidebarBtn() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authService.logout();
  }
  menuClicked(index: number): void {
  }
}
