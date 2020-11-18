// These two imports must go first!
import 'reflect-metadata';
import { Types } from './Types';
import { Container } from 'inversify';

import { ILogger } from './../services/logger/ILogger';
import { IRunMode } from './../services/runMode/IRunMode';
import { RunMode } from './../services/runMode/RunMode';
import { IEnvironment } from './../services/env/IEnvironment';
import { Environment } from './../services/env/Environment';
import { Logger } from '../services/logger/Logger';
import { ConsoleOutput } from "../services/logger/ConsoleOutput";
import { ILoggerOutput } from "../services/logger/ILoggerOutput";
import { Main } from '../Main';
import { ISample } from '../services/_samples/ISample';
import { SampleService } from './../services/_samples/SampleService';
import { IStartupArgs } from '../services/env/IStartupArgs';
import { StartupArgs } from '../services/env/StartupArgs';
import { Config } from '../services/config/Config';
import { IShell } from '../services/exe/IShell';
import { Shell } from '../services/exe/Shell';
import { IConfig } from '../services/config/IConfig';

const IoC = new Container();

try
{
    IoC.bind<SampleService>(SampleService).toSelf().whenTargetIsDefault(); // can be injected in constructor with any special helpers
    IoC.bind<ISample>(Types.ISample).to(SampleService).whenTargetIsDefault(); // can be injected with @inject(Types.ISample) in class constructor
    IoC.bind<IEnvironment>(Types.IEnvironment).to(Environment).whenTargetIsDefault();
    IoC.bind<IRunMode>(Types.IRunMode).to(RunMode).whenTargetIsDefault();
    IoC.bind<ILoggerOutput>(Types.ILoggerOutput).to(ConsoleOutput).inSingletonScope().whenTargetIsDefault();
    IoC.bind<ILogger>(Types.ILogger).to(Logger).inSingletonScope().whenTargetIsDefault();
    IoC.bind<Main>(Main).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<IStartupArgs>(Types.IStartupArgs).to(StartupArgs).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IConfig>(Types.IConfig).to(Config).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IShell>(Types.IExecutor).to(Shell).inRequestScope().whenTargetIsDefault(); // REQUEST????????????
}
catch (ex)
{
    console.log('IoC exception:', ex);
}

export { IoC };
