import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { VisitHistory } from "../models";
import { LeaveDialogComponent } from "../dialogs/leave-dialog/leave-dialog.component";
import { SwitchVenueDialogComponent } from "../dialogs/switch-venue-dialog/switch-venue-dialog.component";
import { AppPage } from "../shared/app-bar/app-bar.component";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {

  readonly AppPage = AppPage;

  currentDateTime: Date;

  isVisitActive: boolean = false;

  timeDifference: number;
  visitHistory: VisitHistory;
  private _interval;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    this.currentDateTime = new Date();

    this._appService.getLastVisitHistory().subscribe((history) => {
      this.visitHistory = history;
      if (this.visitHistory) {
        if (this.visitHistory.outTime === null || this.visitHistory.outTime > new Date().getTime()) {
          this.isVisitActive = this.visitHistory.active;

          this.timeDifference = Math.floor((new Date().getTime() - this.visitHistory.inTime) / 1000);
          this._interval = setInterval(() => {
            this.timeDifference++;

            if (!this.visitHistory?.active) {
              clearInterval(this._interval);
            }
          }, 1000);
        } else if (this.visitHistory.outTime) {
          this.visitHistory.active = false;
          this._appService.updateVisitHistory(this.visitHistory).subscribe();
        }
      }
    });
  }

  inbox() {
    this._router.navigate(['/inbox']);
  }

  enter() {
    if (this.visitHistory?.active) {
      this._dialog.open(SwitchVenueDialogComponent, {
        panelClass: 'switch-venue-dialog'
      });
    } else {
      this._router.navigate(['/scan']);
    }
  }

  leave() {
    let leaveDialog = this._dialog.open(LeaveDialogComponent, {
      panelClass: 'leave-dialog',
      data: { isAuto: this.visitHistory.isAuto }
    });

    leaveDialog.afterClosed().subscribe(() => {
      this._appService.getLastVisitHistory().subscribe((history) => {
        this.visitHistory = history;
      });
    });
  }
}
