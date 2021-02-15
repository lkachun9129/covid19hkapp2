import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
            private readonly _dialog: MatDialog,
            private readonly _appService: AppService) {
        this._appService.getLastVisitHistory().subscribe((history) => {
            this.visitHistory = history;
        });
    }

    exit() {
        this._dialog.closeAll();
    }

    leaveNow() {
        this.visitHistory.active = false;
        this.visitHistory.outTime = new Date().getTime();
        this._appService.updateVisitHistory(this.visitHistory);
        this.exit();
    }
}