import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
  
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlicePipe,
    LoaderComponent,
  ]
})
export class SharedModule { }
