import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-shared-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent {
  @Output() menuIndex = new EventEmitter<number>();
  @Output() logoutEvent = new EventEmitter();
  constructor(private router: Router) {}
  selectedIndex: number = 0;
  menuItem: IMenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Home',
      route: '/dashboard/homePage',
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

  menuClicked(index: number): void {
    this.router.navigate([this.menuItem[index].route]);
  }

  logout(): void {
    this.logoutEvent.emit();
  }
}
