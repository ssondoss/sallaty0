import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SubAdminsComponent } from './admin/sub-admins/sub-admins.component';
import { DcComponent } from './admin/dc/dc.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import {  NavbarComponent } from './admin/navbar/navbar.component';
import { UserComponent } from './admin/user/user.component';
import { OrdersComponent } from './orders/orders.component';




export const routes: Routes = [
    {path:'admin-prod', component:ProductComponent },
    {path:'admin-cat', component:CategoryComponent},
    {path:'sub-admin', component:SubAdminsComponent},
    {path:'admin-dc', component:DcComponent},
    {path:'admin-user', component:UserComponent},
    {path:'admin-ord', component:OrdersComponent},
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), data: { breadcrumb: 'Account Settings' } },
            { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule), data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule), data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule), data: { breadcrumb: 'Cart' } },
            { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule), data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'Contact' } },
            { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
            { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Brands' } },
            { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'All Products' } }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});