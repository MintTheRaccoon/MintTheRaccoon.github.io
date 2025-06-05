from PIL import Image, ImageDraw, ImageFont
import os
import re
import shutil
import matplotlib.font_manager as fm

image_folder = "assets/vrchat"
deleted_folder = "assets/deleted"
supported_extensions = (".png", ".jpeg", ".jpg", ".webp")
pattern = re.compile(r"vrchat \((\d+)\)\.jpg$", re.IGNORECASE)
max_num = 0

for font in fm.findSystemFonts(fontpaths=None, fontext="ttf"):
    if "Monocraft" in font:
        print(font)

def add_watermark(image):
	draw = ImageDraw.Draw(image)
	text = "@MintTheRaccoon"
	mint_green = (173, 235, 179)
	font_path = r"C:\Users\Abdul\AppData\Local\Microsoft\Windows\Fonts\Monocraft.ttc"
	fontsize = 20
	
	
	try:
		font = ImageFont.truetype(font_path, fontsize)
	except IOError:
		font = ImageFont.load_default()
		print(f"Font not found. Using default font on {image}")

	bbox = draw.textbbox((0, 0), text, font=font)
	textwidth = bbox[2] - bbox[0]
	textheight = bbox[3] - bbox[1]
	x = image.width - textwidth - 5
	y = image.height - textheight - 5
	draw.text((x, y), text, font=font, fill=mint_green)
	return image



if not os.path.exists(deleted_folder):
	os.makedirs(deleted_folder)

for filename in os.listdir(image_folder):
	match = pattern.match(filename)
	if match:
		num = int(match.group(1))
		if num > max_num:
			max_num = num

for filename in os.listdir(image_folder):
	if not filename.lower().endswith(supported_extensions):
		continue

	filepath = os.path.join(image_folder, filename)

	if pattern.match(filename):
		continue

	if filename.lower().endswith(".jpg"):
		pass

	try:
		with Image.open(filepath) as img:
			if img.format == "JPEG":
				img = img.convert("RGB")
			else:
				width, height = img.size
				new_size = (int(width * 0.7), int(height * 0.7))
				img = img.resize(new_size, Image.Resampling.LANCZOS).convert("RGB")

			img = add_watermark(img)

			new_filename = os.path.splitext(filename)[0] + ".jpg"
			new_filepath = os.path.join(image_folder, new_filename)
			img.save(new_filepath, "JPEG", quality=85)

			shutil.move(filepath, os.path.join(deleted_folder, filename))

			filepath = new_filepath

		max_num += 1
		new_final_name = f"vrchat ({max_num}).jpg"
		new_final_path = os.path.join(image_folder, new_final_name)

		os.rename(filepath, new_final_path)
		print(f"Renamed {os.path.basename(filepath)} -> {new_final_name}")

	except Exception as e:
		print(f"-----Skipped {filename} due to error: {e}")

print("Conversion complete!")
input()
exit(0)