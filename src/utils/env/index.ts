import * as dotenv from 'dotenv';
import * as path from 'path';

export const envIndex = (dir: string): void => {
    let env: string;
    switch (process.env.NODE_ENV) {
        case 'local':
            env = '';
            break;
        case 'dev':
            env = 'dev';
            break;
        case 'production':
            env = 'prod';
            break;
        case 'e2e':
            env = 'e2e';
            break;
        default:
            env = '';
            process.env.NODE_ENV = 'local';
            break;
    }

    dotenv.config({
        path: path.resolve(dir, `${env}.env`)
    });
};
