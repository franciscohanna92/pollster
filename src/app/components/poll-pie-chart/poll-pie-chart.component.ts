import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ChartType, ChartOptions} from 'chart.js';
import {Label, BaseChartDirective} from 'ng2-charts';
import PollOption from '../../models/PollOption';

@Component({
  selector: 'app-poll-pie-chart',
  templateUrl: './poll-pie-chart.component.html',
  styleUrls: ['./poll-pie-chart.component.css']
})
export class PollPieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  _pollOptions: PollOption[] = [];
  pollTotalAnswers: number;

  // Pie
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };
  pollOptionsIds: string[] = [];
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: []
    }
  ];

  @Input()
  set pollOptions(pollOptions: PollOption[]) {
    this.pollTotalAnswers = PollPieChartComponent.calculateTotalAnswers(pollOptions);
    this._pollOptions = pollOptions;
    this.populateChart();
    this.chart.update();
  }

  constructor() {
  }

  ngOnInit() {
  }

  populateChart(): void {
    for (const option of this._pollOptions) {
      const perc = parseFloat((option.totalAnswers / this.pollTotalAnswers * 100)
        .toFixed(2));
      this.upsertSlice(option.text, perc, option.color, option.id);
    }
  }

  upsertSlice(label: string, value: number, color: string, optionId: string) {
    const indexOfOption = this.pollOptionsIds.indexOf(optionId);
    if (indexOfOption != -1) {
      this.pieChartData[indexOfOption] = value;
    } else {
      this.pollOptionsIds.push(optionId);
      this.pieChartLabels.push(label);
      this.pieChartData.push(value);
      this.pieChartColors[0].backgroundColor.push(color);
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
