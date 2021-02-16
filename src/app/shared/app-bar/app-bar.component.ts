import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { AppService } from "../../app-service";

export enum AppPage {
  Home = 0,
  Inbox = 1,
  Settings = 2
}

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"]
})
export class AppBarComponent implements OnInit {

  readonly AppPage = AppPage;

  @Input()
  currentPage: AppPage;

  constructor(
    private readonly _router: Router
  ) {}

  ngOnInit() {
    
  }

  home() {
    if (this.currentPage != AppPage.Home) {
      this._router.navigate(['/landing']);
    }
  }
  inbox() {
    if (this.currentPage != AppPage.Inbox) {
      this._router.navigate(['/inbox']);
    }
  }
  settings() {
    //this._router.navigate(['/settings']);
  }
}
