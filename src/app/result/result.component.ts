import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { LeaveDialogComponent } from "../leave-dialog/leave-dialog.component";
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

  visitHistory: VisitHistory;

  constructor(
      private readonly _dialog: MatDialog,
      private readonly _router: Router,
      private readonly _appService: AppService) {
   
  }

  ngOnInit() {
    this.visitHistory = this._appService.getLastVisitHistory();
  }

  toggleAuto() {
    this.isAuto = !this.isAuto;
  }

  exit() {
    this._router.navigate(['/landing']);
  }

  leave() {
    let leaveDialog = this._dialog.open(LeaveDialogComponent, {
      panelClass: 'leave-dialog'
    });

    leaveDialog.afterClosed().subscribe(() => {
      this.exit();
    });
  }
}
