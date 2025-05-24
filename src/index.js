import bearSprite from "./bear.png";

const pi_forth = Math.PI / 4;
const three_pi_forth = 3 * pi_forth;

class BearFollower extends HTMLElement {
    bear;
    angleRad = 0;
    mouseX = 0;
    mouseY = 0;
    magnitude = 0.8;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                .bear {
                    width: 32px;
                    height: 32px;
                    position: absolute;
                    background: url(${bearSprite}) left top;
                    animation: play 0.8s steps(3) infinite;
                    image-rendering: pixelated;
                }

                @keyframes play {
                    100% {
                        background-position-x: -96px;
                    }
                }

                .down {
                    background-position: left top;
                }

                .up {
                    background-position: left -96px;
                }

                .left {
                    background-position: left -32px;
                }

                .right {
                    background-position: left -64px;
                }
            </style>
            <div id="bear" class="bear up"></div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.bear = this.shadowRoot.getElementById("bear");

        this.followCursor = this.followCursor.bind(this);
        this.step = this.step.bind(this);

        window.requestAnimationFrame(this.step);
    }

    connectedCallback() {
        document.addEventListener("mousemove", this.followCursor);
    }

    disconnectedCallback() {
        document.removeEventListener("mousemove", this.followCursor);
    }

    calcAngleRadians(x, y) {
        return Math.atan2(y, x);
    }

    setRelativeAngle() {
        const rect = this.bear.getBoundingClientRect();

        const y = rect.y - this.mouseY;
        const x = this.mouseX - rect.x;

        this.angleRad = this.calcAngleRadians(x, y);
    }

    lookAtCursor() {
        const abs_angle = Math.abs(this.angleRad);

        if (abs_angle < pi_forth) {
            this.bear.className = "bear";
            this.bear.classList.add("right");
        }
        if (abs_angle > three_pi_forth) {
            this.bear.className = "bear";
            this.bear.classList.add("left");
        }
        if (this.angleRad < -pi_forth && this.angleRad > -three_pi_forth) {
            this.bear.className = "bear";
            this.bear.classList.add("down");
        }
        if (this.angleRad > pi_forth && this.angleRad < three_pi_forth) {
            this.bear.className = "bear";
            this.bear.classList.add("up");
        }
    }

    step(timeStamp) {
        let x = Number(this.bear.style.left.replace("px", ""));
        let y = Number(this.bear.style.top.replace("px", ""));

        if (
            Math.abs(x - this.mouseX) >= 10 ||
            Math.abs(y - this.mouseY) >= 10
        ) {
            x += this.magnitude * Math.cos(this.angleRad);
            y -= this.magnitude * Math.sin(this.angleRad);

            this.bear.style["animation-play-state"] = "running";
        } else {
            this.bear.style["animation-play-state"] = "paused";
        }

        this.bear.style.left = `${x}px`;
        this.bear.style.top = `${y}px`;

        window.requestAnimationFrame(this.step);
    }

    updateMouse = (mouseEvent) => {
        this.mouseX = mouseEvent.clientX;
        this.mouseY = mouseEvent.clientY;
    };

    followCursor(event) {
        this.updateMouse(event);
        this.setRelativeAngle();
        this.lookAtCursor();
    }
}

customElements.define("bear-follower", BearFollower);
