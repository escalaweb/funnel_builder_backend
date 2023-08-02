"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateProcessService = void 0;
const common_1 = require("@nestjs/common");
const momentTimeZone = require("moment-timezone");
let DateProcessService = class DateProcessService {
    constructor() { }
    setDate() {
        const dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.format('x');
    }
    getShortDate() {
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.format('LL');
    }
    getDiffInDays(date) {
        date = this.convertHumanDateIntoSystemDate(date);
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.diff(date, 'days');
    }
    getNextPointToPointInTime(days, date) {
        date = this.convertHumanDateIntoSystemDate(date);
        let day_Array = Array();
        for (let i = 1; i <= days; ++i) {
            day_Array.push(momentTimeZone(date).add(i, "days").format('LL'));
        }
        return day_Array;
    }
    convertHumanDateIntoSystemDate(date) {
        return momentTimeZone(date, 'LL', 'es').format('YYYYMMDD');
    }
    getBackpointInTime(days) {
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.subtract(days, "days");
    }
    getNextPointInTime(days) {
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('LL');
    }
    getNextPointDate(days, date) {
        date = this.convertHumanDateIntoSystemDate(date);
        let dateMoment = momentTimeZone(date).tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('dddd,LL,h:mm A').split(',');
    }
    async getDecodeXFormat(time, local) {
        return new Promise(async (resolve, reject) => {
            let l = await momentTimeZone(time, 'x').locale(local).format('dddd,LL,h:mm A').split(',');
            resolve(l);
        });
    }
    async get_dateType(encodeDate = null, local = 'es', type = 'fullDate', model = 'full') {
        return new Promise(async (resolve, reject) => {
            let l = null;
            let x = null;
            if (encodeDate == null) {
                resolve(null);
                return;
            }
            console.log('se mete el encoded', encodeDate);
            if (typeof encodeDate == 'object' && encodeDate.date != null) {
                x = encodeDate.date;
            }
            if (typeof encodeDate == 'string' && encodeDate != null) {
                x = encodeDate;
            }
            console.log('la equis fecha', x);
            if (model != null && model == 'short') {
                l = await momentTimeZone(x, 'x').locale(local).format('dddd,L,h:mm A').split(',');
            }
            if (model != null && model == 'full') {
                l = await momentTimeZone(x, 'x').locale(local).format('dddd,LL,h:mm A').split(',');
            }
            console.log('la L decondificada', l);
            l = await this.typeDate(type, l);
            console.log('despues la L decondificada', l);
            resolve(l);
        });
    }
    typeDate(type, r) {
        if (r.length > 0) {
            if (type == 'day') {
                return r[0];
            }
            if (type == 'fullDate') {
                return r[1];
            }
            if (type == 'fullDate_hour') {
                return r[1] + ' - ' + r[2];
            }
            if (type == 'hour') {
                return r[2];
            }
        }
    }
};
DateProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DateProcessService);
exports.DateProcessService = DateProcessService;
//# sourceMappingURL=dateProcess.service.js.map