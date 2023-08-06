const BACK_COLOR = "#333";
const STICK_COLOR = "#faf0e6";

class Rectangle {
  constructor(x, y, w, h, context, color) {
    context.fillRect(x, y, w, h);
  }
}

class App {
  constructor() {
    this.tl = gsap.timeline();
    this.opening = new Tone.Player("./can.mp3").toDestination();
    this.empty = new Tone.Player("./empty.mp3").toDestination();
    this.played = false;
    this.clicked = false;

    this.g = document.querySelector(".group");
    this.svg = document.querySelector("svg");
    this.top = document.querySelector(".top");
    this.war = document.querySelector(".war");

    this.svg.addEventListener("pointerdown", async () => {
      if (!this.clicked) {
        this.clicked = true;
        this.empty.start();
        this.tl.to(this.g, { rotate: 5, duration: 0.2 });
        this.tl.to(this.g, { rotate: -5, duration: 0.2 });
        this.tl.to(this.g, { rotate: 2, duration: 0.2 });
        await this.tl.to(this.g, { rotate: -2, duration: 0.2 });
        if (!this.played) this.opening.start();
        this.tl.to(this.g, { rotate: 0, duration: 0.2 });
        this.tl.to(this.g, { rotate: 0, duration: 0.2 });

        this.tl.to(this.top, {
          rotate: -45,
          transformOrigin: "10% 50%",
          duration: 1,
          ease: "circ.inOut",
        });
        await this.tl.to(
          this.war,
          {
            y: -350,
            duration: 1,
            ease: "circ.inOut",
          },
          "<"
        );

        this.played = true;
        this.clicked = false;
      }
    });
  }
}

new App();
