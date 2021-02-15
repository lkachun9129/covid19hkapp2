import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable } from "rxjs";
import { AppRecord, VisitHistory } from "./models";

const RECORD_KEY = 'leavehomesafe.record';

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _locationName: string;

  constructor(
    private readonly _storage: StorageMap) {

  }

  enterVenue(name: string): Observable<any> {
    let history: VisitHistory = {
      location: name,
      inTime: new Date().getTime(),
      outTime: null,
      active: true,
      isAuto: false
    };

    let observable = new Observable<any>((subscriber) => {
      this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
        if (!appRecord) {
          appRecord = {
            histories: []
          }
        }
    
        appRecord.histories.unshift(history);
        this._storage.set(RECORD_KEY, appRecord).subscribe(() => {
          subscriber.next();
        });
      });
    });

    return observable;
  }

  getLastVisitHistory(): Observable<VisitHistory> {
    let observable = new Observable<VisitHistory>((subscriber) => {
      this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
        if (!appRecord) {
          subscriber.next(null);
        } else {
          subscriber.next(appRecord.histories[0]);
        }
      });
    })
    return observable;
  }

  updateVisitHistory(visitHistory: VisitHistory) {
    this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
      if (appRecord) {
        appRecord.histories[0] = visitHistory;
        this._storage.set(RECORD_KEY, appRecord).subscribe();
      }
    });
  }
}
