const calcAngleDegrees = (x, y) => {
    return (Math.atan2(y, x) * 180) / Math.PI;
};

window.addEventListener("DOMContentLoaded", () => {
    const bear = document.getElementById("bear");

    document.onmousemove = (e) => {
        const rect = bear.getBoundingClientRect();

        const y = rect.y - e.clientY;
        const x = rect.x - e.clientX;

        const angle = Math.abs(calcAngleDegrees(x, y));

        console.log(angle);

        if ((angle > 0 && angle < 45) || (angle > 320 && angle < 365)) {
            bear.className = "";
            const classes = ["bear", "right"];
            bear.classList.add(...classes);
        }
        if (angle > 135 && angle < 225) {
            bear.className = "";
            const classes = ["bear", "left"];
            bear.classList.add(...classes);
        }
        if (angle > 225 && angle < 320) {
            bear.className = "";
            const classes = ["bear", "down"];
            bear.classList.add(...classes);
        }
        if (angle > 45 && angle < 135) {
            bear.className = "";
            const classes = ["bear", "up"];
            bear.classList.add(...classes);
        }
    };
});
