import { customSetInterval, getPercent } from "./Utils";

export {};
const ImagesPlayer = {
    "Player0": new Image(148, 208),
    "Player1": new Image(148, 208),
    "Player2": new Image(148, 208),
    "Player3": new Image(148, 208)
};
ImagesPlayer.Player0.src = "./assets/Player/Player0.png";
ImagesPlayer.Player1.src = "./assets/Player/Player1.png";
ImagesPlayer.Player2.src = "./assets/Player/Player2.png";
ImagesPlayer.Player3.src = "./assets/Player/Player3.png";

declare global {
    interface Window {
        intervalPlayerNumber: number;
        intervalPlayer: boolean;
    }
};

export default class Player {
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.top = getPercent(this.height, 50);
        this.left = getPercent(this.width, 50) - this.sizeWidth;
        this.init = this.init.bind(this);
        window.intervalPlayer = true;
        window.intervalPlayerNumber = 300;
        customSetInterval(this.init, 'intervalPlayerNumber', 'intervalPlayer');
        this.startControls();
    }
    private width: number = 0;
    private height: number = 0;
    // Values
    private sizeWidth = 74;
    private sizeHeight = 104;
    private position = 0;
    public life = 100;
    // Position
    public top = 0;
    public left = 0;
    public velocity = 8;
    // Keyboard
    private keysPressed = {
        w: false,
        s: false,
        d: false,
        a: false,
        space: false
    };
    // Shoots
    public shoots: {
        y: number;
        x: number;
        v: number;
    }[] = [];

    init() {
        var calcPosition = this.position + 1;
        var newPosition = (calcPosition > 3)? 0: calcPosition;
        this.position = newPosition;
    }
    startControls() {
        document.addEventListener("keydown", (ev)=>{
            if (ev.key == "w") return this.keysPressed.w = true;
            if (ev.key == "a") return this.keysPressed.a = true;
            if (ev.key == "s") return this.keysPressed.s = true;
            if (ev.key == "d") return this.keysPressed.d = true;
            // Arrows
            if (ev.key == "ArrowUp") return this.keysPressed.w = true;
            if (ev.key == "ArrowLeft") return this.keysPressed.a = true;
            if (ev.key == "ArrowDown") return this.keysPressed.s = true;
            if (ev.key == "ArrowRight") return this.keysPressed.d = true;
            // Extras
            if (ev.key == "Shift") return this.velocity = 18;
            //if (ev.key == "f") return this.life -= 10;
            if (ev.code == "Space") return this.keysPressed.space = true;
        }, false);
        document.addEventListener("keyup", (ev)=>{
            if (ev.key == "w") return this.keysPressed.w = false;
            if (ev.key == "a") return this.keysPressed.a = false;
            if (ev.key == "s") return this.keysPressed.s = false;
            if (ev.key == "d") return this.keysPressed.d = false;
            // Arrows
            if (ev.key == "ArrowUp") return this.keysPressed.w = false;
            if (ev.key == "ArrowLeft") return this.keysPressed.a = false;
            if (ev.key == "ArrowDown") return this.keysPressed.s = false;
            if (ev.key == "ArrowRight") return this.keysPressed.d = false;
            // Extras
            if (ev.key == "Shift") return this.velocity = 8;
        }, false);
    }
    locationMove() {
        var top = this.top;
        var left = this.left;
        if (this.keysPressed.w) top -= this.velocity;
        if (this.keysPressed.s) top += this.velocity;
        if (this.keysPressed.a) left -= this.velocity;
        if (this.keysPressed.d) left += this.velocity;
        top = (top <= 0)? 0: ((top + this.sizeHeight) > this.height)? this.top: top;
        left = (left <= 0)? 0: ((left + this.sizeWidth) > this.width)? this.left: left;
        if ((top !== this.top) || (left !== this.left)) window.intervalPlayerNumber = 100; else window.intervalPlayerNumber = 300;
        this.top = top;
        this.left = left;
    }
    setShoots() {
        if (this.keysPressed.space) {
            this.shoots.push({
                x: this.left + 33,
                y: this.top - 116,
                v: 20
            });
            this.keysPressed.space = false;
            console.log(this.shoots);
        }
    }
    get() {
        this.locationMove();
        this.setShoots();
        const PositionUse =
            (this.position == 1)? ImagesPlayer.Player1:
            (this.position == 2)? ImagesPlayer.Player2:
            (this.position == 3)? ImagesPlayer.Player3:
            ImagesPlayer.Player0;
        const result = {
            top: this.top,
            left: this.left,
            size: {
                width: this.sizeWidth,
                height: this.sizeHeight
            },
            texture: PositionUse
        };
        return result;
    }
}