import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable } from "rxjs";
import { AppRecord, VisitHistory } from "./models";

const RECORD_KEY = 'leavehomesafe.record';
const AUTO_LEAVE_KEY = 'leavehomesafe.autoleave';

const DEFAULT_AUTO_HOURS = 4;

@Injectable({
  providedIn: "root"
})
export class AppService {
  private _locationName: string;

  constructor(private readonly _storage: StorageMap) { }

  setAutoLeaveOption(value: number) {
    this._storage.set(AUTO_LEAVE_KEY, value).subscribe();
  }

  getAutoLeaveOption(): Observable<number> {
    let observable = new Observable<number>((subscriber) => {
      this._storage.get(AUTO_LEAVE_KEY).subscribe((value: number) => {
        subscriber.next(value? value : DEFAULT_AUTO_HOURS);
      });
    });

    return observable;
  }

  enterVenue(name: string): Observable<any> {
    let history: VisitHistory = {
      location: name,
      inTime: new Date().getTime(),
      outTime: null,
      active: true,
      isAuto: true
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

  updateVisitHistory(visitHistory: VisitHistory): Observable<any> {
    let observable = new Observable<any>((subscriber) => {
      this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
        if (appRecord) {
          appRecord.histories[0] = visitHistory;
          this._storage.set(RECORD_KEY, appRecord).subscribe((_) => {
            subscriber.next();
          });
        } else {
          subscriber.next();
        }
      });
    });
    return observable;
  }
}
