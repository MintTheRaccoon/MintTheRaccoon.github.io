from PIL import Image, ImageDraw, ImageFont
import os

Folder = r"assets\vrchat"
MaxWidth = 1920
MaxHeight = 1080
Quality = 82

PngFiles = [
	File for File in os.listdir(Folder)
	if File.lower().endswith(".png")
]

PngFiles.sort(key=lambda File: os.path.getmtime(os.path.join(Folder, File)))

ExistingNumbers = []

for File in os.listdir(Folder):
	if File.lower().endswith(".webp"):
		try:
			Number = int(os.path.splitext(File)[0].split()[-1])
			ExistingNumbers.append(Number)
		except ValueError:
			pass

NextNumber = max(ExistingNumbers, default=0) + 1

FontPath = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts\EduTASBeginner-VariableFont_wght.ttf")
Font = ImageFont.truetype(FontPath, 18)

for File in PngFiles:
	InputPath = os.path.join(Folder, File)
	OutputPath = os.path.join(Folder, f"vrchat {NextNumber}.webp")

	ImageObject = Image.open(InputPath).convert("RGB")
	ImageObject.thumbnail(
		(MaxWidth, MaxHeight),
		Image.Resampling.LANCZOS
	)

	Draw = ImageDraw.Draw(ImageObject)
	Text = "@MintDraccoon"

	BoundingBox = Draw.textbbox((0, 0), Text, font=Font)
	TextWidth = BoundingBox[2] - BoundingBox[0]
	TextHeight = BoundingBox[3] - BoundingBox[1]

	Margin = 12
	X = ImageObject.width - TextWidth - Margin
	Y = ImageObject.height - TextHeight - Margin

	Draw.text(
		(X, Y),
		Text,
		font=Font,
		fill=(173, 235, 179)
	)

	ImageObject.save(
		OutputPath,
		"WEBP",
		quality=Quality,
		method=6
	)

	print(f"{File} -> vrchat {NextNumber}.webp")

	NextNumber += 1

print("Done!")
