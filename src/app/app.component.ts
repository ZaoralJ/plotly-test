import { Component } from '@angular/core';

declare var Plotly: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  public showChart() {

    let xData = [];
    let yData = [];

    for (let index = 0; index < 360 * 8; index++) {
      xData.push(index);
      yData.push(Math.random() * 20);
    }

    const trace1 = {
      x: xData,
      y: yData,
      type: 'scatter'
    };

    const data = [trace1];

    Plotly.newPlot('myDiv', data);
  }
}
