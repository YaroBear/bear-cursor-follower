const convertToDegrees = (angle) => {
    return (angle * 180) / Math.PI;
};

const calcAngleRadians = (x, y) => {
    return Math.atan2(y, x);
};

const lerp = (a, b, alpha) => {
    return a + alpha * (b - a);
};

const getRelativeAngle = (bear, mouseEvent) => {
    const rect = bear.getBoundingClientRect();

    const y = rect.y - mouseEvent.clientY;
    const x = mouseEvent.clientX - rect.x;

    return calcAngleRadians(x, y);
};

const lookAtCursor = (relativeAngle) => {
    const abs_angle = Math.abs(relativeAngle);

    if (abs_angle < 45) {
        bear.className = "bear";
        bear.classList.add("right");
    }
    if (abs_angle > 135) {
        bear.className = "bear";
        bear.classList.add("left");
    }
    if (relativeAngle < -45 && relativeAngle > -135) {
        bear.className = "bear";
        bear.classList.add("down");
    }
    if (relativeAngle > 45 && relativeAngle < 135) {
        bear.className = "bear";
        bear.classList.add("up");
    }
};

const magnitude = 0.8;

function step(timeStamp) {
    let x = Number(bear.style.left.replace("px", ""));
    let y = Number(bear.style.top.replace("px", ""));

    x += magnitude * Math.cos(angleRad);
    y -= magnitude * Math.sin(angleRad);

    bear.style.left = `${x}px`;
    bear.style.top = `${y}px`;

    window.requestAnimationFrame(step);
}

let bear;
let angleRad = 0;

window.addEventListener("DOMContentLoaded", () => {
    bear = document.getElementById("bear");

    document.onmousemove = (e) => {
        angleRad = getRelativeAngle(bear, e);
        lookAtCursor(convertToDegrees(angleRad));
    };

    window.requestAnimationFrame(step);
});
