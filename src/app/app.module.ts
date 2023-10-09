import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordModule } from 'primeng/password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './auth/dashboard/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MenubarModule } from 'primeng/menubar';
import { HomePageComponent } from './auth/dashboard/dashboard/home-page/home-page.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ImageModule } from 'primeng/image';
import { MenuItemsComponent } from './shared/menu-items/menu-items.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MovieSearchedContainerComponent } from './shared/movie-searched-container/movie-searched-container.component';
import { MovieDetailsComponent } from './auth/dashboard/dashboard/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomePageComponent,
    MenuItemsComponent,
    MovieSearchedContainerComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    TabViewModule,
    ToastModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    MenubarModule,
    OrganizationChartModule,
    MegaMenuModule,
    SidebarModule,
    ImageModule,
    SkeletonModule,
    DropdownModule,
    ProgressSpinnerModule,
    PaginatorModule,
    AutoCompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
