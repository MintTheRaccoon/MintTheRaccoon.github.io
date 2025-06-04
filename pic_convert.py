from PIL import Image
import os

image_folder = "assets/vrchat"
supported_extensions = (".png", ".jpeg", ".jpg", ".webp")

for filename in os.listdir(image_folder):
    if not filename.lower().endswith(supported_extensions):
        continue

    filepath = os.path.join(image_folder, filename)
    if filename.lower().endswith(".jpg"):
        continue

    try:
        with Image.open(filepath) as img:
            if img.format == "JPEG":
                continue

            width, height = img.size
            new_size = (int(width * 0.7), int(height * 0.7))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

            new_filename = os.path.splitext(filename)[0] + ".jpg"
            new_filepath = os.path.join(image_folder, new_filename)
            img.convert("RGB").save(new_filepath, "JPEG", quality=85)

    except Exception as e:
        print(f"-----Skipped {filename} due to error: {e}")

    print(f"Converted {filename} to {new_filename}")

    try:
        os.remove(filepath)
    except Exception as e:
        print(f"Failed to delete {filename}: {e}")

    print(f"Deleted {filename}")

print("Conversion complete!")
input()
exit(0)