import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { mockData } from './data';
import Konva from 'konva';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {

  private stage: Konva.Stage;

  @Input() video: string = mockData.video;
  @Input() effect: string = mockData.effect;

  @ViewChild('previewContainer') previewContainer: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    /*console.log(this.video, this.effect);
    console.log(Konva);

    this.stage = new Konva.Stage({
      container: this.previewContainer.nativeElement,
      width: 640,
      height: 480,
      });

    const layer = new Konva.Layer();
    const previewSource = await this.loadImage(this.video);
    const previewImage = new Konva.Image({
       image: previewSource,
     });

    layer.add(previewImage);

    console.log(previewImage.height())

    const effectSource = await this.loadImage(this.effect);
    const effectImage = new Konva.Image({
      image: effectSource,
      width: 200,
      height: 58,
    });

    effectImage.y(previewImage.height() - (effectImage.height() + 20));
    effectImage.x(previewImage.width() - (effectImage.width() + 20));

    layer.add(effectImage);

    this.stage.add(layer);*/
  }

  download() {

  }

  private loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const imageObj = new Image();

      imageObj.onload = () => {
        return resolve(imageObj);
      };

      imageObj.onerror = () => {
        return reject('not loaded');
      };

      imageObj.src = source;
    });
  }

}
