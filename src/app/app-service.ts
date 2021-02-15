import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "ngx-webstorage-service";
import { AppRecord, VisitHistory } from "./models";

const RECORD_KEY = 'leavehomesafe.record';

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _locationName: string;

  constructor(
    @Inject(LOCAL_STORAGE) private readonly _localStorage: WebStorageService) {

  }

  enterVenue(name: string) {
    let history: VisitHistory = {
      location: name,
      inTime: new Date().getTime(),
      outTime: null,
      active: true,
      isAuto: false
    };

    let appRecord = this._localStorage.get(RECORD_KEY) as AppRecord;
    if (!appRecord) {
      appRecord = {
        histories: []
      }
    }

    appRecord.histories.unshift(history);
    this._localStorage.set(RECORD_KEY, appRecord);
  }

  getLastVisitHistory(): VisitHistory {
    let appRecord = this._localStorage.get(RECORD_KEY) as AppRecord;

    if (!appRecord) {
      return null;
    }

    return appRecord.histories[0];
  }

  updateVisitHistory(visitHistory: VisitHistory) {
    let appRecord = this._localStorage.get(RECORD_KEY) as AppRecord;

    if (appRecord) {
      appRecord.histories[0] = visitHistory;
      this._localStorage.set(RECORD_KEY, appRecord);
    }
  }
}
