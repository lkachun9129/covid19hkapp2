import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InboxComponent } from "./inbox/inbox.component";
import { LandingComponent } from "./landing/landing.component";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";
import { SettingsComponent } from "./settings/settings.component";
import { VisitRecordsComponent } from "./visit-records/visit-records.component";

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
    path: 'settings',
    component: SettingsComponent
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
    path: 'records',
    component: VisitRecordsComponent
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
