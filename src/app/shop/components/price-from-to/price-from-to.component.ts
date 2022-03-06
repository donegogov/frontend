import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductsPricing } from 'src/app/shared/_models/products-pricing';
import { ProductsService } from 'src/app/shared/_services/products.service';

@Component({
  selector: 'app-price-from-to',
  templateUrl: './price-from-to.component.html',
  styleUrls: ['./price-from-to.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PriceFromToComponent implements OnInit, AfterViewInit {
  @Input()FromTo!: string;
  @Input()productsPricing!: ProductsPricing[];
  @ViewChild('sliderChartContainer', { static: true }) sliderChartContainer!: ElementRef;
  tickInterval = 0
  step = 0;
  min = 0;
  max = 0;
  minTo = 0;
  maxFrom = 0;
  chart1Products = 0;
  chart2Products = 0;
  chart3Products = 0;
  chart4Products = 0;
  chart5Products = 0;
  productsInChart = 0;
  fromPriceInChart = 0;
  toPriceInChart = 0;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.setCharts();
  }

  formatLabel(value: number) {
      return Math.round(value / 1);
  }

  matValue(event: any, fromTo: boolean) {
    if (fromTo) {
      this.maxFrom = event.value;
    } else if (!fromTo) {
      this.minTo = event.value;
    }
    console.log(event.value);
  }

  getMinValue() {
    var minimum = this.productsPricing[0].price;

    this.productsPricing.forEach(element => {
      if (element.price < minimum) {
        minimum = element.price;
      }
    });

    return minimum;
  }

  getMaxValue() {
    var minimum = this.productsPricing[0].price;

    this.productsPricing.forEach(element => {
      if (element.price > minimum) {
        minimum = element.price;
      }
    });

    return minimum;
  }

  getStepAndTickInterval() {
    return (this.getMaxValue() - this.getMinValue()) / this.productsPricing.length;
  }

  setCharts() {
    this.min = this.getMinValue();
    this.max = this.getMaxValue();
    this.maxFrom = this.max;
    this.minTo = this.min;
    this.step = this.tickInterval = this.getStepAndTickInterval();

    var charts = this.sliderChartContainer.nativeElement.getElementsByTagName('div');
    console.log(charts);
    var chartStep = (this.max - this.min) / 5;

    this.productsPricing.forEach(element => {
      if (element.price >= this.min && element.price < this.min + chartStep) {
        this.chart1Products += 1;
      } else if (element.price >= this.min + chartStep && element.price < this.min + chartStep*2) {
        this.chart2Products += 1;
      } else if (element.price >= this.min + chartStep*2 && element.price < this.min + chartStep*3) {
        this.chart3Products += 1;
      } else if (element.price >= this.min + chartStep*3 && element.price < this.min + chartStep*4) {
        this.chart4Products += 1;
      } else if (element.price >= this.min + chartStep*4 && element.price < this.min + chartStep*5) {
        this.chart5Products += 1;
      }
    });

    (charts[0] as HTMLDivElement).style.setProperty('--chart1Height', (this.chart1Products / this.productsPricing.length * 100) + '%');
    (charts[1] as HTMLDivElement).style.setProperty('--chart2Height', (this.chart2Products / this.productsPricing.length * 100) + '%');
    (charts[2] as HTMLDivElement).style.setProperty('--chart3Height', (this.chart3Products / this.productsPricing.length * 100) + '%');
    (charts[3] as HTMLDivElement).style.setProperty('--chart4Height', (this.chart4Products / this.productsPricing.length * 100) + '%');
    (charts[4] as HTMLDivElement).style.setProperty('--chart5Height', (this.chart5Products / this.productsPricing.length * 100) + '%');
      
  }

  setChartValues(chart: string) {
    if (chart == '1') {
      this.productsInChart = this.chart1Products;
      var chartStep = (this.max - this.min) / 5;
      this.fromPriceInChart = this.min;
      this.toPriceInChart = this.min + chartStep;
    } else if (chart == '2') {
      this.productsInChart = this.chart2Products;
      var chartStep = (this.max - this.min) / 5;
      this.fromPriceInChart = this.min + chartStep; 
      this.toPriceInChart = this.min + chartStep*2;
    } else if (chart == '3') {
      this.productsInChart = this.chart3Products;
      var chartStep = (this.max - this.min) / 5;
      this.fromPriceInChart = this.min + chartStep*2; 
      this.toPriceInChart = this.min + chartStep*3;
    } else if (chart == '4') {
      this.productsInChart = this.chart2Products;
      var chartStep = (this.max - this.min) / 5;
      this.fromPriceInChart = this.min + chartStep*3; 
      this.toPriceInChart = this.min + chartStep*4;
    } else if (chart == '5') {
      this.productsInChart = this.chart2Products;
      var chartStep = (this.max - this.min) / 5;
      this.fromPriceInChart = this.min + chartStep*4; 
      this.toPriceInChart = this.min + chartStep*5;
    }
  }

  setChartStyles(event: any, chart: number) {
    if (chart == 1) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '1';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
    } else if (chart == 2) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '1';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
    } else if (chart == 3) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '1';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
    } else if (chart == 4) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '1';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
    } else if (chart == 5) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '1';
    }

    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].addEventListener('mouseenter',  (e: any) => {
      if (chart != 1) {
        this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '1';
      }
  }, false);

  this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].addEventListener('mouseleave',  (e: any) => {
    if (chart != 1) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
    } else if (chart == 1) {
      this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '1';
    }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].addEventListener('mouseenter',  (e: any) => {
  if (chart != 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '1';
  } 
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].addEventListener('mouseleave',  (e: any) => {
  if (chart != 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
  } else if (chart == 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].addEventListener('mouseenter',  (e: any) => {
  if (chart != 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].addEventListener('mouseleave',  (e: any) => {
  if (chart != 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
  } else if (chart == 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].addEventListener('mouseenter',  (e: any) => {
  if (chart != 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].addEventListener('mouseleave',  (e: any) => {
  if (chart != 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
  } else if (chart == 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].addEventListener('mouseenter',  (e: any) => {
  if (chart != 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].addEventListener('mouseleave',  (e: any) => {
  if (chart != 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
  } else if (chart == 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '1';
  }
}, false);


//touch events
this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].addEventListener('touchmove',  (e: any) => {
  if (chart != 1) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].addEventListener('touchend',  (e: any) => {
  if (chart != 1) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '0.6';
  } else if (chart == 1) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[0].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].addEventListener('touchmove',  (e: any) => {
  if (chart != 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '1';
  } 
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].addEventListener('touchend',  (e: any) => {
  if (chart != 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '0.6';
  } else if (chart == 2) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[1].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].addEventListener('touchmove',  (e: any) => {
  if (chart != 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].addEventListener('touchend',  (e: any) => {
  if (chart != 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '0.6';
  } else if (chart == 3) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[2].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].addEventListener('touchmove',  (e: any) => {
  if (chart != 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].addEventListener('touchend',  (e: any) => {
  if (chart != 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '0.6';
  } else if (chart == 4) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[3].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].addEventListener('touchmove',  (e: any) => {
  if (chart != 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '1';
  }
}, false);

this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].addEventListener('touchend',  (e: any) => {
  if (chart != 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '0.6';
  } else if (chart == 5) {
    this.sliderChartContainer.nativeElement.getElementsByTagName('div')[4].style.opacity = '1';
  }
}, false);
  }

}
