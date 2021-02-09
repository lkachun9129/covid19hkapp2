import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { ResultComponent } from "./result/result.component";
import { DirectAccessGuard } from "./route-guard/direct-access.guard";
import { ScanComponent } from "./scan/scan.component";

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: "scan",
    component: ScanComponent,
    canActivate: [DirectAccessGuard]
  },
  {
    path: "result",
    component: ResultComponent,
    canActivate: [DirectAccessGuard]
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
