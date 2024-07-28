import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavModule } from '../nav/nav.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { PromoComponent } from './promos/promo/promo.component';
import { FilterComponent } from './filter/filter.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NavModule,
    PromoComponent,
    FilterComponent,
    RouterModule.forChild([
      { path: '', component: MainComponent }
    ])
  ],
  exports: [
    PromoComponent
  ]
})
export class MainModule {}