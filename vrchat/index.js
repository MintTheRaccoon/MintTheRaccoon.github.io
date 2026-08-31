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

loadComponent("../loader.html", "loader-container")
	.catch((error) => {
		console.error("Could not load site loader", error);
		document.getElementById("loader-container")?.remove();
	});
loadComponent("../header.html", "header", { content: { ".header-text": "Look at my Cool VRchat pictures hehe!" } }).catch(console.error);
loadComponent("../footer.html", "footer").catch(console.error);


// Image Popup Tag
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".enlargeable").forEach((img) => {
	img.style.cursor = "url(../assets/pointer.png), pointer";

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


// Gallery
const Gallery = document.getElementById("gallery");
const MaxImage = 139;
const ImagePath = "../assets/vrchat/vrchat NUMBER.webp";

for (let ImageNumber = MaxImage; ImageNumber >= 1; ImageNumber--) {
	const Item = document.createElement("div");
	const Loader = document.createElement("div");
	const Water = document.createElement("div");
	const ImageElement = document.createElement("img");

	Item.className = "gallery-item";
	Loader.className = "gallery-loader";
	Water.className = "gallery-water";
	ImageElement.className = "enlargeable";
	ImageElement.alt = `VRChat image ${ImageNumber}`;

	Loader.appendChild(Water);
	Item.append(Loader, ImageElement);
	Gallery.appendChild(Item);
}

async function LoadImage(Item, ImageNumber, Index) {
	const Loader = Item.querySelector(".gallery-loader");
	const Water = Item.querySelector(".gallery-water");
	const ImageElement = Item.querySelector("img");

	try {
		const Response = await fetch(ImagePath.replace("NUMBER", ImageNumber));

		if (!Response.ok) {
			throw new Error(`Failed to load image ${ImageNumber}`);
		}

		const Total = parseInt(Response.headers.get("content-length")) || 0;
		const Reader = Response.body.getReader();
		const Chunks = [];
		let Loaded = 0;

		while (true) {
			const { done, value } = await Reader.read();

			if (done) break;

			Chunks.push(value);
			Loaded += value.length;

			if (Total) {
				Water.style.setProperty("--progress", `${Loaded / Total * 100}%`);
			}
		}

		const ImageData = new Blob(Chunks);
		ImageElement.src = URL.createObjectURL(ImageData);

		await ImageElement.decode();

		Water.style.setProperty("--progress", "100%");

		const Delay = Math.max(30, 300 * Math.pow(0.95, Index));
		await new Promise(Resolve => setTimeout(Resolve, Delay));

		Item.classList.add("loaded");
	} catch (Error) {
		console.error(`Image ${ImageNumber} failed:`, Error);
		Loader.remove();
	}
}

async function LoadImages() {
	for (let Index = 0; Index < Gallery.children.length; Index++) {
		await LoadImage(Gallery.children[Index], MaxImage - Index, Index);
	}
}

LoadImages();
