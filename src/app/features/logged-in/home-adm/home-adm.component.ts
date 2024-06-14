import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AuthService } from '../../../core/auth.service';
import { User } from '../../../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ProductType } from '../../../shared/enum/product-type.enum';
import ApexCharts from 'apexcharts';
import { CityService } from '../../../shared/services/city.service';
import { CityProductsDTO } from '../../../shared/helper/city-products-dto';
import { ProductTypesDTO } from '../../../shared/helper/product-types-dto';

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
export class HomeAdmComponent implements OnInit {
  totalUsers = 0;
  totalProducts = 0;
  products: Product[] = [];
  topCities: CityProductsDTO[] = [];
  productTypes: ProductTypesDTO[] = [];
  headerData = [
    {
      id: 1,
      title: 'Total de Usuários',
      value: this.totalUsers,
    },
    // {
    //   title: 'Total de Compras',
    //   value: 1000,
    // },
    {
      id: 3,
      title: 'Total de Produtos',
      value: this.totalProducts,
    },
  ];

  @ViewChild('chartDonut') chartDonut: ChartComponent;
  chartDonutOptions: Partial<ChartDonutOptions>;
  @ViewChild('chartBar') chartBar: ChartComponent;
  chartBarOptions: Partial<ChartBarOptions>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private productService: ProductService,
    private cityService: CityService,
  ) {
    this.chartDonutOptions = {
      series: [],
      chart: {
        height: 320,
        width: 500,
        type: 'donut',
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      }
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
      labels: [],
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
      },
    };

    this.chartBarOptions = {
      series: [],
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
        categories: [],
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
        },
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

  ngOnInit() {
    this.getTotalUsers();
    this.getTotalProductsByType()
    this.getTopCitiesByProductCount()
  }

  getTotalUsers() {
    this.authService.getTotalUsers().subscribe({
      next: (resultado: number) => {
        this.totalUsers = resultado;
        this.headerData.find((data) => data.id == 1).value = this.totalUsers;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
      },
    });
  }

  getTopCitiesByProductCount() {
    this.cityService.getTopCitiesByProductCount(3).subscribe({
      next: (resultado: CityProductsDTO[]) => {
        this.topCities = resultado;
        let result = resultado.map(cidade => cidade.produto_Qtd);
        let labels = resultado.map(cidade => cidade.nome);
        setTimeout(() => {
          this.updateDataBarDash(result, labels)
        }, 300);
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
      },
    });
  }

  updateDataBarDash(result: number[], labels: any[]) {
    this.chartBarOptions.series = [{ data: result }];
    labels.forEach(category => {
      this.chartBarOptions.xaxis.categories.push(category)   
    })
  }

  getTotalProductsByType() {
    this.productService.getTotalProductsByType().subscribe({
      next: (resultado: ProductTypesDTO[]) => {
        this.productTypes = resultado;
        let result = resultado.map(product => product.produtos_Qtd);
        let labels = resultado.map(product => ProductType.getTypeText(product.id_Tipo));
        this.totalProducts = resultado.reduce((total, cidade) => total + cidade.produtos_Qtd, 0);
        this.headerData.find((data) => data.id == 3).value = this.totalProducts;
        setTimeout(() => {
          this.updateDataDonutDash(result, labels)
        }, 300);
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
      },
    });
  }

  updateDataDonutDash(result: number[], labels: string[]) {
    this.chartDonutOptions.series = result;
    this.chartDonutOptions.labels = labels;
  }
}
