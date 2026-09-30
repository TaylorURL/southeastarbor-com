#!/bin/sh
# Cuts every original .jpg in a directory into the three WebP widths the site
# serves. The originals are not kept in the repository: the published files are
# what the site needs, and git history holds the JPEGs they were first cut from.
# Each width is held under a byte ceiling, because a detailed canopy at a fixed
# quality comes out three times the size of a clear sky.
#
#     sh scripts/photos.sh <directory of originals>
#     (needs sips and cwebp; macOS ships the first)
set -e
source=$(cd "${1:?name the directory holding the original photographs}" && pwd)
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
for original in "$source"/*.jpg; do
  name=$(basename "$original" .jpg)
  width=$(sips -g pixelWidth "$original" | awk '/pixel/{print $2}')
  for target in 640 1080 1600; do
    case $target in 640) cap=60000 ;; 1080) cap=120000 ;; 1600) cap=190000 ;; esac
    w=$target; [ "$w" -gt "$width" ] && w=$width
    sips --resampleWidth "$w" "$original" --out "$tmp/$name.jpg" >/dev/null
    out="public/photos/$name-$target.webp"
    cwebp -quiet -q 70 -m 6 -sharp_yuv "$tmp/$name.jpg" -o "$out"
    if [ "$(stat -f%z "$out")" -gt "$cap" ]; then
      cwebp -quiet -m 6 -sharp_yuv -size "$cap" -pass 6 "$tmp/$name.jpg" -o "$out"
    fi
  done
done
rm -rf "$tmp"
