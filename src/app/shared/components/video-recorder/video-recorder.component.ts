import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, AfterContentInit, Output, EventEmitter } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit, AfterViewInit {
  recordRTC: any;
  stream: MediaStream;
  videoSource: string;
  timeInterval = 5 * 1000;
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;

  @Output() captured: EventEmitter<string> = new EventEmitter();
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // set the initial state of the video
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = false;
    video.autoplay = true;
  }

  startRecording() {
    const mediaConstraints = {
      video: true,
      audio: false
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints as any)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    this.recordRTC.stopRecording(this.stopRecordingCallback.bind(this));
  }

  download() {
    this.recordRTC.save();
  }

  private processVideo(audioVideoWebMURL) {
    this.recordRTC.getDataURL((dataURL) => {
      console.log(dataURL);
      this.captured.emit(dataURL);
     });
  }

  private successCallback(stream: MediaStream) {
    console.log(stream);
    const video: HTMLVideoElement = this.video.nativeElement;
    const dimensions = { width: 640, height: 480 };
    const options = {
      type: 'gif',
      video: dimensions,
      canvas: dimensions,
    };
    this.stream = stream;
    video.srcObject = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    this.recordRTC.camera = stream;
    console.log(stream);

    setTimeout(() => {
      this.stopRecording();
    }, 5000);
  }

  private errorCallback(error) {
    console.log(error);
  }

  private stopRecordingCallback() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.src = video.srcObject = null;
    console.log(this.recordRTC.getBlob());
    const blobUrl = URL.createObjectURL(this.recordRTC.getBlob());
    video.src = blobUrl;
    this.processVideo(blobUrl);
    // const stream = this.stream;
    this.recordRTC.camera.stop();
    // this.recordRTC.destroy();
    // this.recordRTC = null;
    // stream.getAudioTracks().forEach(track => track.stop());
    // stream.getVideoTracks().forEach(track => track.stop());
  }

}
