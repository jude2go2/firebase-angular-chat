import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules: Array<any> = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
