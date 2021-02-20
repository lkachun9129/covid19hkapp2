import { Component } from "@angular/core";
import { AppService } from "./app-service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private readonly _appService: AppService) {
    this._appService.initAppRecord();
  }
}
