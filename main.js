// START countdown
const S = 1000 * 60;
const H = S * 60;
const D = H * 24;

const daysContainer = document.getElementById("countdown-days");
const hoursContainer = document.getElementById("countdown-hours");
const minutesContainer = document.getElementById("countdown-minutes");
const secondsContainer = document.getElementById("countdown-seconds");

const startCounter = setInterval(() => {
  const today = new Date();
  const targetYear = 1900 + today.getYear() + 1;
  const targetDate = new Date(`January 1, ${targetYear} 00:00:00`).getTime();
  const now = today.getTime();
  const timeLeft = targetDate - now;
  const days = Math.floor(timeLeft / D);
  const hours = Math.floor((timeLeft % D) / H);
  const minutes = Math.floor((timeLeft % H) / S);
  const seconds = Math.floor((timeLeft % S) / 1000);
  daysContainer.textContent = `${days}d`;
  hoursContainer.textContent = `${hours}h`;
  minutesContainer.textContent = `${minutes}m`;
  secondsContainer.textContent = `${seconds}s`;

  if (days <= 0) {
    daysContainer.style.display = "none";
    if (hours <= 0) {
      hoursContainer.style.display = "none";
      if (minutes <= 0) {
        minutesContainer.style.display = "none";
      }
    }
  } else if (days >= 360) {
    daysContainer.style.display = "block";
    hoursContainer.style.display = "block";
    minutesContainer.style.display = "block";
  }
}, 1000);

window.onload = function (e) {
  startCounter();
};
// END countdown

// START snowfall
const createSnowflake = (winterWrapper, count, prefix = "") => {
  for (let i = 1; i <= count; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = `snowflake ${prefix} ${prefix}-${i}`;
    winterWrapper.appendChild(snowflake);
  }
};
// END snowfall

// START fireworks
const startFireworks = ({ clientX, clientY }) => {
  const candyCount = 150; // Number of candies per firework
  const candies = [];
  const colors = [
    "#ADD8E6",
    "#B2F2BB",
    "#FFFACD",
    "#FFE4E1",
    "#FFB6C1",
    "#D8BFD8"
  ];

  for (let i = 0; i < candyCount; i++) {
    const candy = document.createElement("div");
    candy.classList.add("candy");

    // Set random color from the palette
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    candy.style.background = randomColor;

    // Set random size for the candy
    const size = Math.random() * 10 + 10; // Random size between 10px and 20px
    candy.style.width = `${size}px`;
    candy.style.height = `${size}px`;

    // Set random direction for the candy
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 10; // Random distance
    const x = Math.cos(angle) * distance + "vw";
    const y = Math.sin(angle) * distance + "vw";
    candy.style.setProperty("--x", x);
    candy.style.setProperty("--y", y);

    // Set the initial position to the click position
    candy.style.left = `${clientX - 10}px`;
    candy.style.top = `${clientY - 10}px`;

    // Add the candy to the body
    document.body.appendChild(candy);
    candies.push(candy);
  }

  // Remove candies after the animation ends
  setTimeout(() => {
    candies.forEach((candy) => candy.remove());
  }, 1250);
};
// START fireworks

window.onload = function (e) {
  const winterWrapper = document.getElementById("winter-wrapper");
  const wrapConfig = [
    { className: "_sm", spanCount: 250 },
    { className: "_md", spanCount: 50 },
    { className: "_lg", spanCount: 50 }
  ];
  wrapConfig.map(({ className, spanCount }) =>
    createSnowflake(winterWrapper, spanCount, className)
  );

  const autoFireworksInterval = setInterval(() => {
    startFireworks({
      clientX:
        Math.random() * (window.innerWidth * 0.75 - window.innerWidth * 0.25) +
        window.innerWidth * 0.25,
      clientY:
        Math.random() * (window.innerHeight * 0.6 - window.innerHeight * 0.25) +
        window.innerHeight * 0.25
    });
  }, 1250);

  winterWrapper.addEventListener("click", (event) => {
    startFireworks(event);
    // clearInterval(autoFireworksInterval);
  });

  const dialog = document.getElementById("mail");
  const showButton = document.getElementById("mailbox");
  const closeButton = document.getElementById("mailClose");
  const mailContent = document.getElementById("mailContent");
  const mailSign = document.getElementById("mailSign");

  const greetings = [
    "Merry Christmas and a Happy New Year! May your days be filled with joy, laughter, and the warmth of loved ones. Don’t forget to leave me some cookies and milk—Santa needs his fuel for all that gift delivering! Stay jolly and bright!",
    "Greetings from the North Pole! I’ve checked my list twice, and you’re on the “Nice” list (of course!). May your Christmas sparkle like Rudolph’s nose and your New Year be as magical as a sleigh ride under the stars. Wishing you stockings full of surprises and hearts full of happiness.",
    "The elves and I are wrapping up the year with one wish for you: a holiday season filled with love, laughter, and lots of snowflakes! Remember, the magic of Christmas isn’t just in the presents, but in the smiles we share. Wishing you a New Year as wonderful as a fresh batch of cookies!",
    "Ready your sleigh, dear friend—it’s time to dash into a holiday season filled with wonder and adventure! May your Christmas be merry, your New Year be bright, and your heart be full of magic. Remember, wherever you go, the spirit of the season follows.",
    "Happy Christmas and a joyful New Year to you! Let this season remind you of all the good in the world—the laughter of children, the kindness of strangers, and the hope in every heart. And don’t forget, the greatest gifts aren’t under the tree—they’re the memories we make together.",
    "Jingle bells, jingle bells, you’re on my way! The reindeer and I are gearing up for a magical night, and I’ve got some goodies with your name on them. May your Christmas be sweet as candy canes and your New Year full of sparkle. Don’t forget to save me a cookie or two!"
  ];

  const signs = [
    "With love,",
    "Yours merrily,",
    "Warmest hugs,",
    "Off to the next chimney,",
    "Stay magical,",
    "Happily yours,"
  ];

  // "Show the dialog" button opens the dialog modally
  showButton.addEventListener("click", () => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    mailContent.textContent = randomGreeting;
    mailSign.textContent = randomSign;
    dialog.showModal();
  });

  // "Close" button closes the dialog
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
};
