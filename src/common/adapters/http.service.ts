import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { _response_I } from '../interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class _HttpService {


    constructor(
        private readonly httpService: HttpService
    ) {

    }

    // _get<T>(url: string): Promise<AxiosResponse<T>> {
    async _get<T>(url: string, config: AxiosRequestConfig): Promise<_response_I<T>> {

        let _Response: _response_I<T>;

        try {

            await this.httpService.axiosRef.get<T>(url, config).then((r: AxiosResponse<T>) => {

                _Response = {
                    ok: true,
                    data: r.data,
                    path: url,
                    statusCode: r.status
                }

            });

        } catch (error) {

            _Response = {
                ok: false,
                data: null,
                message: [
                    {
                        text: 'Error on request',
                        type: 'internal'
                    }
                ],
                path: url,
                statusCode: error.response.status,
                err: error
            };
            // return error;

        }

        return _Response;

    }


}


//   HttpModuleAsyncOptions,
//   HttpModuleOptions,
