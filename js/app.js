const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0,
  yValue = 0,
  rotateDegree = 0;

function update(currPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotationSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (currPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      xValue * speedx
    }px)) translateY(calc(-50% + ${
      yValue * speedy
    }px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
      rotateDegree * rotationSpeed
    }deg)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
}

// Blob Effect

const blob = document.getElementById("blob");
document.onmousemove = (event) => {
  const { pageX, pageY } = event;

  if (pageY > 980 && pageY < 4050) {
    blob.animate(
      {
        height: "30vmax",
        opacity: 1,
        left: `${pageX}px`,
        top: `${pageY - 600}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  } else if(pageY > 4050 && pageY < 4150) {
    blob.animate(
      {
        height: "15vmax",
        opacity: 1,
        left: `${pageX}px`,
        top: `${pageY - 600}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  }
  else {
    blob.animate(
      {
        height: "0px",
        opacity: 0,
        left: `${pageX}px`,
        top: `${pageY - 600}px`,
      },
      { duration: 1500, fill: "forwards" }
    );
  }
};

// GSAP Animation

let timeline = gsap.timeline();

Array.from(parallax_el)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance * 1.5}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2.5,
    },
    "3"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );

// IMAGE SCROLL SECTION

const track1 = document.getElementById("image-track1");
const memory1 = document.getElementById("memory-1");
const track2 = document.getElementById("image-track2");
const memory2 = document.getElementById("memory-2");
const track3 = document.getElementById("image-track3");
const memory3 = document.getElementById("memory-3");
const track4 = document.getElementById("image-track4");
const memory4 = document.getElementById("memory-4");

const handleOnDown = (e, track) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = (e, track) => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e, track) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// window.onmousedown = (e) => handleOnDown(e);

// window.ontouchstart = (e) => handleOnDown(e.touches[0]);

// window.onmouseup = (e) => handleOnUp(e);

// window.ontouchend = (e) => handleOnUp(e.touches[0]);

// window.onmousemove = (e) => handleOnMove(e);

// window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// MEMORY 1
memory1.onmousedown = (e) => handleOnDown(e, track1);
memory1.ontouchstart = (e) => handleOnDown(e.touches[0], track1);
memory1.onmouseup = (e) => handleOnUp(e, track1);
memory1.ontouchend = (e) => handleOnUp(e.touches[0], track1);
memory1.onmousemove = (e) => handleOnMove(e, track1);
memory1.ontouchmove = (e) => handleOnMove(e.touches[0], track1);

// MEMORY 2
memory2.onmousedown = (e) => handleOnDown(e, track2);
memory2.ontouchstart = (e) => handleOnDown(e.touches[0], track2);
memory2.onmouseup = (e) => handleOnUp(e, track2);
memory2.ontouchend = (e) => handleOnUp(e.touches[0], track2);
memory2.onmousemove = (e) => handleOnMove(e, track2);
memory2.ontouchmove = (e) => handleOnMove(e.touches[0], track2);

// MEMORY 3
memory3.onmousedown = (e) => handleOnDown(e, track3);
memory3.ontouchstart = (e) => handleOnDown(e.touches[0], track3);
memory3.onmouseup = (e) => handleOnUp(e, track3);
memory3.ontouchend = (e) => handleOnUp(e.touches[0], track3);
memory3.onmousemove = (e) => handleOnMove(e, track3);
memory3.ontouchmove = (e) => handleOnMove(e.touches[0], track3);

// MEMORY 4
memory4.onmousedown = (e) => handleOnDown(e, track4);
memory4.ontouchstart = (e) => handleOnDown(e.touches[0], track4);
memory4.onmouseup = (e) => handleOnUp(e, track4);
memory4.ontouchend = (e) => handleOnUp(e.touches[0], track4);
memory4.onmousemove = (e) => handleOnMove(e, track4);
memory4.ontouchmove = (e) => handleOnMove(e.touches[0], track4);
