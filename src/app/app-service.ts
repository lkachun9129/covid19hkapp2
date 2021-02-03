import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _locationName: string;

  constructor() {}

  setLocationName(name: string) {
    this._locationName = name;
  }

  getLocationName(): string {
    return this._locationName;
  }
}
