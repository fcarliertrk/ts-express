import { App } from './app';
import { TapeRoute } from './routes/tapes.route';
const app = new App([new TapeRoute()]);
app.listen();
