import { Injectable } from "@nestjs/common";


import * as  momentTimeZone from "moment-timezone";

@Injectable()
export class DateProcessService {

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

    getDiffInDays(date: any) {
        date = this.convertHumanDateIntoSystemDate(date)
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.diff(date, 'days');
    }

    //incluimos un nuevo metodo para sacar rango de fechas
    getNextPointToPointInTime(days: number, date: any) {
        date = this.convertHumanDateIntoSystemDate(date)
        let day_Array: String[] = Array();

        for (let i = 1; i <= days; ++i) {
            day_Array.push(momentTimeZone(date).add(i, "days").format('LL'));
        }

        return day_Array;
    }

    //funcion en base a la fecha humana, la transforma a fehca de sistema
    convertHumanDateIntoSystemDate(date: string) {

        return momentTimeZone(date, 'LL', 'es').format('YYYYMMDD')
    }

    getBackpointInTime(days: number) {
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.subtract(days, "days");
    }

    //funcion que me retorna fecha futura en base a dias
    getNextPointInTime(days: number) {
        let dateMoment = momentTimeZone().tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('LL');
    }

    getNextPointDate(days: number, date: string) {
        date = this.convertHumanDateIntoSystemDate(date)
        let dateMoment = momentTimeZone(date).tz("America/Montevideo");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('dddd,LL,h:mm A').split(',');
    }

    async getDecodeXFormat(time: string, local: string) {

        return new Promise(async (resolve, reject) => {

            let l: any = await momentTimeZone(time, 'x').locale(local).format('dddd,LL,h:mm A').split(',')

            resolve(l);
        });

    }

    async get_dateType(encodeDate: any = null, local: string = 'es', type: string = 'fullDate', model: string = 'full') {

        return new Promise(async (resolve, reject) => {

            let l: any = null;
            let x: any = null;

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

                l = await momentTimeZone(x, 'x').locale(local).format('dddd,L,h:mm A').split(',')

            }

            if (model != null && model == 'full') {

                l = await momentTimeZone(x, 'x').locale(local).format('dddd,LL,h:mm A').split(',')

            }

            console.log('la L decondificada', l);

            l = await this.typeDate(type, l);

            console.log('despues la L decondificada', l);

            resolve(l);

        });

    }

    typeDate(type: string, r: any[]) {

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



}
