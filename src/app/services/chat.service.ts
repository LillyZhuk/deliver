import * as io from 'socket.io-client';
import {Observable, Observer} from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        console.log(message, 'service')
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return new Observable(observer => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

    public onEvent(event): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
