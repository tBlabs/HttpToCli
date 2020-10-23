import * as fs from 'fs';
import { Route, StaticRoute } from './Route';
import 'reflect-metadata'; 
import { injectable, inject } from 'inversify';
import { Types } from '../../IoC/Types';
import { IStartupArgs } from '../env/IStartupArgs';
import { IConfig } from './IConfig';

@injectable()
export class Config implements IConfig
{
    private config: any;
    
    constructor(@inject(Types.IStartupArgs) private _args: IStartupArgs)
    {
        const configFileDir = this._args.Args.config || './config.json';

        const configFileContent = fs.readFileSync(configFileDir, 'utf8');
        
        this.config = JSON.parse(configFileContent);
    }    

    public get ServerPort(): number
    {
        return this._args.Args.port || this.config.serverPort || 3000;
    }

    public get Routes(): Route[]
    {
        return this.config.routes;  
    }

    public get Statics(): StaticRoute[]
    {
        return this.config.statics;  
    }

    public get Shell(): string
    {
        return this.config.shell || "sh"; // 'sh' for linux, 'powershell' for windows
    }
}