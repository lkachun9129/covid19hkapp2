import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AppService } from "../app-service";
import { VisitHistory } from "../models";

@Component({
    selector: 'leave-dialog',
    templateUrl: 'leave-dialog.component.html',
    styleUrls: ['leave-dialog.component.css']
})
export class LeaveDialogComponent {

    visitHistory: VisitHistory;

    constructor(
            private readonly _appService: AppService,
            private readonly _dialogRef: MatDialogRef<LeaveDialogComponent>) {
        this._appService.getLastVisitHistory().subscribe((history) => {
            this.visitHistory = history;
        });
    }

    exit() {
        this._dialogRef.close();
    }

    leaveNow() {
        this.visitHistory.active = false;
        this.visitHistory.outTime = new Date().getTime();
        this._appService.updateVisitHistory(this.visitHistory);
        this.exit();
    }
}