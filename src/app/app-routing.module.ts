import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InboxComponent } from "./inbox/inbox.component";
import { LandingComponent } from "./landing/landing.component";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: "scan",
    component: ScanComponent
  },
  {
    path: "result",
    component: ResultComponent
  },
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "landing"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
