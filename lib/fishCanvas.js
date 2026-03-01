import { Fish } from "./fish/Fish";
import { Target } from "./fish/Target";

export function initFishCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const fishList = [];
  let forceTargetList = [];

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

    console.log(forceTargetList);
    forceTargetList = forceTargetList.filter(target => target.isActive());

    forceTargetList.forEach(target => {
      target.draw(ctx);
    });

    fishList.forEach(fish => {
      if (forceTargetList.length > 0 
        && Math.floor(Math.random() * fishList.length) === 0
        && !fish.onForcedTarget()) {
          const randTargetIndex = Math.floor(Math.random() * forceTargetList.length);
          fish.forceSetTarget(forceTargetList[randTargetIndex]);
        }
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
    const target = new Target(x, y, true);
    const i = Math.floor(Math.random() * fishList.length);
    // fishList[i].forceSetTarget(target);
    forceTargetList.push(target);
  }

  function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("click", handleClick);
  }

  return { handleClick, cleanup };
}
