import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { AutoLeaveDialogComponent } from "../dialogs/auto-leave-dialog/auto-leave-dialog.component";
import { LeaveDialogComponent } from "../dialogs/leave-dialog/leave-dialog.component";
import { VisitHistory } from "../models";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  currentDateTime: Date;
  locationName: string;

  isAuto: boolean = true;
  autoHours: number = 0;

  visitHistory: VisitHistory;

  constructor(
      private readonly _dialog: MatDialog,
      private readonly _router: Router,
      private readonly _appService: AppService) {

      this._appService.getAutoLeaveOption().subscribe((autoHours) => {
        this.autoHours = autoHours;
      });
  }

  ngOnInit() {
    this._appService.getLastVisitHistory().subscribe((history) => {
      this.visitHistory = history;
    });
  }

  toggleAuto() {
    this.isAuto = !this.isAuto;
  }

  exit() {
    this.visitHistory.isAuto = this.isAuto;
    if (this.visitHistory.isAuto && !this.visitHistory.outTime) {
      let inDate = new Date(this.visitHistory.inTime);
      this.visitHistory.outTime = inDate.setHours(inDate.getHours() + this.autoHours);
    }
    this._appService.updateVisitHistory(this.visitHistory).subscribe((_) => {
      this._router.navigate(['/landing']);
    });
  }

  change() {
    let autoLeaveDialog = this._dialog.open(AutoLeaveDialogComponent, {
      panelClass: 'auto-leave-dialog',
      data: { autoHours: this.autoHours }
    });

    autoLeaveDialog.afterClosed().subscribe(() => {
      this._appService.getLastVisitHistory().subscribe((history) => {
        this.visitHistory = history;
      });
    });
  }

  leave() {
    let leaveDialog = this._dialog.open(LeaveDialogComponent, {
      panelClass: 'leave-dialog',
      data: { isAuto: this.isAuto }
    });
  }
}
