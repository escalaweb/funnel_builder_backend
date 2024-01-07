import { ConfigService } from "@nestjs/config";
import { _Configuration_Keys } from "../../config/config.keys";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { _paginatorModel_I } from "./_response.interface";
import { _Populate_I } from "./_responseFindParameters.interface";

const Config = new ConfigService();

export interface _argsPagination {

    findObject: {
        where?: any,
        relations?: string[],
        select?: any,
        order?: any,
    };
    options?: IPaginationOptions,
    populate?: _Populate_I;
    // options?: _dataPaginator;

}

export interface _paginateByArray_I<T> {
    data: T[],
    paginator: _paginatorModel_I
}

export interface _dataPaginator {

    page: number;
    limit: number | string;
    sort?: any;
    select?: any;
    populate?: any;

}

export interface _argsPaginationAggregate {
    aggregate: any;
    options: _dataPaginatorAggregate
}


export interface _dataPaginatorAggregate {

    // page: number;
    // limit: number;
    // customLabels: any;
    // // sort: { '_id': -1 }, <- example
    // sort?: any;
    // // select: "-pass" <- example
    // select?: any;
    // populate?: any;
    pagination: boolean,
    customLabels: any,
    page?: number,
    limit?: number,
    sort?: string,
    offset?: number,
    allowDiskUse?: boolean,
    countQuery?: any
    // customLabels?: any,

}

export const _configPaginator = {
    page: 1,
    limit: Config.get(_Configuration_Keys.DEFAULT_LIMIT),
    customLabels: {
        totalDocs: "itemCount",
        docs: "itemsList",
        limit: "perPage",
        page: "currentPage",
        nextPage: "next",
        prevPage: "prev",
        totalPages: "pageCount",
        pagingCounter: "pageCounter",
        meta: "paginator",
    },
};

