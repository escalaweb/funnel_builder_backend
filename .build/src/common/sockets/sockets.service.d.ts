import { Socket } from 'socket.io';
import { connectedClients_I } from '../interfaces';
export declare class SocketsService {
    private connectedClients;
    constructor();
    registerClient(client: Socket): void;
    removeClient(client: Socket): void;
    get_connectedClients(): connectedClients_I[];
    set_connectedClients(new_connectedClients: connectedClients_I[]): void;
}
