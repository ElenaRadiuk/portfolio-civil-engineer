/* Tweaks app for Portfolio.html — mounts only the floating panel and applies
   changes to the live (vanilla HTML) DOM via CSS variables + text content. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#1E5AA8", "#16447e", "#0f3160", "#eaf1f9"],
  "headingFont": "Archivo",
  "density": "regular",
  "corners": "soft",
  "headlineLead": "Building infrastructure",
  "headlineAccent": "that lasts",
  "subhead": "Civil engineer specializing in structural design, transportation systems, site development, and sustainable infrastructure solutions — delivered on budget and ahead of schedule.",
  "eyebrow": "Licensed Professional Engineer · California"
}/*EDITMODE-END*/;

const ACCENTS = {
  "Engineering Blue": ["#1E5AA8", "#16447e", "#0f3160", "#eaf1f9"],
  "Slate Teal":       ["#0E7C86", "#0a5c64", "#073e44", "#e4f3f4"],
  "Forest":           ["#2E6B4F", "#22513b", "#143324", "#e8f2ec"],
  "Graphite":         ["#46535F", "#333d47", "#1f262d", "#eef1f3"],
};

const FONT_STACKS = {
  "Archivo":       '"Archivo","Segoe UI",system-ui,sans-serif',
  "Sora":          '"Sora",system-ui,sans-serif',
  "Space Grotesk": '"Space Grotesk",system-ui,sans-serif',
  "DM Sans":       '"DM Sans",system-ui,sans-serif',
};

const DENSITY = {
  compact:  "clamp(48px,7vw,84px)",
  regular:  "clamp(72px,10vw,128px)",
  spacious: "clamp(96px,13vw,168px)",
};

const CORNERS = {
  sharp: ["3px", "5px", "8px"],
  soft:  ["8px", "14px", "22px"],
  round: ["14px", "22px", "34px"],
};

function applyTweaks(t) {
  const s = document.documentElement.style;
  const [blue, dark, deep, tint] = t.accent || TWEAK_DEFAULTS.accent;
  s.setProperty("--blue", blue);
  s.setProperty("--blue-dark", dark);
  s.setProperty("--blue-deep", deep);
  s.setProperty("--blue-tint", tint);

  s.setProperty("--sans", FONT_STACKS[t.headingFont] || FONT_STACKS.Archivo);

  s.setProperty("--sec-y", DENSITY[t.density] || DENSITY.regular);

  const c = CORNERS[t.corners] || CORNERS.soft;
  s.setProperty("--r-sm", c[0]);
  s.setProperty("--r", c[1]);
  s.setProperty("--r-lg", c[2]);

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("hlLead", (t.headlineLead || "") + " ");
  set("hlAccent", t.headlineAccent || "");
  set("heroSub", t.subhead || "");
  set("heroTagText", t.eyebrow || "");
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  const accentOptions = Object.values(ACCENTS);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent} options={accentOptions}
                  onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="Type" />
      <TweakSelect label="Heading font" value={t.headingFont}
                   options={Object.keys(FONT_STACKS)}
                   onChange={(v) => setTweak("headingFont", v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Section rhythm" value={t.density}
                  options={["compact", "regular", "spacious"]}
                  onChange={(v) => setTweak("density", v)} />
      <TweakRadio label="Corners" value={t.corners}
                  options={["sharp", "soft", "round"]}
                  onChange={(v) => setTweak("corners", v)} />

      <TweakSection label="Hero copy" />
      <TweakText label="Headline" value={t.headlineLead}
                 onChange={(v) => setTweak("headlineLead", v)} />
      <TweakText label="Accent phrase" value={t.headlineAccent}
                 onChange={(v) => setTweak("headlineAccent", v)} />
      <TweakText label="Eyebrow" value={t.eyebrow}
                 onChange={(v) => setTweak("eyebrow", v)} />
      <TweakText label="Subheadline" value={t.subhead}
                 onChange={(v) => setTweak("subhead", v)} />
    </TweaksPanel>
  );
}

// Apply persisted/default tweaks immediately so first paint matches, then mount.
applyTweaks(TWEAK_DEFAULTS);
ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
