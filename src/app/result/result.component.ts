import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../app-service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  currentDateTime: Date;
  locationName: string;

  isAuto: boolean = true;

  constructor(
      private readonly _router: Router,
      private readonly _appService: AppService) {
    this.locationName = this._appService.getLocationName();
  }

  ngOnInit() {
    this.currentDateTime = new Date();
  }

  toggleAuto() {
    this.isAuto = !this.isAuto;
  }

  exit() {
    this._router.navigate(['/landing']);
  }
}
