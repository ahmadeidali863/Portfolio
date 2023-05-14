import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';


@NgModule({
  declarations: [],
  imports: [
    AdminRoutingModule,
  ]
})
export class AdminModule { }
