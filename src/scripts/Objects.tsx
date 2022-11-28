import IPlayer from "./Player";

const rocksAssets = [new Image(60, 60), new Image(60, 60), new Image(60, 60), new Image(60, 60)];
rocksAssets[0].src = "./assets/Villains/Enemy0.png";
rocksAssets[1].src = "./assets/Villains/Enemy1.png";
rocksAssets[2].src = "./assets/Villains/Enemy2.png";
rocksAssets[3].src = "./assets/Villains/Enemy3.png";

export {};
export default class ObjectsOnScreen {
    constructor() {
        this.generateAsteroide = this.generateAsteroide.bind(this);
        setInterval(this.generateAsteroide, 1000);
        this.generateAsteroide();
    }
    private ctx: CanvasRenderingContext2D = undefined as any;
    public shoots: {
        y: number;
        x: number;
        v: number;
    }[] = [];
    public rocks: {
        img: HTMLImageElement;
        x: number;
        y: number;
        v: number;
    }[] = [];
    setContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    setShoots(shoots: any) {
        this.shoots = shoots;
    }
    private getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateAsteroide() {
        for (let i = 0; i < 4; i++) {
            this.rocks.push({
                img: rocksAssets[this.getRandomIntInclusive(0, rocksAssets.length - 1)],
                y: this.getRandomIntInclusive(-600, -60),
                x: this.getRandomIntInclusive(0, 1280),
                v: this.getRandomIntInclusive(2, 20)
            });
        }        
    }
    render(Player: IPlayer) {
        if (this.shoots.length !== 0) {
            this.shoots.forEach((shoot, index)=>{
                this.ctx.beginPath();
                this.ctx.fillStyle = "#FFFF00";
                this.ctx.fillRect(shoot.x, shoot.y, 8, 140);
                this.ctx.closePath();
                if (this.shoots[index]) {
                    this.shoots[index].y -= shoot.v;
                    if (this.shoots[index].y < -140) this.shoots = this.shoots.splice(index, 1);
                }
            });
        }
        this.rocks.forEach((rock)=>this.ctx.drawImage(rock.img, rock.x, rock.y, 60, 60));
        this.rocks = this.rocks.map((el)=>({ ...el, y: el.y + el.v }));
        this.rocks = this.rocks.filter((el)=>(el.y - 60) < 720);
        var deleteRock: typeof this.rocks = [];
        this.shoots.forEach((shoot)=>{
            this.rocks.forEach((rock)=>{
                const ejeY = shoot.y >= rock.y && shoot.y <= (rock.y + 60) ||
                    rock.y > shoot.y && rock.y < (shoot.y + 140);
                const ejeX = shoot.x >= rock.x && (shoot.x + 8) <= (rock.x + 60);
                if (ejeY && ejeX) deleteRock.push(rock);
            });
        });
        this.rocks = this.rocks.filter((s)=>!deleteRock.find((s2)=>s == s2));
        var deleteRock2: typeof this.rocks = [];
        this.rocks.forEach((rock)=>{
            const largeYPlayer = Player.top + 104;
            const largeYRock = rock.y + 60;

            const largeXPlayer = Player.left + 74;
            const largeXRock = rock.x + 60;

            const ejeY = Player.top >= rock.y && Player.top <= largeYRock ||
                largeYPlayer >= rock.y && largeYPlayer <= largeYRock;

            const ejeX = Player.left >= rock.x && Player.left <= largeXRock ||
                largeXPlayer >= rock.x && largeXPlayer <= largeXRock;

            if (ejeY && ejeX) {
                Player.life -= 10;
                deleteRock2.push(rock);
            }
        });
        this.rocks = this.rocks.filter((s)=>!deleteRock2.find((s2)=>s == s2));
    }
}