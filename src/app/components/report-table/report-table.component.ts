import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../../app.models";

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  @Input() reports: Report[] = [];
  @Input() projectId: string = '';
  @Input() hasTotal: boolean = false;
  total: number = 0;
  displayedColumns: string[] = ['created', 'paymentId', 'amount'];

  ngOnInit(): void {
    this.reports = this.reports.filter(report => report.projectId === this.projectId);
    this.total = this.reports.reduce((prev: number, curr: Report) => prev + curr.amount, 0);
  }
}
