import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ResultComponent } from "./result/result.component";
import { ScanComponent } from "./scan/scan.component";

const routes: Routes = [
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
