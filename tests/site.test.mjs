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

test("uses natural numbering and content-rich project previews", () => {
  assert.doesNotMatch(html, /class="(?:principle-number|project-index)"[^>]*>[\s\S]*?<span>0[1-9]<\/span>/);
  assert.match(html, /<span class="principle-number">1<\/span>/);
  assert.match(html, /<div class="project-index"><span>1<\/span>/);
  assert.match(html, /DELIVERY CONTROL/);
  assert.match(html, /Repository pulse/);
  assert.match(html, /component-workbench/);
});

test("adds resume context without republishing private contact details", () => {
  assert.match(html, /Ethernet Delivery Specialist/);
  assert.match(html, /TalkTalk Business/);
  assert.match(html, /Frontend Developer/);
  assert.match(html, /2026—Present/);
  assert.match(html, /Trackvera/);
  assert.match(html, /CommitVista/);
  assert.match(html, /ElementSmith/);
  assert.match(html, /NableTech/);
  assert.doesNotMatch(html, /Legal & General/);
  assert.match(html, /Code Institute/);
  assert.match(html, /Manchester Metropolitan University/);
  assert.match(html, /more than four years of enterprise technology delivery/);
  assert.match(html, /delivering enterprise connectivity at TalkTalk Business/);
  assert.match(html, /Scrum Master work at NableTech/);
  assert.doesNotMatch(html, /customer service/i);
  assert.doesNotMatch(html, /Torcross|07450|1912894542|M9 0QP|07852|ayo\.osomo@/i);
});

test("preserves accessible navigation, motion and progressive enhancement", () => {
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /alt="Portrait of Olukoyede Osomo"/);
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

