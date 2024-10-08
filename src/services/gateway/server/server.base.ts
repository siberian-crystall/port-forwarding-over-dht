import { GatewayInstance } from '~services/gateway/instance';
import { Console } from '~utils/console';

import type DHT from 'hyperdht';
import type { KeyPair } from 'hyperdht';


export abstract class BaseServer extends GatewayInstance {
    /** @inheritdoc */
    public async init(dht: DHT, keyPair: KeyPair) {
        const server = dht.createServer({ reusableSocket: this.reusableSocket }, (stream) => {
            Console.info(`New remote ${this.config.protocol} connection on port ${this.config.port}`);

            this.handleStreamErrors(stream);
            this.createConnection(stream);
        });

        await server.listen(keyPair);
        Console.debug(`Listening for remote ${this.config.protocol} connections on port ${this.config.port}`);
    }
}
