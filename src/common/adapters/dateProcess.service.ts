import { Injectable } from "@nestjs/common";

import * as  momentTimeZone from "moment-timezone";

type dateType = 'day' | 'dayn' | 'fullDate' | 'fullDate_hour' | 'hour';

@Injectable()
export class DateProcessService {

    constructor() { }

    setDate(): string {

        const dateMoment = momentTimeZone().tz("America/New_York");
        dateMoment.locale('es');
        return dateMoment.format('x');

    }

     setDate_transform(dateType: dateType = 'fullDate') {

        const dateMoment = momentTimeZone().tz("America/New_York");
        dateMoment.locale('es');

        let aux_x: string = dateMoment.format('x');

         this.get_dateType(aux_x, 'es', dateType).then(r =>{
            return r;
        })

    }

    getShortDate() {
        let dateMoment = momentTimeZone().tz("America/New_York");
        dateMoment.locale('es');
        return dateMoment.format('LL');
    }

    getDiffInDays(date: any) {
        date = this.convertHumanDateIntoSystemDate(date)
        let dateMoment = momentTimeZone().tz("America/New_York");
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
        let dateMoment = momentTimeZone().tz("America/New_York");
        dateMoment.locale('es');
        return dateMoment.subtract(days, "days");
    }

    //funcion que me retorna fecha futura en base a dias
    getNextPointInTime(days: number) {
        let dateMoment = momentTimeZone().tz("America/New_York");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('LL');
    }

    getNextPointDate(days: number, date: string) {
        date = this.convertHumanDateIntoSystemDate(date)
        let dateMoment = momentTimeZone(date).tz("America/New_York");
        dateMoment.locale('es');
        return dateMoment.add(days, 'days').format('dddd,LL,h:mm A').split(',');
    }

    async getDecodeXFormat(time: string, local: string, model: string = '') {

        return new Promise(async (resolve, reject) => {

            let l: any = null;

            if (model != '' && model == 'short') {

                // dddd*MMM d, YYYY*h:mm A'

                l = await momentTimeZone(time, 'x').locale(local).format(
                    'dddd*DD*MMM*YYYY*MMM DD, YYYY*h:mm A'
                ).split('*');


            } else {

                l = await momentTimeZone(time, 'x').locale(local).format(
                    'dddd*DD*MMM*YYYY*MMM DD, YYYY*h:mm A'
                ).split('*');

                // console.log('total', l);

            }

            resolve(l);

        });
    }

    async get_dateType(encodeDate: any = null, local: string = 'es', type: dateType = 'fullDate', model: string = 'full') {

        return new Promise(async (resolve, reject) => {

            if (encodeDate != null) {

                let l: string = '';

                let x: string = '';

                if (typeof encodeDate == 'object' && encodeDate.date != null) {

                    x = encodeDate.date;

                }
                if (typeof encodeDate == 'string' && encodeDate != null) {

                    x = encodeDate;

                }

                await this.getDecodeXFormat(x, local, model).then(async (r: any) => {

                    let e = this.typeDate(type, r);

                    l = e

                    return l;

                }, err => {

                    l = encodeDate;
                    return encodeDate

                });

                // console.log('Lo que retorna el date pipe', l);

                return l;

            } else {
                return encodeDate;
            }

        });

    }


    typeDate(type: dateType, r: any[]) {

        if (r.length > 0) {

            if (type == 'day') {
                return r[0];
            }

            if (type == 'fullDate') {

                let aux: string = r[4];
                aux = aux.charAt(0).toUpperCase() + aux.slice(1);
                aux = aux.replace('.', '');

                return aux
                // return r[1];
            }
            if (type == 'fullDate_hour') {

                let aux: string = r[4];
                aux = aux.charAt(0).toUpperCase() + aux.slice(1);
                aux = aux.replace('.', '');

                return aux + ' - ' + r[5];
            }
            if (type == 'hour') {
                return r[5];
            }

        }
    }




}
