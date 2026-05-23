from PIL import Image
import collections

img = Image.open('logo.jpeg')
img = img.convert('RGB')
img = img.resize((150, 150))
colors = img.getcolors(150*150)
colors = sorted(colors, key=lambda x: x[0], reverse=True)

# Print top 5 colors
print("Top colors:")
for i in range(min(5, len(colors))):
    print(f"Count: {colors[i][0]} RGB: {colors[i][1]}")
