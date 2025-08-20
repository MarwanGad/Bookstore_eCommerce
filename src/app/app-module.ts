import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthGaurd } from './services/auth-gaurd.service';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminAuthGaurdService } from './services/admin-auth-gaurd.service';
import { NewProductComponent } from './admin/admin-products/new-product/new-product.component';
import { EditProductComponent } from './admin/admin-products/edit-product/edit-product.component';
import { TitlePipe } from './pipes/title-pipe';
import { BookComponent } from './book/book.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import { provideAnimations } from '@angular/platform-browser/animations';

import player from 'lottie-web';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    RegisterComponent,
    LoginComponent,
    AdminUsersComponent,
    NewProductComponent,
    EditProductComponent,
    TitlePipe,
    BookComponent,
    ProductFilterComponent,
    ProductCardComponent,
    EditProfileComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '' , component: HomeComponent },
      { path: 'products/:id', component: BookComponent},
      { path: 'products' , component: ProductsComponent},
      { path: 'login' , component: LoginComponent},
      { path: 'register' , component: RegisterComponent},
      { path: 'shopping-cart' , component: ShoppingCartComponent},
      { path: 'check-out' , component: CheckOutComponent},
      { path: 'order-success' , component: OrderSuccessComponent,  canActivate: [AuthGaurd]},
      { path: 'account/my-orders' , component: MyOrdersComponent,  canActivate: [AuthGaurd]},
      { path: 'account/profile/:id' , component: ProfileComponent,  canActivate: [AuthGaurd]},
      { path: 'account/profile/edit/:id' , component: EditProfileComponent, canActivate: [AuthGaurd]},
      { path: 'admin/products/new' , component: NewProductComponent,  canActivate: [AuthGaurd,AdminAuthGaurdService]},
      { path: 'admin/products/:id' , component: EditProductComponent,  canActivate: [AuthGaurd,AdminAuthGaurdService]},
      { path: 'admin/products' , component: AdminProductsComponent,  canActivate: [AuthGaurd,AdminAuthGaurdService]},
      { path: 'admin/orders' , component: AdminOrdersComponent , canActivate: [AuthGaurd,AdminAuthGaurdService]},
      { path: 'admin/users' , component: AdminUsersComponent , canActivate: [AuthGaurd,AdminAuthGaurdService]}
    ]),
    NgbModule,
    FormsModule,
    LottieComponent

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideAnimations(),
    provideLottieOptions({
      player: () => player
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
