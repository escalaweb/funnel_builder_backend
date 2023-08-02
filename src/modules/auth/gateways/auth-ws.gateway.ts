import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { loginUserData_I } from '../dto/_ws_updateSession.interface';
import { AuthWsService } from './auth-ws.service';

@WebSocketGateway({
    cors: true
})
export class AuthWsGateway {

    constructor(
        private _authWsService: AuthWsService
    ){

    }

    @SubscribeMessage('_ws_session_signin')
    async _ws_session_signin(client: Socket, payload: loginUserData_I) {

        await this._authWsService._ws_session_signin(client, payload);

    }

    @SubscribeMessage('_ws_session_logout')
    async _ws_session_logout(client: Socket, payload: string) {

        await this._authWsService._ws_session_logout(client, payload);

    }

}
