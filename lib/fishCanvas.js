import { Fish } from "./fish/Fish";
import { Joint } from "./fish/Joint";

export function initFishCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const fishList = [];

  let backgroundColor = "255,255,255";
  let foregroundColor = "0,0,0";

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 3; i++) {
    const origin = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    fishList.push(new Fish(ctx, origin));
  }

  let animationId;

  function animate() {
    const root = document.documentElement;
    backgroundColor = getComputedStyle(root)
      .getPropertyValue("--background-color")
      .trim();

    foregroundColor = getComputedStyle(root)
      .getPropertyValue("--foreground-color")
      .trim();

    canvas.style.background = `rgb(${backgroundColor})`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fishList.forEach(fish => {
      fish.resolve();
      fish.draw(foregroundColor);
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const target = new Joint(x, y, 12.1);
    const i = Math.floor(Math.random() * fishList.length);
    fishList[i].forceSetTarget(target);
  }

  function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("click", handleClick);
  }

  return { handleClick, cleanup };
}
