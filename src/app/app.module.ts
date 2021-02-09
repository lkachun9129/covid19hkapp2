import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app-service";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ZXingScannerModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [AppComponent, LandingComponent, ScanComponent, ResultComponent],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
