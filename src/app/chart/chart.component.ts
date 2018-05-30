import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

declare var Plotly: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartId = UUID.UUID();

  constructor() { }

  ngOnInit() {
  }

  public showChart() {

    const xData = [];
    const yData = [];

    for (let index = 0; index < 360 * 8; index++) {
      xData.push(index);
      yData.push(Math.random() * 2 + 10);
    }

    const trace1 = {
      x: xData,
      y: yData,
      type: 'scatter'
    };

    const data = [trace1];

    Plotly.newPlot(this.chartId, data);
  }
}
