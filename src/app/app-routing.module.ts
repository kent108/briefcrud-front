import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';

import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAddProductComponent } from './pages/page-add-product/page-add-product.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  // { path: 'home', component: PageHomeComponent },
  { path: 'admin', component: PageAdminComponent },
  { path: 'connect', component: PageConnectComponent},
  { path: 'add-product', component: PageAddProductComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
