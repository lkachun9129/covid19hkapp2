import { Component, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
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
            private readonly _router: Router,
            private readonly _appService: AppService,
            private readonly _dialogRef: MatDialogRef<LeaveDialogComponent>,
            @Optional() @Inject(MAT_DIALOG_DATA) public data: { isAuto: boolean }) {
                
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
        this._appService.updateVisitHistory(this.visitHistory).subscribe((_) => {
            this._dialogRef.close();
            this._router.navigate(['/landing']);
        });
        
    }
}