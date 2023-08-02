import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';
export declare class SocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly _socketService;
    _wss: Server;
    constructor(_socketService: SocketsService);
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
}
