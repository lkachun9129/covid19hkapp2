import { Inject } from "@angular/core";
import { Component, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "../app-service";
import { VisitHistory } from "../models";

@Component({
    selector: 'auto-leave-dialog',
    templateUrl: 'auto-leave-dialog.component.html',
    styleUrls: ['auto-leave-dialog.component.css']
})
export class AutoLeaveDialogComponent {

    visitHistory: VisitHistory;

    options: {
        label: string,
        value: number,
        selected: boolean
    }[] = [];

    constructor(
            private readonly _appService: AppService,
            private readonly _dialogRef: MatDialogRef<AutoLeaveDialogComponent>,
            @Optional() @Inject(MAT_DIALOG_DATA) public data: { autoHours: number }) {

        this._appService.getLastVisitHistory().subscribe((history) => {
            this.visitHistory = history;
            let inDate = new Date(this.visitHistory.inTime);
            this.visitHistory.outTime = inDate.setHours(inDate.getHours() + data.autoHours);
        });

        this.options.push({
            label: '+ 1 hour',
            value: 1,
            selected: false
        });

        for (let idx = 2; idx <= 24; ++idx) {
            this.options.push({
                label: `+ ${idx} hours`,
                value: idx,
                selected: idx === data.autoHours
            });
        }
    }

    select(value: number) {
        for (let idx = 0; idx < 24; ++idx) {
            this.options[idx].selected = (idx + 1) === value;
        }
        let inDate = new Date(this.visitHistory.inTime);
        this.visitHistory.outTime = inDate.setHours(inDate.getHours() + value);
        this.data.autoHours = value;
    }

    exit() {
        this._dialogRef.close();
    }

    confirm() {
        this.visitHistory.isAuto = true;
        this._appService.setAutoLeaveOption(this.data.autoHours);
        this._appService.updateVisitHistory(this.visitHistory).subscribe((_) => {
            this._dialogRef.close();
        });
    }
}