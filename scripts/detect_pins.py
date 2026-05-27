"""Detect all baked clay markers globally, then assign facility numbers by
optimal (Hungarian) matching to the approximate layout — robust to the large
vertical drift between the CSS coords and the image."""
from PIL import Image
import numpy as np
from scipy import ndimage
from scipy.optimize import linear_sum_assignment

im = Image.open("public/images/facilities-plan.png").convert("RGB")
W, H = im.size
a = np.asarray(im).astype(int)
R, G, B = a[..., 0], a[..., 1], a[..., 2]

target = np.array([167, 106, 78])
dist = np.sqrt(((a - target) ** 2).sum(axis=2))
mask = (dist < 46) & (R > G) & (G > B) & (G - B > 3) & (R - B > 30)
mask = ndimage.binary_closing(mask, iterations=3)  # fill white-digit hole

lbl, n = ndimage.label(mask)
cents = []
for i in range(1, n + 1):
    ys, xs = np.where(lbl == i)
    area = len(xs)
    w, h = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
    if area < 230 or not (18 <= w <= 44 and 18 <= h <= 44):
        continue
    if not (0.6 <= w / h <= 1.7) or area / (w * h) < 0.5:
        continue
    cents.append((xs.mean() / W * 100, ys.mean() / H * 100))
print(f"// markers detected: {len(cents)}")

APPROX = [
    (1,24,29),(2,32.5,23),(3,21.5,36),(4,26,39),(5,15,47),(6,22,47),(7,20,24),
    (8,30.5,16),(9,39,22),(10,32.5,40),(11,75,37),(12,65,33),(13,82,44),(14,71,29),
    (15,81,31),(16,89,37),(17,93.5,38.5),(18,85,51),(19,50,64),(20,52,74),
    (21,59.5,68),(21,40,68),(22,93.5,50),(22,8.5,50),(23,92,67),(23,6,67),
    (24,86,74),(24,14,74),(25,21,74),(26,28.5,74),(27,28.5,65),(28,50,32),
    (29,78,74),(30,70,65),(31,72,74),(32,4.5,53),
]

# Cost = distance between each approx and each detected centre.
C = np.zeros((len(APPROX), len(cents)))
for i, (_, lx, ty) in enumerate(APPROX):
    for j, (cx, cy) in enumerate(cents):
        C[i, j] = ((cx - lx) ** 2 + (cy - ty) ** 2) ** 0.5
ri, cj = linear_sum_assignment(C)

assigned = {}
for i, j in zip(ri, cj):
    if C[i, j] < 16:  # reject implausible matches
        assigned[i] = cents[j]

out = []
for i, (num, lx, ty) in enumerate(APPROX):
    if i in assigned:
        cx, cy = assigned[i]
        out.append((num, round(cx, 2), round(cy, 2)))
    else:
        out.append((num, lx, ty))
print(f"// assigned {len(assigned)}/{len(APPROX)} (rest = approx)")
for num, lx, ty in out:
    print(f'  {{ n: {num}, top: "{ty}%", left: "{lx}%" }},')
