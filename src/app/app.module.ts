import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app-service";
import { AppComponent } from "./app.component";
import { InboxComponent } from "./inbox/inbox.component";
import { LandingComponent } from "./landing/landing.component";
import { LeaveDialogComponent } from "./leave-dialog/leave-dialog.component";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";
import { AppBarComponent } from "./shared/app-bar/app-bar.component";
import { CarouselCellsDirective } from "./shared/carousel-cells.directive";
import { CounterPipe } from "./shared/counter.pipe";
import { SwitchVenueDialogComponent } from './switch-venue-dialog/switch-venue-dialog.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        BrowserAnimationsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,

        IvyCarouselModule,
        ZXingScannerModule,

        AppRoutingModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    declarations: [
        AppComponent,
        InboxComponent,
        LandingComponent,
        LeaveDialogComponent,
        ResultComponent,
        ScanComponent,
        SwitchVenueDialogComponent,

        AppBarComponent,
        
        CarouselCellsDirective,

        CounterPipe
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
