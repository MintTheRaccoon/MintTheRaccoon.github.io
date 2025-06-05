function dismissWarning() {
	document.getElementById("mobileWarning").style.display = "none";
	localStorage.setItem("mobileWarningDismissed", "true");
}

window.addEventListener("DOMContentLoaded", () => {
const dismissed = localStorage.getItem("mobileWarningDismissed") === "true";
const isMobile = window.innerWidth <= 768;

if (!dismissed && isMobile) {
	document.getElementById("mobileWarning").style.display = "flex";
}
});





const emoji1 = document.querySelector(".emoji1");
const emoji2 = document.querySelector(".emoji2");
const title = document.querySelector(".hover-title.rainbow-hover");
const pfpImg = document.querySelector(".about-box img");

emoji1.addEventListener("click", () => {
	pfpImg.src = "assets/fototeta.png";
	pfpImg.classList.remove("rainbow-hue");
});

title.addEventListener("click", () => {
	pfpImg.classList.add("rainbow-hue");
});

emoji2.addEventListener("click", () => {
	pfpImg.src = "assets/pfp.png";
	pfpImg.classList.remove("rainbow-hue");
});





const facts = [
	"Raccoons can rotate their hind feet 180° for climbing down trees headfirst.",
	"They have incredibly sensitive front paws that can detect textures underwater.",
	"A group of raccoons is called a 'nursery' or a 'snooze', not a 'gaze'.",
	"Raccoons can remember solutions to tasks for at least 3 years!",
	"Their Latin name 'Procyon lotor' means 'before the dog, the washer'.",
	"Urban raccoons have learned to open doors, jars and even latches.",
	"They can make over 50 different vocal sounds.",
	"Raccoons are known to wash their food — but not always!",
	"Baby raccoons are called kits.",
	"Raccoons have an excellent sense of touch — more than sight or hearing!",
	"They have 5 fingers, and their dexterity rivals monkeys!",
	"Raccoons were sent into space as test animals in early experiments.",
	"In Japan, raccoons became popular pets after a cartoon in the 1970s!",
	"They can climb brick walls and even enter attics if hungry enough.",
	"Their masks help reduce glare and enhance night vision.",
	"Despite being solitary, raccoons sometimes share dens in winter.",
	"Raccoons have a specialized 'thumb' on their paws, aiding in fine manipulation.",
	"Raccoons are omnivores and will eat almost anything — from fruits to small animals.",
	"Raccoons are excellent swimmers and can cross rivers or lakes if necessary.",
	"The dark markings on their faces may help with non-verbal communication with other raccoons."
];

const today = new Date();
const index = today.getDate() % facts.length;
document.getElementById("raccoonFact").textContent = facts[index];





function getRandomRaccoonImagePath() {
	const totalImages = 64;
	const randomIndex = Math.floor(Math.random() * totalImages) + 1;
	const filename = `raccoon (${randomIndex}).jpg`;
	const encodedFilename = encodeURIComponent(filename);
	return `assets/raccoon_images/${encodedFilename}`;
}

function nextArt() {
const newImage = getRandomRaccoonImagePath();
document.getElementById('artImage').src = newImage;
}

window.addEventListener("DOMContentLoaded", () => {
nextArt();
});





fetch("https://api.ipify.org?format=json")
.then(res => res.json())
.then(data => {
	document.getElementById("ip").textContent = data.ip;
})
.catch(() => {
	document.getElementById("ip").textContent = "Failed to get IP 😢";
});





document.querySelectorAll("#open-privacy, #open-disclaimer, #open-impressum").forEach(link => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		const targetId = "modal-" + link.id.split("-")[1];
		document.getElementById(targetId).style.display = "flex";
	});
});

document.querySelectorAll(".close").forEach(btn => {
	btn.addEventListener("click", () => {
		const targetId = btn.getAttribute("data-close");
		document.getElementById(targetId).style.display = "none";
	});
});

window.addEventListener("click", (e) => {
	document.querySelectorAll(".modal").forEach(modal => {
		if (e.target === modal) {
			modal.style.display = "none";
		}
	});
});





window.addEventListener("load", () => {
	const loader = document.getElementById("loader");
	loader.style.display = "none";
});





window.addEventListener("load", () => {
	anime({
	targets: ".intro-text",
	opacity: [0, 1],
	scale: [0.8, 1],
	easing: "easeOutExpo",
	duration: 600,
	delay: 100,
	complete: () => {
		setTimeout(() => {
		anime({
			targets: "#intro",
			opacity: [1, 0],
			easing: "easeInOutQuad",
			duration: 500,
			complete: () => {
			document.getElementById("intro").style.display = "none";
			document.getElementById("mainContent").style.display = "block";
			}
		});
		}, 200);
	}
	});
});





document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".enlargeable").forEach((img) => {
	img.style.cursor = "url(https://cdn.custom-cursor.com/db/22389/32/animals-silly-racoons-pointer.png), pointer";

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