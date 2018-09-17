import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DateTime } from 'date-time-js';
import { ZoomService, IZoomData } from '../zoom.service';

declare var Plotly: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartId = UUID.UUID();
  chartDiv: any;

  constructor(private zoomService: ZoomService) {
    this.showChart();
    zoomService.getYZoom().subscribe(x => {
      this.applyZoom(x);
    })
  }

  ngOnInit() {

  }

  public showChart() {

    const xData = [];
    const yData1 = [];
    const yData2 = [];
    const yData3 = [];

    for (let index = 0; index < 300; index++) {
      xData.push(new DateTime().add(index * 3, 'second').format('yyyy-MM-dd HH:mm:ss'));
      yData1.push(Math.random() * 2 + 5);
      yData2.push(Math.random() * 2 + 10);
      yData3.push(Math.random() * 2 + 15);
    }

    const trace1 = {
      x: xData,
      y: yData1,
      type: 'scatter',
      name: 'Cushion value'
    };

    const trace2 = {
      x: xData,
      y: yData2,
      type: 'scatter',
      name: 'Cycle time'
    };

    const trace3 = {
      x: xData,
      y: yData3,
      type: 'scatter',
      name: 'Some value',
      mode: 'lines+markers',
      marker: {
        size: 12,
        opacity: 0.5
      }
    };

    const layout = {
      title: 'Test data',
      height: 750,
      font: { size: 20 },
      xaxis: {
        title: 'Time',
      },
      yaxis: {
        //range: [0, 25],
        autorange: true
      },
      legend: {
        y: 0.5,
        font: { size: 16 },
        yref: 'paper'
      }
    };

    const data = [trace1, trace2, trace3];
    //const data = [trace1];
    setTimeout(() => {

      Plotly.newPlot(this.chartId, data, layout, {
        // double click interaction 
        // false, 'reset', 'autosize' or 'reset+autosize'
        doubleClick: false
      });

      this.chartDiv = document.getElementById(this.chartId);

      this.subscribeRelayout();
    }, 0);

  }

  private zoomHandler(eventdata: any) {
    this.zoomService.setYZoom(this.chartId, eventdata['xaxis.range[0]'], eventdata['xaxis.range[1]']);
  }

  private subscribeRelayout() {
    this.chartDiv.on('plotly_relayout', (eventdata) => this.zoomHandler(eventdata));
  }

  private unSubscribeRelayout() {
    this.chartDiv.removeAllListeners();
  }

  private applyZoom(data: IZoomData) {
    setTimeout(() => {
      this.unSubscribeRelayout();
      setTimeout(() => {
        // if (this.chartId != data.origin) {
          if (data.y1 == null && data.y2 == null) {
            const update = {
              'yaxis.autorange': true,
              'xaxis.autorange': true,
            };
            Plotly.relayout(this.chartId, update);
          } else {
            const update = {
              'yaxis.autorange': true,
              'xaxis.range[0]': data.y1,
              'xaxis.range[1]': data.y2,
            };

            Plotly.relayout(this.chartId, update);
          }
        // }
        setTimeout(() => {
          this.subscribeRelayout();
        }, 0);
      }, 0);
    }, 0);

  }

}
