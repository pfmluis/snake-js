import { 
    Application,
    Container,
    Graphics,
} from 'pixi.js';
import centerStageHelper from './utils/center-stage-helper';
import resizeHelper from './utils/resize-helper';

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight, 
});

const mapContainer = new Container();
const map = new Graphics();
map.lineStyle(1, 0xffffff);
map.drawRect(0, 0, 502, 502);

const snake = new Graphics();
snake.beginFill(0xffffff);
snake.lineStyle(1, 0x000000);
snake.drawRect(1, 1, 10, 10);
snake.endFill();

snake.vx = 1;
snake.virtualX = snake.x;

mapContainer.addChild(map);
mapContainer.addChild(snake);

app.stage.addChild(mapContainer);

app.ticker.add(() => {
    snake.virtualX += .1 * snake.vx;
    snake.x = Math.floor(snake.virtualX) * 10
})

document.body.appendChild(app.view);

centerStageHelper(app);
resizeHelper(app);
