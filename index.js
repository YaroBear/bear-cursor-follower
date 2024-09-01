const calcAngleRadians = (x, y) => {
    return Math.atan2(y, x);
};

const pi_forth = Math.PI / 4;
const three_pi_forth = 3 * pi_forth;

const getRelativeAngle = (bear) => {
    const rect = bear.getBoundingClientRect();

    const y = rect.y - mouseY;
    const x = mouseX - rect.x;

    return calcAngleRadians(x, y);
};

const lookAtCursor = (angleRad) => {
    const abs_angle = Math.abs(angleRad);

    if (abs_angle < pi_forth) {
        bear.className = "bear";
        bear.classList.add("right");
    }
    if (abs_angle > three_pi_forth) {
        bear.className = "bear";
        bear.classList.add("left");
    }
    if (angleRad < -pi_forth && angleRad > -three_pi_forth) {
        bear.className = "bear";
        bear.classList.add("down");
    }
    if (angleRad > pi_forth && angleRad < three_pi_forth) {
        bear.className = "bear";
        bear.classList.add("up");
    }
};

const magnitude = 0.8;

function step(timeStamp) {
    let x = Number(bear.style.left.replace("px", ""));
    let y = Number(bear.style.top.replace("px", ""));

    if (Math.abs(x - mouseX) >= 10 && Math.abs(y - mouseY) >= 10) {
        x += magnitude * Math.cos(angleRad);
        y -= magnitude * Math.sin(angleRad);

        bear.style["animation-play-state"] = "running";
    } else {
        bear.style["animation-play-state"] = "paused";
    }

    bear.style.left = `${x}px`;
    bear.style.top = `${y}px`;

    window.requestAnimationFrame(step);
}

const updateMouse = (mouseEvent) => {
    mouseX = mouseEvent.clientX;
    mouseY = mouseEvent.clientY;
};

let bear;
let angleRad = 0;
let mouseX = 0;
let mouseY = 0;

window.addEventListener("DOMContentLoaded", () => {
    bear = document.getElementById("bear");

    document.onmousemove = (e) => {
        updateMouse(e);
        angleRad = getRelativeAngle(bear);
        lookAtCursor(angleRad);
    };

    window.requestAnimationFrame(step);
});
