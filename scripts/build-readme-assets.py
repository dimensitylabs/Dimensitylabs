#!/usr/bin/env python3
"""Generate the animated SVG panels used by README.md — light and dark.

Run from the repo root:  python3 scripts/build-readme-assets.py
Output:                  assets/readme/<panel>-<theme>.svg
"""
import itertools
import math
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "readme"
W = 1280

THEMES = {
    "dark": dict(bg="#11120D", surf="#191A14", fg="#FFFBF4", sec="#D8CFBC", muted="#8A8676",
                 line="#2E2F28", faint="#22231C", inv_sec="#565449", inv_line="#D8CFBC"),
    "light": dict(bg="#FFFBF4", surf="#F7F2E8", fg="#11120D", sec="#565449", muted="#8A8676",
                  line="#D8CFBC", faint="#EFE8DA", inv_sec="#D8CFBC", inv_line="#565449"),
}

SERIF = "'Cormorant Garamond',Cormorant,Georgia,'Times New Roman',serif"
SANS = "Syne,'Helvetica Neue',Helvetica,Arial,sans-serif"
MONO = "'JetBrains Mono','SF Mono',SFMono-Regular,Menlo,Consolas,monospace"


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg(h: int, label: str, body: str, css: str = "") -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{h}" viewBox="0 0 {W} {h}" role="img" aria-label="{esc(label)}">
<style>
.serif{{font-family:{SERIF}}}
.sans{{font-family:{SANS}}}
.mono{{font-family:{MONO}}}
{css}
@media (prefers-reduced-motion:reduce){{*{{animation:none!important}}}}
</style>
{body}
</svg>
"""


def mark(c: dict, x: float, y: float, s: float, fg: str, bg: str) -> str:
    return f"""<g transform="translate({x} {y}) scale({s})">
<path fill="{fg}" d="M38 30 H100 A70 70 0 0 1 100 170 H38 Z"/>
<rect x="96" y="30" width="8" height="140" fill="{bg}"/>
<rect x="38" y="96" width="132" height="8" fill="{bg}"/>
<circle cx="68" cy="136" r="18" fill="{bg}"/>
<circle cx="160" cy="168" r="7" fill="{fg}"/>
</g>"""


def header(c: dict, idx: str, label: str, plain: str, italic: str, right: str = "") -> str:
    return f"""<text x="64" y="72" class="mono" font-size="12" letter-spacing="2" fill="{c['muted']}">{idx} / {esc(label)}</text>
<text x="1216" y="72" text-anchor="end" class="mono" font-size="12" letter-spacing="2" fill="{c['muted']}">{esc(right)}</text>
<text x="60" y="142" class="serif" font-size="62" font-weight="300" fill="{c['fg']}">{esc(plain)} <tspan font-style="italic" fill="{c['sec']}">{esc(italic)}</tspan></text>
<line x1="64" y1="170.5" x2="1216" y2="170.5" stroke="{c['line']}"/>"""


# ─────────────────────────────────────────────────────────────── hero ──

def tesseract(c: dict, cx: float, cy: float, R: float, n: int = 96, dur: int = 22) -> str:
    verts = list(itertools.product([-1, 1], repeat=4))
    edges = [(i, j) for i in range(16) for j in range(i + 1, 16)
             if sum(a != b for a, b in zip(verts[i], verts[j])) == 1]
    tx, ty = 0.42, -0.55  # fixed 3D viewing tilt
    raw = []
    for f in range(n):
        a = 2 * math.pi * f / n
        ca, sa = math.cos(a), math.sin(a)
        pts = []
        for x, y, z, w in verts:
            x, w = x * ca - w * sa, x * sa + w * ca          # rotate XW
            y, z = y * ca - z * sa, y * sa + z * ca          # rotate YZ
            k = 2.6 / (2.6 - w)                               # 4D → 3D
            x, y, z = x * k, y * k, z * k
            y, z = y * math.cos(tx) - z * math.sin(tx), y * math.sin(tx) + z * math.cos(tx)
            x, z = x * math.cos(ty) + z * math.sin(ty), -x * math.sin(ty) + z * math.cos(ty)
            k3 = 7 / (7 - z)                                  # 3D → 2D
            pts.append((x * k3, y * k3))
        raw.append(pts)
    m = max(math.hypot(px, py) for pts in raw for px, py in pts)
    frames = [[(cx + px / m * R, cy + py / m * R) for px, py in pts] for pts in raw]
    frames.append(frames[0])

    groups = {"w": [], "a": [], "b": []}
    for i, j in edges:
        d = next(k for k in range(4) if verts[i][k] != verts[j][k])
        groups["w" if d == 3 else ("a" if verts[i][3] < 0 else "b")].append((i, j))

    def d_of(pts, es):
        return " ".join(f"M{pts[i][0]:.1f} {pts[i][1]:.1f}L{pts[j][0]:.1f} {pts[j][1]:.1f}" for i, j in es)

    style = {"w": f'stroke="{c["muted"]}" stroke-dasharray="3 5"',
             "a": f'stroke="{c["sec"]}" stroke-width="1.2"',
             "b": f'stroke="{c["fg"]}" stroke-width="1.6"'}
    out = []
    for key in ("w", "a", "b"):
        es = groups[key]
        vals = ";".join(d_of(p, es) for p in frames)
        out.append(f'<path fill="none" {style[key]} d="{d_of(frames[0], es)}">'
                   f'<animate attributeName="d" dur="{dur}s" repeatCount="indefinite" values="{vals}"/></path>')
    for v in range(16):
        xs = ";".join(f"{p[v][0]:.1f}" for p in frames)
        ys = ";".join(f"{p[v][1]:.1f}" for p in frames)
        out.append(f'<circle r="3" fill="{c["fg"]}" cx="{frames[0][v][0]:.1f}" cy="{frames[0][v][1]:.1f}">'
                   f'<animate attributeName="cx" dur="{dur}s" repeatCount="indefinite" values="{xs}"/>'
                   f'<animate attributeName="cy" dur="{dur}s" repeatCount="indefinite" values="{ys}"/></circle>')
    return "\n".join(out)


def hero(c: dict) -> str:
    H = 720
    css = """
.scan{animation:scan 7s ease-in-out infinite}
@keyframes scan{0%{transform:translateY(0);opacity:0}15%,85%{opacity:.6}100%{transform:translateY(420px);opacity:0}}
.orbit{transform-box:fill-box;transform-origin:center;animation:orbit 60s linear infinite}
@keyframes orbit{to{transform:rotate(360deg)}}
.blink{animation:blink 1.2s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
"""
    corners = "".join(
        f'<path d="M{x-9} {y}H{x+9}M{x} {y-9}V{y+9}" stroke="{c["fg"]}"/>'
        for x, y in [(24.5, 24.5), (1255.5, 24.5), (24.5, 696.5), (1255.5, 696.5)])
    stats = [("2025", "FOUNDED"), ("10+", "FOUNDING CLIENTS"), ("100%", "SENIOR TEAM"), ("24/7", "COVERAGE")]
    stat_svg = ""
    for i, (num, lab) in enumerate(stats):
        x = 24 + i * 308
        if i:
            stat_svg += f'<line x1="{x+.5}" y1="568" x2="{x+.5}" y2="696" stroke="{c["line"]}"/>'
        stat_svg += (f'<g class="rise d{min(i+3, 6)}"><text x="{x+40}" y="638" class="serif" font-size="52" font-weight="300" fill="{c["fg"]}">{num}</text>'
                     f'<text x="{x+42}" y="670" class="sans" font-size="11" letter-spacing="3" fill="{c["muted"]}">{lab}</text></g>')
    body = f"""<defs><pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="{c['line']}"/></pattern></defs>
<rect width="{W}" height="{H}" fill="{c['bg']}"/>
<rect x="24" y="96" width="1232" height="472" fill="url(#dots)" opacity=".55"/>
<rect x="24.5" y="24.5" width="1231" height="672" fill="none" stroke="{c['line']}"/>
{corners}
{mark(c, 52, 42, 0.17, c['fg'], c['bg'])}
<text x="96" y="66" class="sans" font-size="12" font-weight="700" letter-spacing="4" fill="{c['fg']}">DIMENSITY LABS™</text>
<text x="1224" y="66" text-anchor="end" class="sans" font-size="12" letter-spacing="4" fill="{c['muted']}">REMOTE-FIRST — WORLDWIDE</text>
<line x1="24" y1="96.5" x2="1256" y2="96.5" stroke="{c['line']}"/>

<g class="rise d1"><text x="64" y="170" class="mono" font-size="13" letter-spacing="1" fill="{c['muted']}">// DIGITAL PRODUCT &amp; AI INTEGRATION STUDIO</text></g>
<g class="rise d2"><text x="58" y="264" class="serif" font-size="88" font-weight="300" fill="{c['fg']}">Digital products,</text></g>
<g class="rise d3"><text x="58" y="354" class="serif" font-size="88" font-weight="300" fill="{c['fg']}">built with</text></g>
<g class="rise d4"><text x="58" y="444" class="serif" font-size="88" font-weight="300" font-style="italic" fill="{c['sec']}">integrity.<tspan class="blink" font-style="normal" fill="{c['fg']}">_</tspan></text></g>
<g class="rise d5"><text x="64" y="500" class="sans" font-size="15" fill="{c['sec']}">Web, mobile and AI-powered products for startups and growing businesses.</text>
<text x="64" y="526" class="sans" font-size="15" fill="{c['sec']}">Senior-only — founders on every project, from first wireframe to production.</text></g>

<line x1="1010" y1="112" x2="1010" y2="552" stroke="{c['line']}" stroke-dasharray="2 6"/>
<line x1="790" y1="332" x2="1240" y2="332" stroke="{c['line']}" stroke-dasharray="2 6"/>
<circle class="orbit" cx="1010" cy="332" r="214" fill="none" stroke="{c['line']}" stroke-dasharray="1 9"/>
<g>{tesseract(c, 1010, 332, 178)}</g>
<line class="scan" x1="800" y1="118" x2="1220" y2="118" stroke="{c['sec']}" stroke-width=".8"/>
<text x="800" y="128" class="mono" font-size="11" letter-spacing="1.5" fill="{c['muted']}">FIG. 01 — TESSERACT</text>
<text x="1224" y="548" text-anchor="end" class="mono" font-size="11" letter-spacing="1.5" fill="{c['muted']}">4D · ROT XW / YZ</text>

<line x1="24" y1="568.5" x2="1256" y2="568.5" stroke="{c['line']}"/>
{stat_svg}"""
    return svg(H, "Dimensity Labs — Digital products, built with integrity. Founded 2025 · 10+ founding clients · 100% senior team · 24/7 coverage", body, css)


# ──────────────────────────────────────────────────────────── marquee ──

def marquee(c: dict) -> str:
    H = 150

    def row(items, cw, gap, y, cls, text_attrs, sep):
        x, seq = 0.0, []
        for it in items:
            ln = len(it) * cw
            seq.append((x, it, ln))
            x += ln + gap
            seq.append((x, None, 0))
            x += 8 + gap
        L = x
        copies = math.ceil((W + L) / L) + 1
        parts = []
        for k in range(copies):
            for sx, it, ln in seq:
                ox = sx + k * L
                if it is None:
                    parts.append(sep(ox + 4, y))
                else:
                    parts.append(f'<text x="{ox:.1f}" y="{y}" textLength="{ln:.1f}" {text_attrs}>{esc(it)}</text>')
        return L, f'<g class="{cls}">' + "".join(parts) + "</g>"

    L1, r1 = row(["WEB DEVELOPMENT", "MOBILE APPS", "AI INTEGRATION", "DESIGN & UX", "BUILT WITH INTEGRITY"],
                 18, 40, 44, "m1", f'class="sans" font-size="20" font-weight="700" fill="{c["bg"]}"',
                 lambda x, y: f'<path d="M{x:.1f} {y-13}l5 5-5 5-5-5z" fill="{c["bg"]}"/>')
    L2, r2 = row(["honest", "senior-only", "no shortcuts", "remote-first", "worldwide", "founders on every project", "you own the code"],
                 18, 34, 124, "m2", f'class="serif" font-size="36" font-style="italic" fill="{c["sec"]}"',
                 lambda x, y: f'<circle cx="{x:.1f}" cy="{y-11}" r="3" fill="{c["muted"]}"/>')
    css = f"""
.m1{{animation:m1 {L1/70:.1f}s linear infinite}}
@keyframes m1{{to{{transform:translateX(-{L1:.1f}px)}}}}
.m2{{animation:m2 {L2/45:.1f}s linear infinite}}
@keyframes m2{{from{{transform:translateX(-{L2:.1f}px)}}to{{transform:translateX(0)}}}}
"""
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
<rect width="{W}" height="72" fill="{c['fg']}"/>
{r1}
{r2}
<line x1="0" y1="{H-.5}" x2="{W}" y2="{H-.5}" stroke="{c['line']}"/>"""
    return svg(H, "Web development · Mobile apps · AI integration · Design & UX · Built with integrity", body, css)


# ─────────────────────────────────────────────────────── capabilities ──

def capabilities(c: dict) -> str:
    H = 570
    css = """
.grow{transform-box:fill-box;transform-origin:left center;animation:grow 5s ease-in-out infinite both}
@keyframes grow{0%,8%{transform:scaleX(0)}30%,85%{transform:scaleX(1)}100%{transform:scaleX(0)}}
.g2{animation-delay:.25s}.g3{animation-delay:.5s}.g4{animation-delay:.75s}
.feed{animation:feed 4s ease-in-out infinite}
@keyframes feed{0%,30%{transform:translateY(0)}50%,80%{transform:translateY(-18px)}100%{transform:translateY(-36px)}}
.pulse{stroke-dasharray:12 200;animation:pulse 2.4s linear infinite both}
@keyframes pulse{from{stroke-dashoffset:12}to{stroke-dashoffset:-100}}
.draw{stroke-dasharray:100;animation:draw 5s ease-in-out infinite}
@keyframes draw{0%{stroke-dashoffset:100;opacity:1}50%{stroke-dashoffset:0}85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
.blink{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
"""
    web = f"""<rect x=".5" y=".5" width="119" height="89" rx="3" fill="{c['bg']}" stroke="{c['sec']}"/>
<line x1="0" y1="16.5" x2="120" y2="16.5" stroke="{c['line']}"/>
<circle cx="9" cy="8.5" r="2" fill="{c['muted']}"/><circle cx="17" cy="8.5" r="2" fill="{c['muted']}"/><circle cx="25" cy="8.5" r="2" fill="{c['muted']}"/>
<rect class="grow" x="12" y="28" width="70" height="6" fill="{c['sec']}"/>
<rect class="grow g2" x="12" y="42" width="96" height="4" fill="{c['line']}"/>
<rect class="grow g3" x="12" y="52" width="58" height="4" fill="{c['line']}"/>
<rect class="grow g4" x="12" y="66" width="34" height="12" rx="2" fill="{c['fg']}"/>
<rect class="blink" x="50" y="66" width="2" height="12" fill="{c['fg']}"/>"""
    feed = "".join(f'<rect x="40" y="{16 + k*18}" width="40" height="14" rx="2" fill="{c["sec"] if k % 2 == 0 else c["line"]}"/>' for k in range(7))
    mobile = f"""<clipPath id="scr"><rect x="38" y="14" width="44" height="66"/></clipPath>
<rect x="34.5" y=".5" width="51" height="89" rx="6" fill="{c['bg']}" stroke="{c['sec']}"/>
<line x1="52" y1="7.5" x2="68" y2="7.5" stroke="{c['muted']}" stroke-width="2" stroke-linecap="round"/>
<g clip-path="url(#scr)"><g class="feed">{feed}</g></g>
<line x1="54" y1="84.5" x2="66" y2="84.5" stroke="{c['muted']}"/>"""
    L0, L1, L2 = [(10, y) for y in (18, 45, 72)], [(60, y) for y in (10, 34, 58, 82)], [(110, y) for y in (30, 62)]
    base, pulses, k = "", "", 0
    for A, B, off in ((L0, L1, 0.0), (L1, L2, 1.2)):
        for a in A:
            for b in B:
                d = f"M{a[0]} {a[1]}L{b[0]} {b[1]}"
                base += f'<path d="{d}" stroke="{c["line"]}"/>'
                pulses += f'<path class="pulse" pathLength="100" d="{d}" stroke="{c["fg"]}" stroke-width="1.5" style="animation-delay:{off + (k % 5) * 0.11:.2f}s"/>'
                k += 1
    nodes = "".join(f'<circle cx="{x}" cy="{y}" r="4.5" fill="{c["bg"]}" stroke="{c["sec"]}"/>' for x, y in L0 + L1 + L2)
    ai = f'<g fill="none">{base}{pulses}</g>{nodes}'
    design = f"""<path d="M8 78L30 8M112 12L90 84" stroke="{c['muted']}" stroke-dasharray="2 3"/>
<circle cx="30" cy="8" r="3" fill="{c['muted']}"/><circle cx="90" cy="84" r="3" fill="{c['muted']}"/>
<path d="M8 78C30 8 90 84 112 12" fill="none" stroke="{c['line']}"/>
<path class="draw" pathLength="100" d="M8 78C30 8 90 84 112 12" fill="none" stroke="{c['fg']}" stroke-width="2"/>
<rect x="4.5" y="74.5" width="7" height="7" fill="{c['bg']}" stroke="{c['fg']}"/><rect x="108.5" y="8.5" width="7" height="7" fill="{c['bg']}" stroke="{c['fg']}"/>"""
    cards = [
        ("Web", "NEXT.JS · REACT", web, ["Fast, accessible web apps", "and sites, built to scale."]),
        ("Mobile", "IOS · ANDROID", mobile, ["Native iOS and Android —", "and web that feels native."]),
        ("AI integration", "LLM · AGENTS", ai, ["LLM features that hold up", "in production, not demos."]),
        ("Design & UX", "PRODUCT · SYSTEMS", design, ["Product design and design", "systems, built with the code."]),
    ]
    out = ""
    for i, (title, tag, icon, desc) in enumerate(cards):
        x = 64 + i * 292
        out += f"""<rect x="{x+.5}" y="196.5" width="275" height="329" rx="3" fill="{c['surf']}" stroke="{c['line']}"/>
<text x="{x+20}" y="226" class="mono" font-size="12" fill="{c['muted']}">0{i+1}</text>
<text x="{x+256}" y="226" text-anchor="end" class="mono" font-size="10" letter-spacing="1.5" fill="{c['muted']}">{esc(tag)}</text>
<g transform="translate({x+78} 248)">{icon}</g>
<line x1="{x+1}" y1="364.5" x2="{x+275}" y2="364.5" stroke="{c['line']}"/>
<text x="{x+20}" y="414" class="serif" font-size="34" fill="{c['fg']}">{esc(title)}</text>
<text x="{x+20}" y="452" class="sans" font-size="14" fill="{c['sec']}">{esc(desc[0])}</text>
<text x="{x+20}" y="474" class="sans" font-size="14" fill="{c['sec']}">{esc(desc[1])}</text>
<path d="M{x+20} 500.5H{x+44}M{x+38} 495l6 5.5-6 5.5" fill="none" stroke="{c['muted']}"/>"""
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
{header(c, '01', 'CAPABILITIES', 'What we', 'build.', 'FOUR DISCIPLINES — ONE TEAM')}
{out}"""
    return svg(H, "What we build — Web · Mobile · AI integration · Design & UX", body, css)


# ───────────────────────────────────────────────────────────── method ──

def method(c: dict) -> str:
    H = 480
    T, y0, xs = 7, 262, (160, 640, 1120)
    hit = [2, 43.5, 85]
    css = f"""
.trav{{animation:trav {T}s linear infinite}}
@keyframes trav{{0%{{transform:translateX(0);opacity:0}}2%{{opacity:1}}85%{{transform:translateX(960px);opacity:1}}92%,100%{{transform:translateX(960px);opacity:0}}}}
.fill{{animation:fill {T}s linear infinite}}
@keyframes fill{{0%{{transform:scaleX(0)}}85%,92%{{transform:scaleX(1)}}100%{{transform:scaleX(1);opacity:0}}}}
.fill{{transform-box:fill-box;transform-origin:left center}}
.ring{{transform-box:fill-box;transform-origin:center}}
""" + "".join(
        f".r{i}{{animation:r{i} {T}s ease-out infinite}}"
        f"@keyframes r{i}{{0%,{p}%{{transform:scale(1);opacity:0}}{p+0.5}%{{opacity:.8}}{min(p+18, 100)}%,100%{{transform:scale(4);opacity:0}}}}"
        f".n{i}{{animation:n{i} {T}s linear infinite}}"
        f"@keyframes n{i}{{0%,{p}%{{fill:{c['bg']}}}{p+0.5}%,92%{{fill:{c['fg']}}}96%,100%{{fill:{c['bg']}}}}}"
        for i, p in enumerate(hit))
    ticks = "".join(f'<line x1="{x+.5}" y1="{y0+10}" x2="{x+.5}" y2="{y0+(16 if (x-160) % 120 == 0 else 13)}" stroke="{c["line"]}"/>'
                    for x in range(160, 1121, 24))
    steps = [("Discover", ["Strategy, scope and the", "real problem — first."]),
             ("Design", ["Design and engineering", "in one senior team."]),
             ("Deliver", ["Launch, support, iterate.", "We stay after go-live."])]
    nodes = ""
    for i, (x, (name, desc)) in enumerate(zip(xs, steps)):
        nodes += f"""<circle class="ring r{i}" cx="{x}" cy="{y0}" r="9" fill="none" stroke="{c['fg']}"/>
<circle class="n{i}" cx="{x}" cy="{y0}" r="9" fill="{c['bg']}" stroke="{c['fg']}" stroke-width="1.5"/>
<text x="{x}" y="{y0+66}" text-anchor="middle" class="mono" font-size="12" fill="{c['muted']}">0{i+1}</text>
<text x="{x}" y="{y0+110}" text-anchor="middle" class="serif" font-size="40" fill="{c['fg']}">{name}</text>
<text x="{x}" y="{y0+144}" text-anchor="middle" class="sans" font-size="14" fill="{c['sec']}">{esc(desc[0])}</text>
<text x="{x}" y="{y0+166}" text-anchor="middle" class="sans" font-size="14" fill="{c['sec']}">{esc(desc[1])}</text>"""
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
{header(c, '02', 'METHOD', 'Discover. Design.', 'Deliver.', 'FROM FIRST WIREFRAME TO PRODUCTION')}
<line x1="160" y1="{y0+.5}" x2="1120" y2="{y0+.5}" stroke="{c['line']}"/>
<rect class="fill" x="160" y="{y0-.5}" width="960" height="2" fill="{c['fg']}"/>
{ticks}
{nodes}
<g class="trav"><circle cx="160" cy="{y0}" r="5" fill="{c['fg']}"/></g>"""
    return svg(H, "How we work — 01 Discover · 02 Design · 03 Deliver", body, css)


# ─────────────────────────────────────────────────────────── terminal ──

def terminal(c: dict) -> str:
    H, T, fs, lh, x0, y0 = 480, 14, 18, 34, 104, 128
    cw = fs * 0.6
    cmd = "npx dimensity init your-idea"
    rows = [("discovery & strategy", "scoped"), ("design & development", "senior-only"),
            ("ai integration", "production-ready"), ("launch & support", "24/7"), ("code & ip", "yours")]
    show = {0: 33, 1: 55, 2: 59, 3: 63, 4: 67, 5: 71, 7: 79, 8: 84}
    css = "".join(f".l{i}{{animation:l{i} {T}s infinite}}@keyframes l{i}{{0%,31%{{opacity:1}}31.5%,{p}%{{opacity:0}}{p+0.2}%,100%{{opacity:1}}}}"
                  for i, p in show.items())
    w = len(cmd) * cw
    css += f"""
.type{{animation:type {T}s infinite}}
@keyframes type{{0%,31.4%{{transform:translateX({w:.1f}px)}}31.5%,36%{{transform:translateX(0);animation-timing-function:steps({len(cmd)},end)}}50%,100%{{transform:translateX({w:.1f}px)}}}}
.tcur{{animation:tcur {T}s infinite}}
@keyframes tcur{{0%,31.4%{{opacity:0}}31.5%,51%{{opacity:1}}51.5%,100%{{opacity:0}}}}
.blink{{animation:blink 1s steps(1) infinite}}
@keyframes blink{{50%{{opacity:0}}}}
"""
    lines = [f'<g class="l0"><text x="{x0}" y="{y0}" class="mono" font-size="{fs}" xml:space="preserve"><tspan fill="{c["muted"]}">$ </tspan><tspan fill="{c["fg"]}">{cmd}</tspan></text>'
             f'<g class="type"><rect x="{x0 + 2*cw - 1:.1f}" y="{y0-21}" width="{w+14:.1f}" height="29" fill="{c["surf"]}"/>'
             f'<rect class="tcur" x="{x0 + 2*cw:.1f}" y="{y0-17}" width="10" height="22" fill="{c["fg"]}"/></g></g>']
    for i, (k, v) in enumerate(rows, start=1):
        y = y0 + i * lh
        lines.append(f'<text class="l{i} mono" x="{x0}" y="{y}" font-size="{fs}" xml:space="preserve">'
                     f'<tspan fill="{c["sec"]}">  ✓ </tspan><tspan fill="{c["fg"]}">{esc(k.ljust(24))}</tspan><tspan fill="{c["muted"]}">{esc(v)}</tspan></text>')
    lines.append(f'<text class="l7 mono" x="{x0}" y="{y0 + 7*lh}" font-size="{fs}" xml:space="preserve">'
                 f'<tspan fill="{c["fg"]}">  → ready. start at </tspan><tspan fill="{c["sec"]}" text-decoration="underline">dimensitylabs.dev</tspan></text>')
    lines.append(f'<g class="l8"><text x="{x0}" y="{y0 + 8*lh}" class="mono" font-size="{fs}" fill="{c["muted"]}">$</text>'
                 f'<rect class="blink" x="{x0 + 2*cw:.1f}" y="{y0 + 8*lh - 17}" width="10" height="22" fill="{c["fg"]}"/></g>')
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
<rect x="64.5" y="24.5" width="1151" height="431" rx="6" fill="{c['surf']}" stroke="{c['line']}"/>
<circle cx="90" cy="46" r="5.5" fill="{c['line']}"/><circle cx="108" cy="46" r="5.5" fill="{c['muted']}"/><circle cx="126" cy="46" r="5.5" fill="{c['sec']}"/>
<text x="640" y="50" text-anchor="middle" class="mono" font-size="12" fill="{c['muted']}">dimensity — ~/your-idea — zsh</text>
<line x1="65" y1="68.5" x2="1215" y2="68.5" stroke="{c['line']}"/>
{mark(c, 830, 92, 1.65, c['faint'], c['surf'])}
{''.join(lines)}"""
    return svg(H, "$ npx dimensity init your-idea — discovery & strategy: scoped · design & development: senior-only · ai integration: production-ready · launch & support: 24/7 · code & ip: yours", body, css)


# ─────────────────────────────────────────────────────────── integrity ──

def integrity(c: dict) -> str:
    H, top, rh, T = 540, 196, 64, 10
    items = [("Senior-only", "The people you meet are the people who build it."),
             ("You own everything", "Code, IP and infrastructure. No vendor lock-in."),
             ("NDA-first", "Confidential from the first call."),
             ("Compliant by default", "GDPR and CCPA. Security reviewed before launch."),
             ("Full transparency", "Honest scopes, honest timelines, rigorous QA.")]
    kf = ""
    for i in range(5):
        a, b = i * 20, i * 20 + 16
        kf += f"{a}%,{b}%{{transform:translateY({i*rh}px)}}"
    kf += "100%{transform:translateY(0)}"
    css = f".hl{{animation:hl {T}s cubic-bezier(.6,0,.2,1) infinite}}@keyframes hl{{{kf}}}"
    rows = ""
    for i, (t, d) in enumerate(items):
        y = top + i * rh
        rows += f"""<line x1="64" y1="{y+.5}" x2="1216" y2="{y+.5}" stroke="{c['line']}"/>
<text x="92" y="{y+40}" class="mono" font-size="13" fill="{c['muted']}">0{i+1}</text>
<text x="156" y="{y+42}" class="serif" font-size="30" fill="{c['fg']}">{esc(t)}</text>
<text x="580" y="{y+39}" class="sans" font-size="15" fill="{c['sec']}">{esc(d)}</text>"""
    rows += f'<line x1="64" y1="{top+5*rh+.5}" x2="1216" y2="{top+5*rh+.5}" stroke="{c["line"]}"/>'
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
{header(c, '03', 'INTEGRITY', 'What you can', 'count on.', 'HONEST. SENIOR-ONLY. NO SHORTCUTS.')}
<g class="hl"><rect x="64" y="{top+1}" width="1152" height="{rh-1}" fill="{c['faint']}"/>
<rect x="64" y="{top+1}" width="3" height="{rh-1}" fill="{c['fg']}"/>
<path d="M1186 {top+32}l6 6 12-12" fill="none" stroke="{c['fg']}" stroke-width="1.6"/></g>
{rows}"""
    return svg(H, "What you can count on — Senior-only · You own everything · NDA-first · Compliant by default · Full transparency", body, css)


# ─────────────────────────────────────────────────────────────── stack ──

def stack(c: dict) -> str:
    H, top, cw_, ch, T = 380, 196, 192, 80, 9.6
    names = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Tailwind",
             "PostgreSQL", "AWS", "Vercel", "Stripe", "OpenAI", "Anthropic"]
    kf = "".join(f"{i*100/12:.2f}%{{transform:translate({(i % 6)*cw_}px,{(i//6)*ch}px)}}" for i in range(12))
    kf += f"100%{{transform:translate({5*cw_}px,{ch}px)}}"
    css = f".hl{{animation:hl {T}s step-end infinite}}@keyframes hl{{{kf}}}"
    cells = ""
    for i, n in enumerate(names):
        x, y = 64 + (i % 6) * cw_, top + (i // 6) * ch
        cells += f"""<rect x="{x+.5}" y="{y+.5}" width="{cw_}" height="{ch}" fill="none" stroke="{c['line']}"/>
<text x="{x+16}" y="{y+24}" class="mono" font-size="11" fill="{c['muted']}">{i+1:02d}</text>
<text x="{x+16}" y="{y+60}" class="sans" font-size="19" fill="{c['fg']}">{n}</text>"""
    body = f"""<rect width="{W}" height="{H}" fill="{c['bg']}"/>
{header(c, '04', 'STACK', 'Tools we', 'trust.', 'TWELVE TOOLS — ZERO LOCK-IN')}
<g class="hl"><rect x="64.5" y="{top+.5}" width="{cw_}" height="{ch}" fill="{c['faint']}" stroke="{c['fg']}" stroke-width="1.5"/>
<rect x="{64+cw_-14}" y="{top+10}" width="6" height="6" fill="{c['fg']}"/></g>
{cells}"""
    return svg(H, "Stack — " + " · ".join(names), body, css)


# ───────────────────────────────────────────────────────────────── cta ──

def cta(c: dict) -> str:
    H = 470
    bg, fg, sec, ln = c["fg"], c["bg"], c["inv_sec"], c["inv_line"]
    css = """
.nudge{animation:nudge 1.6s ease-in-out infinite}
@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(7px)}}
.blink{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
"""
    body = f"""<rect width="{W}" height="{H}" fill="{bg}"/>
<text x="64" y="72" class="mono" font-size="12" letter-spacing="2" fill="{sec}">05 / START A PROJECT</text>
<text x="1216" y="72" text-anchor="end" class="mono" font-size="12" letter-spacing="2" fill="{sec}">NDA-FIRST — YOU OWN THE IP</text>
<text x="54" y="218" class="serif" font-size="124" font-weight="300" fill="{fg}">Got an idea?</text>
<text x="54" y="344" class="serif" font-size="124" font-weight="300" font-style="italic" fill="{sec}">Let's build it.</text>
<rect x="888.5" y="286.5" width="327" height="63" rx="3" fill="{fg}"/>
<text x="918" y="324" class="sans" font-size="14" font-weight="700" letter-spacing="3.5" fill="{bg}">START A PROJECT</text>
<g class="nudge"><path d="M1160 318H1188M1179 309l9 9-9 9" fill="none" stroke="{bg}" stroke-width="1.8"/></g>
<line x1="64" y1="398.5" x2="1216" y2="398.5" stroke="{ln}"/>
<text x="64" y="436" class="mono" font-size="14" fill="{fg}">hello@dimensitylabs.dev<tspan class="blink">_</tspan></text>
<text x="1216" y="436" text-anchor="end" class="mono" font-size="14" fill="{fg}">dimensitylabs.dev  ↗</text>"""
    return svg(H, "Got an idea? Let's build it. Start a project — hello@dimensitylabs.dev", body, css)


PANELS = {"hero": hero, "marquee": marquee, "capabilities": capabilities, "method": method,
          "terminal": terminal, "integrity": integrity, "stack": stack, "cta": cta}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in PANELS.items():
        for theme, c in THEMES.items():
            p = OUT / f"{name}-{theme}.svg"
            p.write_text(fn(c), encoding="utf-8")
            print(f"{p.relative_to(OUT.parent.parent)}  {p.stat().st_size/1024:.1f} KB")
