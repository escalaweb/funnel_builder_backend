import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';

@WebSocketGateway({
    cors: true
})
export class SocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() _wss: Server;

    constructor(
        private readonly _socketService: SocketsService
    ) {

    }

    handleConnection(client: Socket, ...args: any[]) {

        console.log('Conectado');

        this._socketService.registerClient(client);


    }
    handleDisconnect(client: Socket) {

        console.log('Desconectado');

        this._socketService.removeClient(client);

    }

    // @SubscribeMessage('message')
    // handleMessage(client: Socket, payload: any): string {
    //     return 'Hello world!';
    // }
}

