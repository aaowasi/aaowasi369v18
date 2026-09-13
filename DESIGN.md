---
name: AAO Portfolio
description: Understated technology risk and AI governance employment portfolio.
colors:
  paper: "#f6f5f1"
  surface: "#ecefea"
  ink: "#202724"
  muted: "#57615b"
  line: "#d5dad5"
  accent: "#245c49"
  on-accent: "#fff"
  sample-line: "#c5cfc6"
  tab-line: "#b9c3ba"
typography:
  display:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "clamp(40px, 5.35vw, 72px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.028em"
  headline:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "clamp(32px, 3.5vw, 46px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.028em"
  title:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.028em"
  body:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "23px"
    lineHeight: 1.5
  label:
    fontFamily: "Source Sans, Arial, sans-serif"
    fontSize: "14px"
    letterSpacing: ".17em"
rounded:
  button: "4px"
spacing:
  row: "24px"
  gap: "32px"
  section: "96px"
  section-mobile: "52px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.button}"
    padding: "13px 25px"
  text-link:
    textColor: "{colors.ink}"
  navigation:
    textColor: "{colors.muted}"
  sample:
    backgroundColor: "{colors.surface}"
  copy-button:
    textColor: "{colors.muted}"
    padding: "0 0 0 20px"
---

## Overview

**Creative North Star: "Inspectable work, quiet confidence"**

An understated employment portfolio makes reasoning inspectable through text, numbered work rows and an interactive evidence sample. Warm paper, near-black type and one forest accent support a calm, practical reading experience.

**Key Characteristics:**
- Warm neutral surfaces and one forest accent.
- Readable self-hosted typography and flat ruled rows.
- Progressive enhancement with restrained state feedback.

Scope: source documentation of `assets/site.css`, `index.html` and `assets/site.js`. No browser preview, screenshot review or visual certification was performed. The implemented source takes precedence over earlier blueprint token proposals.

## Colors

Primary: forest accent for filled calls to action, text selection and focus outlines. Neutrals: paper is the default canvas; surface marks the sample and approach bands; ink carries headings and evidence; muted carries explanatory prose. Line, sample-line and tab-line separate records without enclosing them in cards. White is reserved for text on filled actions and the skip link.

**The Single Accent Rule.** Keep emphasis concentrated on actions and focus; structure content with neutral type and rules.

## Typography

Source Sans 3 is self-hosted as the CSS family `Source Sans`, with local regular and semibold WOFF2 files and `font-display: swap`. The semibold face is declared for weights 600–800. Arial and sans-serif are fallbacks. Headings use balanced wrapping; body paragraphs stop at 65ch. Labels use uppercase through CSS. Project numbers use tabular numerals. Contact and detail headings have their own responsive sizes in the stylesheet.

## Layout

The centered container caps at 1200px with 48px side gutters. Home has five sections: introduction, inspectable work sample, three featured work rows, approach with biography, and contact. The header exposes Work, Approach and Contact directly.

| Condition | Source behavior |
| --- | --- |
| Default desktop | 96px section padding; sample records use 250px/remaining columns; work rows use 64px/remaining/225px columns; approach uses 1:1.7 columns with 100px gap. |
| At least 1500px | Hero top padding grows from 76px to 92px. |
| At most 1050px | Gutters become 32px; work links move below copy in column two; approach gap becomes 56px; hero top padding becomes 64px. |
| At most 767px | Gutters become 20px; body becomes 17px; hero becomes 42px with 1.08 leading; sections become 52px; header, action groups, footers and record contents stack. Approach precedes biography; catalog becomes one column. |
| At most 359px | Hero becomes 36px; identity tightens; sample tabs become a two-column grid. |

Mobile tabs otherwise remain a four-column grid. Mobile sample panels reserve 330px height versus 264px on desktop. Detail reading columns cap at 900px. In print, all sample panels and fallback titles are shown, navigation and interactive controls are hidden, and section spacing contracts.

## Elevation & Depth

No shadows are defined. Alternating neutral bands and thin separators establish structure. The source uses no background imagery or decorative overlays.

## Shapes

Most content is square and open. Primary buttons use the small radius from frontmatter. Separators are 1px, selected-tab underlines are 2px, and trust-line separators are tiny round dots on desktop. Icons are simple inline stroked SVGs.

## Components

- **Primary action:** forest fill, white semibold text, 52px minimum height and an inline arrow. Hover opacity is .9; active opacity is .8; opacity transitions over 160ms with ease.
- **Text link:** underlined copy with a small inline arrow, 44px minimum height and 14px gap. Hover thickens the underline.
- **Navigation:** three persistent text links, no collapsed menu. Links have 44px minimum height and become ink with an underline on hover.
- **Work sample:** four stages—Requirement, Evidence, Exception, Decision. JavaScript initially selects Evidence; arrow keys cycle and Home/End jump. Selected tabs use ink, semibold type and a bottom rule. Panels use semantic definition lists. Without JavaScript all four sections remain readable and tab controls stay hidden.
- **Work row:** a muted tabular number, a descriptive text column and a contextual inspection link, separated by horizontal rules.
- **Copy email:** secondary text button with an inline icon and a left separator on desktop; it stacks without the separator on mobile. A polite live status reports success or fallback instructions. The mailto link is always available.

**The Visible Focus Rule.** Links, buttons and focusable panels use a 2px forest outline with 4px offset; sample panels use 8px offset. Preserve the skip-to-content link. Reduced-motion preferences disable transitions and animations. There is no heavy motion or reveal choreography.

## Do's and Don'ts

- Do keep work samples readable without JavaScript.
- Do use the forest accent for primary actions and keyboard focus.
- Do retain clear labels, visible email access and the three navigation links.
- Don't introduce heavy animation, decorative gradients or card shadows.
- Don't add unsubstantiated client results or certification claims.
- Don't replace the self-hosted typeface with an external font dependency.
