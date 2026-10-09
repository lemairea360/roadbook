#!/usr/bin/env python3
"""Génère les icônes PWA (icon-512.png, apple-touch-icon.png 180x180).

Stdlib uniquement (zlib + struct) : fond vermillon #c43d2f, glyphe « 日 »
dessiné en blanc cassé (#f6f4ef) — un rectangle à bords épais + barre centrale.

Usage : python3 gen_icons.py  (depuis le dossier compagnon/)
"""
import os
import struct
import zlib

BG = (196, 61, 47)    # #c43d2f vermillon
FG = (246, 244, 239)  # #f6f4ef blanc cassé


def make_icon(size):
    # Boîte du glyphe 日 : centrée, ~44 % de large, ~58 % de haut
    gw, gh = size * 0.44, size * 0.58
    left, top = (size - gw) / 2, (size - gh) / 2
    right, bottom = left + gw, top + gh
    stroke = size * 0.075
    cy = size / 2

    rows = []
    for y in range(size):
        row = bytearray([0])  # filtre PNG 0 (None)
        for x in range(size):
            inside = left <= x <= right and top <= y <= bottom
            border = inside and (
                x < left + stroke or x > right - stroke or
                y < top + stroke or y > bottom - stroke
            )
            midbar = inside and abs(y - cy) < stroke / 2
            row += bytes(FG if (border or midbar) else BG)
        rows.append(bytes(row))
    return b"".join(rows)


def chunk(tag, data):
    return (struct.pack(">I", len(data)) + tag + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))


def write_png(path, size):
    raw = make_icon(size)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)  # RGB 8 bits
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(raw, 9))
           + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    print(f"OK {path} ({size}x{size}, {len(png)} octets)")


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    write_png(os.path.join(here, "icon-512.png"), 512)
    write_png(os.path.join(here, "apple-touch-icon.png"), 180)
