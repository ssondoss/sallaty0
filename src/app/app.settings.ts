import { Injectable } from '@angular/core';

export class Settings {
    constructor(public name: string,
                public theme: string,
                public rtl: boolean) { }
}

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'sallaty',  // theme name
        'green',     // green, blue, red, pink, purple, grey
        false       // true = rtl, false = ltr
    )
}