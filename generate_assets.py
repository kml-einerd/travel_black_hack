import os

# Define assets with their colors and text
assets = [
    # Credit Cards
    {"name": "chase-sapphire.svg", "color": "#005596", "text": "Chase Sapphire"},
    {"name": "amex-gold.svg", "color": "#D4AF37", "text": "Amex Gold"},
    {"name": "chase-ink.svg", "color": "#004B8D", "text": "Chase Ink"},

    # News / Deals
    {"name": "avianca-tail.svg", "color": "#E3001B", "text": "Avianca LifeMiles"},
    {"name": "ana-cabin.svg", "color": "#122046", "text": "ANA First Class"},
    {"name": "bali-landscape.svg", "color": "#00994C", "text": "Bali Landscape"},

    # Books
    {"name": "book-foundations.svg", "color": "#4F46E5", "text": "Foundations Guide"},
]

def create_svg(filename, color, text):
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
  <rect width="100%" height="100%" fill="{color}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="white" font-weight="bold">{text}</text>
  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="20"/>
</svg>'''

    path = os.path.join("Projeto/demos/images", filename)
    with open(path, "w") as f:
        f.write(svg_content)
    print(f"Created {path}")

def run():
    for asset in assets:
        create_svg(asset["name"], asset["color"], asset["text"])

if __name__ == "__main__":
    run()
