import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../assets/css/style.css", import.meta.url), "utf8");
const js = await readFile(new URL("../assets/js/site.js", import.meta.url), "utf8");

test("publishes a complete semantic portfolio", () => {
  assert.match(html, /<main id="main">/);
  assert.match(html, /<nav id="site-nav" aria-label="Primary navigation">/);
  assert.match(html, /href="#main">Skip to content/);
  assert.match(html, /<h1 id="hero-title">I make complex products feel/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="about"/);
});

test("links every featured project to source and a live product", () => {
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

test("adds resume context without republishing private contact details", () => {
  assert.match(html, /Freelance Web Developer/);
  assert.match(html, /Code Institute/);
  assert.match(html, /Manchester Metropolitan University/);
  assert.doesNotMatch(html, /Torcross|07450|1912894542|M9 0QP/i);
});

test("preserves accessible navigation, motion and progressive enhancement", () => {
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /alt="Portrait of Olu Osomo"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /event\.key === "Escape"/);
});

test("includes social and search metadata", () => {
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="description"/);
});
