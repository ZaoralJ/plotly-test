import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ZoomService {

  constructor() {
  }

  private actualZoomData = new Subject<IZoomData>();

  public setYZoom(origin: string, y1: any, y2: any): void {

    const data = {
      origin: origin,
      y1: y1,
      y2: y2
    } as IZoomData;

    this.actualZoomData.next(data);
  }

  public getYZoom(): Observable<IZoomData> {
    return this.actualZoomData;
  }

}

export interface IZoomData {
  origin: string,
  y1: any,
  y2: any
}
