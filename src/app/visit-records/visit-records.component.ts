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

  pressCount = 0;

  constructor(
    private readonly _router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    this.loadHistories();
  }

  back() {
    this._router.navigate(['/settings']);
  }

  clear() {
    this.pressCount++;
    if (this.pressCount === 10) {
      this._appService.clearHistories().subscribe((_) => {
        this.loadHistories();
      });
    }
  }

  private loadHistories() {
    this._appService.getAllVisitHistory().subscribe((histories) => {
      let visitedHistories = histories.filter(history => history.active === false);
      this.visitHistories.length = 0;
      this.visitHistories.push(...visitedHistories);
    });
  }
}
