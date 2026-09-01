async function loadComponent(filePath, targetId, { content = {}, afterLoad } = {}) {
	const response = await fetch(filePath);
	if (!response.ok) throw new Error(`Could not load ${filePath} (${response.status})`);

	const target = document.getElementById(targetId);
	if (!target) throw new Error(`Could not find the component target #${targetId}`);

	target.innerHTML = await response.text();

	target.querySelectorAll("script").forEach((oldScript) => {
		const script = document.createElement("script");
		for (const attribute of oldScript.attributes) {
			script.setAttribute(attribute.name, attribute.value);
		}
		script.textContent = oldScript.textContent;
		oldScript.replaceWith(script);
	});

	for (const [selector, value] of Object.entries(content)) {
		const element = target.querySelector(selector);
		if (!element) throw new Error(`Could not find ${selector} inside ${filePath}`);
		element.textContent = value;
	}

	afterLoad?.(target);
	return target;
}

loadComponent("loader.html", "loader-container")
	.catch((error) => {
		console.error("Could not load site loader", error);
		document.getElementById("loader-container")?.remove();
	});
loadComponent("header.html", "header", { afterLoad: (header) => { setUpHeaderPfpControls(header); } }).catch(console.error);
loadComponent("footer.html", "footer").catch(console.error);


// Box Wobble Toggle
function boxWobbleToggle() {
	const Boxes = document.querySelectorAll(".box");
	const Button = document.querySelector("#box-wobble-toggle button");

	Boxes.forEach(Box => {
		if (Box.style.animation === "none") {
			Box.style.animation = "";
			Button.textContent = "Disable Wobble";
		} else {
			Box.style.animation = "none";
			Button.textContent = "Enable Wobble";
		}
	});
}


// Image Popup Tag
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".enlargeable").forEach((img) => {
	img.style.cursor = "url(assets/pointer.png), pointer";

	img.addEventListener("click", () => {
		const overlay = document.createElement("div");
		overlay.classList.add("img-overlay");

		const bigImg = document.createElement("img");
		bigImg.src = img.src;
		bigImg.alt = img.alt;
		bigImg.classList.add("img-popup");

		overlay.appendChild(bigImg);
		document.body.appendChild(overlay);

		overlay.addEventListener("click", () => {
		overlay.remove();
		});
	});
	});
});


// Konami Code
const KONAMI_CODE = "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a".split(" ");
let konamiIndex = 0;

document.addEventListener("keydown", ({ key }) => {
	konamiIndex = key === KONAMI_CODE[konamiIndex] ? konamiIndex + 1 : key === KONAMI_CODE[0] ? 1 : 0;
	if (konamiIndex === KONAMI_CODE.length) {
		triggerRaccoonWalk();
		konamiIndex = 0;
	}
});

function triggerRaccoonWalk() {
	const container = document.createElement("div");
	const paws = document.createDocumentFragment();

	container.className = "raccoon-paws";
	for (let index = 0; index < 20; index++) {
		const size = 64 + Math.random() * 64;
		const paw = Object.assign(document.createElement("img"), {
			src: "assets/paw.png",
			className: "raccoon-paw"
		});

		paw.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;animation-delay:${index * 0.3}s`;
		paws.appendChild(paw);
	}

	container.appendChild(paws);
	document.body.appendChild(container);
	container.lastElementChild.addEventListener("animationend", () => container.remove(), { once: true });

	const audio = new Audio("assets/audio/Raccoon Trill.mp3");
	audio.volume = 0.3;
	audio.play().catch(() => {});
}


// PFP
function setUpHeaderPfpControls(header) {
	const emoji1 = header.querySelector(".header-emoji1");
	const emoji2 = header.querySelector(".header-emoji2");
	const pfpImg = document.querySelector(".about-box img");

	emoji1.addEventListener("click", () => {
		if (pfpImg.src.includes("pfp.webp")) {
			pfpImg.src = "assets/fototeta.webp";
		} else {
			pfpImg.src = "assets/pfp.webp";
		}
	});

	emoji2.addEventListener("click", () => {
		if (pfpImg.classList.contains("rainbow-hue")) {
			pfpImg.classList.remove("rainbow-hue");
		} else {
			pfpImg.classList.add("rainbow-hue");
		}
	});
}


// Greeting
const text = document.getElementById("greeting-text");
const hour = new Date().getHours();
const greetings = [
	[5, "Why are you still awake, night creature? 💤"],
	[12, "Good morning, sleepy trashpanda! ☕"],
	[18, "Good afternoon, hope you're causing chaos~ ✨"],
	[22, "Good evening, raccoon adventurer! 🌌"],
	[24, "Late again? Grab a snack and chill 🍿"]
];

text.textContent = greetings.find(([limit]) => hour < limit)[1];


// Raccoon Facts
const facts = [
	"Raccoons can rotate their hind feet 180° to climb down trees headfirst.",
	"They have highly sensitive front paws that can detect textures underwater.",
	"A group of raccoons is sometimes called a 'nursery' or a 'gaze'.",
	"Raccoons can remember solutions to tasks for at least 3 years!",
	"Their Latin name 'Procyon lotor' means 'before the dog, the washer'.",
	"Urban raccoons have learned to open doors, jars, and even simple latches.",
	"They can make over 50 different vocal sounds.",
	"Raccoons sometimes 'wash' their food to better feel its texture.",
	"Baby raccoons are called kits.",
	"Raccoons have an excellent sense of touch, often more important than sight or hearing.",
	"They have 5 fingers on each paw and their dexterity rivals some primates.",
	"Raccoons were sent into space as test animals in early experiments.",
	"In Japan, raccoons became popular pets after the 'Araiguma Rasukaru' cartoon in the 1970s.",
	"They can climb brick walls and even enter attics if motivated by hunger.",
	"The dark markings on their faces may help reduce glare and improve night vision.",
	"Despite being mostly solitary, raccoons sometimes share dens in winter.",
	"Raccoons have a specialized 'thumb' on their front paws for fine manipulation.",
	"They are omnivores and will eat almost anything, from fruits to small animals.",
	"Raccoons are excellent swimmers and can cross rivers or lakes if needed.",
	"The word 'raccoon' comes from the Powhatan Native American word 'aroughcun', meaning 'animal that scratches with its hands'.",
	"They can survive falls from heights of over 10 meters thanks to their agility.",
	"Raccoons have been observed using tools in captivity.",
	"Some raccoons have adapted to live entirely in urban areas without entering forests.",
	"They communicate using facial expressions, body posture, and tail position.",
	"During cold winters, raccoons can sleep for weeks without waking, although they do not truly hibernate.",
	"A raccoon's sense of touch improves when its paws are wet.",
	"Raccoons can live up to 20 years in captivity, but typically 5-7 years in the wild.",
	"They are mostly nocturnal, being most active during the night."
];

document.getElementById("raccoonFact").textContent = facts[new Date().getDate() % facts.length];


// Raccoon Image
const imageElement = document.getElementById("image-img");
const imageText = document.querySelector(".image-box-subtext");
const imageLoader = document.getElementById("image-loader");
const nextImageButton = document.querySelector(".image-box .btn");

function getImageInfo(filename) {
	const [, platform = "unknown", id = "—"] = filename.match(/^(.+?)_(.+?)\.[^.]+$/) || [];
	return { platform, id };
}

function nextImg() {
	const filename = raccoonImages[Math.floor(Math.random() * raccoonImages.length)];
	const { platform, id } = getImageInfo(filename);
	const image = new Image();

	imageLoader.style.display = "flex";
	imageElement.style.opacity = "0.3";
	nextImageButton.disabled = true;

	image.onload = () => {
		imageElement.src = image.src;
		imageText.textContent = `Platform: ${platform} — ID: ${id}`;
		imageLoader.style.display = "none";
		imageElement.style.opacity = "1";
		nextImageButton.disabled = false;
	};

	image.onerror = () => {
		imageText.textContent = "Failed to load image. ⚠️";
		imageLoader.style.display = "none";
		imageElement.style.opacity = "1";
		nextImageButton.disabled = false;
	};

	image.src = `assets/raccoon_images/${filename}`;
}

window.addEventListener("DOMContentLoaded", nextImg);


// IP Joke
const ipElement = document.getElementById("ip");

fetch("/api/ip", { cache: "no-store" })
	.then(response => {
		if (!response.ok) throw new Error("Could not get IP");
		return response.json();
	})
	.then(async ({ ip, type }) => {
		if (!ip || !type) {
			throw new Error("No IP available");
		}

		if (type === "ipv4") {
			ipElement.textContent = ip;
			return;
		}

		if (type === "ipv6") {
			try {
				const response = await fetch("https://api4.ipify.org?format=json", {cache: "no-store"});

				if (!response.ok) throw new Error("ipify failed");

				const data = await response.json();

				if (data.ip) {
					ipElement.textContent = data.ip;
					return;
				}
			} catch (error) {
				console.log("Could not get IPv4 from ipify:", error);
			}

			ipElement.textContent = ip;
			return;
		}

		throw new Error("Unknown IP type");
	})
	.catch(() => {
		ipElement.textContent = "No IP available";
	});
