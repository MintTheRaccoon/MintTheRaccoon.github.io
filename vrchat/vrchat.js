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
	duration: 1000,
	delay: 300,
	complete: () => {
		setTimeout(() => {
		anime({
			targets: "#intro",
			opacity: [1, 0],
			easing: "easeInOutQuad",
			duration: 800,
			complete: () => {
			document.getElementById("intro").style.display = "none";
			document.getElementById("mainContent").style.display = "block";
			}
		});
		}, 500);
	}
	});
});





const imageCount = 104;
const imageFolder = "../assets/vrchat/";
const imagePrefix = "vrchat (";
const imageExtension = ".jpg";
const gallery = document.getElementById("gallery");

let loadedImages = 0;
const imagesPerLoad = 8;

function loadImages() {
  if (loadedImages >= imageCount) return;

  const fragment = document.createDocumentFragment();

  for (let i = loadedImages + 1; i <= Math.min(loadedImages + imagesPerLoad, imageCount); i++) {
    const img = document.createElement("img");
    img.src = `${imageFolder}${imagePrefix}${i})${imageExtension}`;
    img.alt = "VRChat Screenshot";
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.borderRadius = "12px";
    fragment.appendChild(img);
  }

  gallery.appendChild(fragment);
  loadedImages += imagesPerLoad;
}

loadImages();


window.addEventListener('scroll', () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
  if (nearBottom) {
    loadImages();
  }
});





const lightbox = document.createElement("div");
lightbox.classList.add("lightbox", "hidden");
document.body.appendChild(lightbox);

const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);

lightbox.addEventListener("click", () => {
lightbox.classList.add("hidden");
});

gallery.querySelectorAll("img").forEach(img => {
img.addEventListener("click", () => {
	lightboxImg.src = img.src;
	lightbox.classList.remove("hidden");
});
});





document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".enlargeable").forEach((img) => {
	img.style.cursor = "zoom-in";

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
