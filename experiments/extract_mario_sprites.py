"""
extract_mario_sprites.py
========================
Extracts mario-idle.png, mario-jump.png, and mario-walk.gif
from the NES Super Mario Bros sprite sheet.

USAGE:
  1. Install Pillow:
       pip install Pillow

  2. Put this script in the SAME folder as your sprite sheet PNG.
     Default expected filename:
       NES_-_Super_Mario_Bros__-_Playable_Characters_-_Mario___Luigi.png

  3. Run:
       python extract_mario_sprites.py

  4. Output files appear in:  output_sprites/
       mario-idle.png
       mario-jump.png
       mario-walk.gif

  5. Copy those 3 files into your project:  public/sprites/
"""

import os
import sys
import math

try:
    from PIL import Image
except ImportError:
    print("❌  Pillow not installed. Run:  pip install Pillow")
    sys.exit(1)


# ──────────────────────────────────────────────
#  CONFIG — change these if you use a different
#  sprite sheet or want different output sizes
# ──────────────────────────────────────────────

SPRITE_SHEET = "experiments/image.png"

OUTPUT_DIR   = "experiments/output_sprites"

# How much to scale up the tiny 16px sprites
# 4 = 64px output  |  6 = 96px  |  8 = 128px
SCALE = 4

# GIF animation speed in milliseconds per frame
GIF_FRAME_MS = 160

# ──────────────────────────────────────────────
#  SPRITE CROP COORDINATES (x0, x1)
#  Row Y range: y0=28, y1=67  (Big Mario row)
#  These were measured from the standard sheet.
#  If your sheet differs, adjust these values.
# ──────────────────────────────────────────────

Y0 = 28   # top of Big Mario row
Y1 = 67   # bottom of Big Mario row

# (x_start, x_end) for each pose
CROPS = {
    "idle":  (0,   16),   # standing still
    "walk1": (17,  35),   # walk — left foot forward
    "walk2": (96,  112),  # walk — right foot forward
    "walk3": (136, 152),  # walk — stride complete
    "jump":  (75,  91),   # jumping (arms out)
}

# Background colour of the sprite sheet (dark blue)
BG_COLOUR  = (0, 42, 139)
BG_TOLERANCE = 30   # colour-distance threshold for "is background?"


# ──────────────────────────────────────────────
#  HELPERS
# ──────────────────────────────────────────────

def colour_distance(c1, c2):
    """Euclidean distance between two RGB colours."""
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])))


def is_background(pixel):
    return colour_distance(pixel, BG_COLOUR) < BG_TOLERANCE


def cut_sprite(img, x0, x1, y0=Y0, y1=Y1, scale=SCALE):
    """
    Crop a sprite from the sheet, make the background
    transparent, and scale up with pixel-perfect nearest-neighbour.
    Returns an RGBA Image.
    """
    crop   = img.crop((x0, y0, x1, y1))
    result = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    src_px = crop.load()
    dst_px = result.load()

    for y in range(crop.height):
        for x in range(crop.width):
            pixel = src_px[x, y]
            if is_background(pixel):
                dst_px[x, y] = (0, 0, 0, 0)        # transparent
            else:
                r, g, b, *_ = pixel
                dst_px[x, y] = (r, g, b, 255)       # opaque

    # Scale up pixel-perfectly
    new_w = result.width  * scale
    new_h = result.height * scale
    return result.resize((new_w, new_h), Image.NEAREST)


def rgba_to_rgb_white(rgba_img):
    """Composite RGBA onto white — needed for GIF (no full alpha in GIF)."""
    bg = Image.new("RGBA", rgba_img.size, (255, 255, 255, 255))
    return Image.alpha_composite(bg, rgba_img).convert("RGB")


# ──────────────────────────────────────────────
#  MAIN
# ──────────────────────────────────────────────

def main():
    # ── Load sheet ──
    if not os.path.exists(SPRITE_SHEET):
        print(f"❌  Sprite sheet not found: '{SPRITE_SHEET}'")
        print("    Make sure this script is in the same folder as the PNG.")
        sys.exit(1)

    print(f"📄  Loading: {SPRITE_SHEET}")
    sheet = Image.open(SPRITE_SHEET).convert("RGBA")
    print(f"    Sheet size: {sheet.size[0]}x{sheet.size[1]}")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # ── Cut all poses ──
    print("\n✂️   Cutting sprites...")
    cut = {name: cut_sprite(sheet, x0, x1) for name, (x0, x1) in CROPS.items()}
    for name, frame in cut.items():
        print(f"    {name:8s}  {frame.size[0]}x{frame.size[1]} px")

    # ── mario-idle.png ──
    idle_path = os.path.join(OUTPUT_DIR, "mario-idle.png")
    cut["idle"].save(idle_path)
    print(f"\n✅  mario-idle.png  →  {idle_path}")

    # ── mario-jump.png ──
    jump_path = os.path.join(OUTPUT_DIR, "mario-jump.png")
    cut["jump"].save(jump_path)
    print(f"✅  mario-jump.png  →  {jump_path}")

    # ── mario-walk.gif  (4-frame loop) ──
    walk_frames_rgba = [
        cut["walk1"],
        cut["idle"],
        cut["walk2"],
        cut["walk3"],
    ]

    # Convert to RGB (white BG) for GIF compatibility
    walk_frames_rgb = [rgba_to_rgb_white(f) for f in walk_frames_rgba]

    gif_path = os.path.join(OUTPUT_DIR, "mario-walk.gif")
    walk_frames_rgb[0].save(
        gif_path,
        save_all       = True,
        append_images  = walk_frames_rgb[1:],
        duration       = GIF_FRAME_MS,
        loop           = 0,
        optimize       = True,
    )
    print(f"✅  mario-walk.gif  →  {gif_path}  ({len(walk_frames_rgb)} frames @ {GIF_FRAME_MS}ms)")

    # ── Preview strip ──
    preview_order  = ["idle", "walk1", "walk2", "walk3", "jump"]
    preview_frames = [cut[k] for k in preview_order]
    pad   = 12
    max_h = max(f.height for f in preview_frames)
    total_w = sum(f.width + pad for f in preview_frames) + pad
    preview = Image.new("RGBA", (total_w, max_h + pad * 2), (40, 40, 40, 255))
    x_off = pad
    for frame in preview_frames:
        preview.paste(frame, (x_off, pad), mask=frame)
        x_off += frame.width + pad
    preview_path = os.path.join(OUTPUT_DIR, "preview_all.png")
    preview.save(preview_path)
    print(f"✅  preview_all.png →  {preview_path}")

    # ── Summary ──
    print("\n" + "─" * 48)
    print(f"📁  Output folder:  {os.path.abspath(OUTPUT_DIR)}/")
    print("─" * 48)
    for fn in sorted(os.listdir(OUTPUT_DIR)):
        size = os.path.getsize(os.path.join(OUTPUT_DIR, fn))
        print(f"   {fn:<28}  {size:>7,} bytes")

    print("\n🍄  Done!  Copy these 3 files to your project:")
    print("       mario-idle.png  →  public/sprites/mario-idle.png")
    print("       mario-jump.png  →  public/sprites/mario-jump.png")
    print("       mario-walk.gif  →  public/sprites/mario-walk.gif")


if __name__ == "__main__":
    main()