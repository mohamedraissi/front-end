import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { BookingService } from './services/booking.service';

import { LoginComponent } from './components/login/login.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BookingComponent } from './components/booking/booking.component';

import { DirectionsMapDirective } from './derective/map.derective';
import { ClickOutsideDirective } from './derective/dropdown.directive';
import { ClearMapDirective } from './derective/clearMap.derective';
import { NavbarbookingComponent } from './components/booking/navbarbooking/navbarbooking.component';
import { HebergementComponent } from './components/booking/hebergement/hebergement.component';
import { RestaurantComponent } from './components/booking/restaurant/restaurant.component';
import { VisiteComponent } from './components/booking/visite/visite.component';

import { SearchFilterPipe } from './pipe/filter-pipe';
import { ReserveComponent } from './components/booking/reserve/reserve.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';




const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent , canActivate:[AuthGuard] },
  { path: 'Gallery', component: GalleryComponent  },
  { path: 'Booking', component: BookingComponent  },
  { path: 'Booking/Hebergement', component: HebergementComponent  },
  { path: 'Booking/Restaurant', component: RestaurantComponent  },
  { path: 'Booking/Visite', component: VisiteComponent  },
  { path: 'Booking/reserver', component: ReserveComponent  },
  { path: 'user/:id', component: DetailComponent  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    FooterComponent,
    LoginComponent,
    UserComponent,
    BookingComponent,
    DirectionsMapDirective,
    ClearMapDirective,
    NavbarbookingComponent,
    HebergementComponent,
    RestaurantComponent,
    VisiteComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    ReserveComponent,
    DetailComponent,
    PageNotFoundComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
     BrowserAnimationsModule,
     ToastModule.forRoot(),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1Np5J4Vau658dG9QL6EDRWS4Dco3RvZI'
    }),
  ],
  providers: [ValidateService,AuthService, AuthGuard,BookingService,DirectionsMapDirective,],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
