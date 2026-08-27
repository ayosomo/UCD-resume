import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../assets/css/style.css", import.meta.url), "utf8");

test("publishes a complete semantic portfolio shell", () => {
  assert.match(html, /<main id="main">/);
  assert.match(html, /<nav aria-label="Primary navigation">/);
  assert.match(html, /href="#main">Skip to content/);
  assert.match(html, /<h1>I build calm interfaces/);
});

test("links every featured project to source and a live demo", () => {
  const projects = {
    Trackvera: "trackvera-saas-dashboard",
    CommitVista: "commitvista",
    ElementSmith: "elementsmith",
  };
  for (const [name, repository] of Object.entries(projects)) {
    assert.match(html, new RegExp(`<h3>${name}</h3>`));
    assert.match(html, new RegExp(`github\\.com/ayosomo/${repository}`));
  }
  assert.match(html, /trackvera-saas-dashboard\.vercel\.app/);
  assert.match(html, /commitvista\.vercel\.app/);
  assert.match(html, /ayosomo\.github\.io\/elementsmith/);
});

test("does not republish obsolete personal contact details", () => {
  assert.doesNotMatch(html, /Torcross|07450|ayobami CV|contact form/i);
});

test("loads the visual system and preserves accessibility preferences", () => {
  assert.match(html, /href="assets\/css\/style\.css"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});
