import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartDonutOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  labels: any;
  colors: any;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
};

export type ChartBarOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-home-adm',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatRippleModule,
    NgApexchartsModule,
  ],
  templateUrl: './home-adm.component.html',
  styleUrl: './home-adm.component.scss',
})
export class HomeAdmComponent {
  headerData = [
    {
      title: 'Total de Usuários',
      value: 1000,
    },
    {
      title: 'Total de Compras',
      value: 1000,
    },
    {
      title: 'Total de Produtos',
      value: 1000,
    },
  ];

  @ViewChild('chartDonut') chartDonut: ChartComponent;
  public chartDonutOptions: Partial<ChartDonutOptions>;
  @ViewChild('chartBar') chartBar: ChartComponent;
  public chartBarOptions: Partial<ChartBarOptions>;

  constructor() {
    this.chartDonutOptions = {
      series: [44, 55, 13],
      chart: {
        height: 320,
        width: 500,
        type: 'donut',
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
      },
      stroke: {
        show: false,
        width: 0,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
      labels: ['Hospedagem', 'Transporte', 'Pontos Turísticos'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
        position: 'right',
        horizontalAlign: 'right',
        offsetY: 0,
        height: 230,
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontSize: '14px',
      },
      colors: ['#beeba0', '#aac99d', '#618354'],
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      }
    };

    this.chartBarOptions = {
      series: [
        {
          data: [400, 580, 1101],
        },
      ],
      chart: {
        type: 'bar',
        height: 275,
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ['#beeba0', '#aac99d', '#618354'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Curitiba', 'São Paulo', 'Blumenau'],
        title: {
          style: {
            fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          },
        }
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return '';
            },
          },
        },
      },
    };
  }
}
