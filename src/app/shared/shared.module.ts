import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRecorderComponent } from './components/video-recorder/video-recorder.component';
import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  declarations: [
    VideoRecorderComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoRecorderComponent,
    PreviewComponent,
  ]
})
export class SharedModule { }
