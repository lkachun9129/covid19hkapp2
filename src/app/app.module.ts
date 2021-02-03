import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ScanComponent } from "./scan/scan.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app-service";
import { ResultComponent } from "./result/result.component";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ZXingScannerModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [AppComponent, ScanComponent, ResultComponent],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
