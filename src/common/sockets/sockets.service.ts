import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { connectedClients_I } from '../interfaces';

@Injectable()
export class SocketsService {

    private connectedClients: connectedClients_I[] = []

    constructor() {

    }

    registerClient(client: Socket) {

        let a: any = client.request.connection.address();

        let x: connectedClients_I = {
            // client_id: client.id,
            socket: client,
            addressInfo: {
                address: a.address,
                port: a.port,
            },
            user: null
        };

        this.connectedClients.push(x);

        console.log('List:', this.connectedClients);

    }

    removeClient(client: Socket) {

        // delete this.connectedClients[client.id];

        this.connectedClients = this.connectedClients.filter(r => {
            return r.socket.id != client.id
        })

        console.log('List:', this.connectedClients);

    }

    get_connectedClients() {
        return this.connectedClients;
    }

    set_connectedClients(new_connectedClients: connectedClients_I[]) {
        this.connectedClients = new_connectedClients;

        console.log('List:', this.connectedClients);
    }


}
