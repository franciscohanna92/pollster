import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ChartType, ChartOptions} from 'chart.js';
import {Label, BaseChartDirective} from 'ng2-charts';
import PollOption from '../../models/PollOption';

@Component({
  selector: 'app-poll-bar-chart',
  templateUrl: './poll-bar-chart.component.html',
  styleUrls: ['./poll-bar-chart.component.css']
})
export class PollBarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  _pollOptions: PollOption[] = [];
  pollTotalAnswers: number;

  // Pie
  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: 3
        }
      }]
    }
  };
  pollOptionsIds: string[] = [];
  barChartLabels: Label[] = [];
  barChartData: number[] = [];
  barChartType: ChartType = 'horizontalBar';
  barChartColors = [
    {
      backgroundColor: []
    }
  ];

  @Input()
  set pollOptions(pollOptions: PollOption[]) {
    // this.pollTotalAnswers = PollPieChartComponent.calculateTotalAnswers(pollOptions);
    this._pollOptions = pollOptions;
    this.populateChart();
    this.barChartOptions.scales.xAxes[0].ticks.suggestedMax = PollBarChartComponent.calculateTotalAnswers(pollOptions);
    this.chart.update();
  }

  constructor() {
  }

  ngOnInit() {
  }

  populateChart(): void {
    for (const option of this._pollOptions) {
      this.upsertBar(option.text, option.totalAnswers, option.color, option.id);
    }
  }

  upsertBar(label: string, value: number, color: string, optionId: string) {
    const indexOfOption = this.pollOptionsIds.indexOf(optionId);
    if (indexOfOption != -1) {
      this.barChartData[indexOfOption] = value;
    } else {
        this.pollOptionsIds.push(optionId);
        this.barChartLabels.push(label);
        this.barChartData.push(value);
        this.barChartColors[0].backgroundColor.push(color);
    }
  }

  static calculateTotalAnswers(pollOptions) {
    let sum: number = 0;
    for (const option of pollOptions) {
      sum += option.totalAnswers;
    }
    return sum;
  }
}
