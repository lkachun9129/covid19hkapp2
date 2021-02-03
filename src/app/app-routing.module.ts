import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ResultComponent } from "./result/result.component";
import { DirectAccessGuard } from "./route-guard/direct-access.guard";
import { ScanComponent } from "./scan/scan.component";

const routes: Routes = [
  {
    path: "scan",
    component: ScanComponent
  },
  {
    path: "result",
    component: ResultComponent,
    canActivate: [DirectAccessGuard]
  },
  {
    path: "",
    redirectTo: "scan",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "scan"
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
