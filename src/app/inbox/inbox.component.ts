import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { AppPage } from "../shared/app-bar/app-bar.component";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"]
})
export class InboxComponent implements OnInit {

  readonly AppPage = AppPage;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    
  }
}
