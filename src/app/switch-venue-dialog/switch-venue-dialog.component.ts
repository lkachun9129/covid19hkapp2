import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { VisitHistory } from "../models";

@Component({
    selector: 'switch-venue-dialog',
    templateUrl: 'switch-venue-dialog.component.html',
    styleUrls: ['switch-venue-dialog.component.css']
})
export class SwitchVenueDialogComponent {

    visitHistory: VisitHistory;

    constructor(
            private readonly _router: Router,
            private readonly _appService: AppService,
            private readonly _dialogRef: MatDialogRef<SwitchVenueDialogComponent>) {
        this._appService.getLastVisitHistory().subscribe((history) => {
            this.visitHistory = history;
        });
    }

    exit() {
        this._dialogRef.close();
    }

    no() {
        this._dialogRef.close();
    }

    yes() {
        this.visitHistory.active = false;
        this.visitHistory.outTime = new Date().getTime();
        this._appService.updateVisitHistory(this.visitHistory).subscribe((_) => {
            this._dialogRef.close();
            this._router.navigate(['/scan']);
        });
    }
}