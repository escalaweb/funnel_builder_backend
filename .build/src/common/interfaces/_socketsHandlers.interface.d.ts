import { Socket } from "socket.io";
interface AddressInfo {
    address: string;
    port: string;
}
export interface connectedClients_I {
    socket: Socket;
    addressInfo: AddressInfo;
    user?: any;
}
export {};
