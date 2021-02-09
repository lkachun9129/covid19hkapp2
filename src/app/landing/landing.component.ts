import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  currentDateTime: Date;

  constructor(
    private readonly _router: Router
  ) {}

  ngOnInit() {
    this.currentDateTime = new Date();
  }

  enter() {
    this._router.navigate(['/scan']);
  }
}
