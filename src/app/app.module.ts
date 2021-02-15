import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app-service";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { LeaveDialogComponent } from "./leave-dialog/leave-dialog.component";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";
import { CounterPipe } from "./shared/counter.pipe";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        BrowserAnimationsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,

        ZXingScannerModule,

        AppRoutingModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    declarations: [
        AppComponent,
        LandingComponent,
        LeaveDialogComponent,
        ScanComponent,
        ResultComponent,

        CounterPipe
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
