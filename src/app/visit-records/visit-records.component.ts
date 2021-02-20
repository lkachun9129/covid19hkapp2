import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { VisitHistory } from "../models";
import { AppPage } from "../shared/app-bar/app-bar.component";

@Component({
  selector: "app-visit-records",
  templateUrl: "./visit-records.component.html",
  styleUrls: ["./visit-records.component.css"]
})
export class VisitRecordsComponent implements OnInit {

  readonly AppPage = AppPage;

  visitHistories: VisitHistory[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    this._appService.getAllVisitHistory().subscribe((histories) => {
      let visitedHistories = histories.filter(history => history.active === false);
      this.visitHistories.push(...visitedHistories);
    });
  }

  back() {
    this._router.navigate(['/settings']);
  }
}
