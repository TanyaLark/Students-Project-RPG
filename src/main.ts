import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";

async function bootstrap(): Promise<void> {
  const logger = new LoggerService();
  const app = new App(logger, new ExceptionFilter(logger));
  await app.init();
}

bootstrap().then(_ => {
}).catch(e => {
  console.error(e);
});
