import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { connectedClients_I } from '../../../common/interfaces';
import { SocketsService } from '../../../common/sockets/sockets.service';
import { loginUserData_I } from '../dto/_ws_updateSession.interface';

@Injectable()
export class AuthWsService {

    @WebSocketServer() _wss: Server;

    constructor(
        private _socketsService: SocketsService
    ) {}

    async _ws_session_signin(client: Socket, payload: loginUserData_I) {

        let aux_connectedClients: connectedClients_I[] = this._socketsService.get_connectedClients();
        let a: any = client.request.connection['_peername'];

        await aux_connectedClients.forEach((element: connectedClients_I) => {

            if (element.socket.id === client.id) {

                element.user = { ...payload };
            }

            if(element.addressInfo?.address === a?.address){
                this._ws_session_connectClients(element.socket);
            }

        });

        this._socketsService.set_connectedClients(aux_connectedClients);

    }

    async _ws_session_logout(client: Socket, payload: string) {


        let aux_connectedClients: connectedClients_I[] = this._socketsService.get_connectedClients();
        let a: any = client.request.connection['_peername'];

        await aux_connectedClients.forEach( async (element: connectedClients_I) => {

            if (element.user?._id === payload && element.addressInfo?.address === a?.address) {
                await this._ws_session_disconnectClients(element.socket);
                element.user = null;
            }

        });

        this._socketsService.set_connectedClients(aux_connectedClients);

    }

    async _ws_session_connectClients(client: Socket) {

        // emite unicamente al cliente
        client.emit('_ws_session_connectClients');
         // emitir a todos, menos al cliente inicial
        // client.broadcast.emit('_ws_b_auth_disconnectClients')

    }
    async _ws_session_disconnectClients(client: Socket) {

        // emite unicamente al cliente
        client.emit('_ws_b_auth_disconnectClients');
         // emitir a todos, menos al cliente inicial
        // client.broadcast.emit('_ws_b_auth_disconnectClients')

    }


}
