import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Gateway, Project, Report} from "../../app.models";
import {Subscription, tap} from "rxjs";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {ChartConfiguration, ChartData} from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  gateways: Gateway[] = [];
  project: string = '';
  gateway: string = '';
  projectName: string = '';
  gatewayName: string = '';
  from: string = '';
  to: string = '';
  reports: Report[] = [];
  totals: Record<string, number> = {};
  doughnutChartData: ChartData<'doughnut'> = {labels: [], datasets: []};
  doughnutChartType: ChartConfiguration<'doughnut', number, string>["type"] = 'doughnut';

  private sub$ = new Subscription();

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.sub$.add(this.api.getProjects().subscribe(projects => this.projects = projects));
    this.sub$.add(this.api.getGateways().subscribe(gateways => this.gateways = gateways));
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  selectProject($event: Event) {
    this.project = ($event.target as HTMLSelectElement).value;
    if (this.project === 'All projects') {
      this.project = '';
    }
  }

  selectGateway($event: Event) {
    this.gateway = ($event.target as HTMLSelectElement).value;
    if (this.gateway === 'All gateways') {
      this.gateway = '';
    }
  }

  toDate($event: MatDatepickerInputEvent<unknown, unknown | null>) {
    this.to = new Date($event.value as string)?.toISOString().split("T")[0];
  }

  fromDate($event: MatDatepickerInputEvent<unknown, unknown | null>) {
    this.from = new Date($event.value as string)?.toISOString().split("T")[0];
  }

  getReport() {
    this.sub$.add(this.api.getReport({
      projectId: this.project,
      gatewayId: this.gateway,
      from: this.from,
      to: this.to,
    }).pipe(tap(reports => this.totals = reports.reduce((prev: Record<string, number>, curr: Report) => {
      if (prev[curr.projectId]) {
        prev[curr.projectId] += curr.amount;
      } else {
        prev[curr.projectId] = curr.amount;
      }
      return prev;
    }, {}))).subscribe(reports => this.reports = reports));

    this.projectName = this.projects.find(project => project.projectId === this.project)?.name || '';
    this.gatewayName = this.gateways.find(gateway => gateway.gatewayId === this.gateway)?.name || '';

    const total = Object.values(this.totals).reduce((p, c) => p + c, 0);
    this.doughnutChartData.labels = this.projects.map(project => project.name);
    this.doughnutChartData.datasets[0] = {data: Object.values(this.totals).map(t => ((t / total) * 100))};
  }
}
