import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable } from "rxjs";
import { AppRecord, VisitHistory } from "./models";
import { StringUtility } from "./shared/string-utility";

const RECORD_KEY = 'leavehomesafe.record';
const AUTO_LEAVE_KEY = 'leavehomesafe.autoleave';

const DEFAULT_AUTO_HOURS = 4;

@Injectable({
  providedIn: "root"
})
export class AppService {

  constructor(private readonly _storage: StorageMap) { }

  initAppRecord() {
    this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
      if (appRecord && appRecord.version === undefined) {
        console.log('Version 1 AppRecord found');
        console.log(JSON.stringify(appRecord));
        // remove history without location name
        // remove inactive history without leave time
        let validHistories = appRecord.histories.filter((history: any) => {
          if (!history.location || (!history.active && !history.outTime)) {
            return false;
          } else {
            return true;
          }
        });
        validHistories.forEach((history: any) => {
          history.locationEn = history.location;
          history.locationZh = null;
          delete history.location;
        });
        appRecord.histories.length = 0;
        appRecord.histories.push(...validHistories);
        appRecord.version = 2;
        this._storage.set(RECORD_KEY, appRecord).subscribe();
      }
    });
  }

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

  enterVenue(locationEn: string, locationZh: string): Observable<any> {
    locationZh = StringUtility.fromUTF8Array(StringUtility.toArray(locationZh))
    let history: VisitHistory = {
      locationEn: locationEn,
      locationZh: locationZh,
      inTime: new Date().getTime(),
      outTime: null,
      active: true,
      isAuto: true
    };

    let observable = new Observable<any>((subscriber) => {
      this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
        if (!appRecord) {
          appRecord = {
            version: 2,
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

  getAllVisitHistory(): Observable<VisitHistory[]> {
    let observable = new Observable<VisitHistory[]>((subscriber) => {
      this._storage.get(RECORD_KEY).subscribe((appRecord: AppRecord) => {
        if (!appRecord) {
          subscriber.next([]);
        } else {
          subscriber.next(appRecord.histories);
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
