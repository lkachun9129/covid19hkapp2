import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { AppService } from "../app-service";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.component.html",
  styleUrls: ["./scan.component.css"]
})
export class ScanComponent implements OnInit, AfterViewInit {
  currentDateTime: Date;

  @ViewChild("scanner", { read: ZXingScannerComponent })
  scanner: ZXingScannerComponent;

  constructor(
    private readonly _router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    this.currentDateTime = new Date();
  }

  ngAfterViewInit(): void {
    this.scanner.enable = true;
  }

  camerasNotFoundHandler() {}

  scanSuccessHandler(result: string) {
    this.scanner.enable = false;

    let qrCodeContent = JSON.parse(atob(result.replace("HKEN:0", "").slice(8)));
    this._appService.setLocationName(qrCodeContent.nameEn);
    console.log(qrCodeContent);

    this._router.navigate(["/result"]);
  }

  scan() {
    this.scanner.enable = true;
  }
}
