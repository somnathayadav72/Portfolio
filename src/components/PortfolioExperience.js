"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, ExternalLink, Menu, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { site } from "@/config/site";
import { impact } from "@/data/impact";
import { experience } from "@/data/experience";
import { independentProjects, labProjects, professionalProjects } from "@/data/projects";
import { navigation } from "@/data/navigation";
import { skillGroups } from "@/data/skills";

const ease = [0.16, 1, 0.3, 1];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrowserFrame({ kind, title, accent, children }) {
  return (
    <div className={`browserFrame browserFrame--${accent} browserFrame--${kind}`}>
      <div className="browserFrame__bar">
        <span className="browserFrame__dots"><i /><i /><i /></span>
        <span className="browserFrame__url">{title}</span>
        <span className="browserFrame__version">v1.0</span>
      </div>
      <div className="browserFrame__body">{children}</div>
    </div>
  );
}

function MiniInterface({ type }) {
  if (type === "workflow") {
    return <div className="miniInterface miniInterface--workflow"><div className="miniInterface__header"><b>Client workflow</b><span>● Live</span></div><div className="miniSteps"><span className="is-done" /><span className="is-active" /><span /><span /></div><div className="miniLines"><i /><i /><i /><i /></div><div className="miniButton">Continue <MoveRight size={11} /></div></div>;
  }
  if (type === "store") {
    return <div className="miniInterface miniInterface--store"><div className="miniStoreImage"><span>INSTORIX</span><strong>Make it<br />yours.</strong></div><div className="miniProductLines"><i /><i /><i /></div></div>;
  }
  return <div className="miniInterface miniInterface--lab"><div className="miniLabBlock" /><div className="miniLabCopy"><i /><i /><i /></div><div className="miniLabAccent" /></div>;
}

function BrowserStack() {
  return <div className="browserStack" aria-label="Three interface worlds: professional, independent, and design lab">
    <div className="browserRoute browserRoute--one" /><div className="browserRoute browserRoute--two" />
    <BrowserFrame kind="back" accent="acid" title="stryde — design lab"><MiniInterface type="lab" /></BrowserFrame>
    <BrowserFrame kind="middle" accent="signal" title="instorix — independent product"><MiniInterface type="store" /></BrowserFrame>
    <BrowserFrame kind="front" accent="cobalt" title="experivise — product work"><MiniInterface type="workflow" /></BrowserFrame>
    <div className="browserStack__labels"><span className="browserLabel browserLabel--cobalt">PROFESSIONAL WORK</span><span className="browserLabel browserLabel--signal">INDEPENDENT PRODUCT</span><span className="browserLabel browserLabel--acid">DESIGN LAB</span></div>
  </div>;
}

function FieldGrid() {
  return <div className="fieldGrid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>;
}

function BuildProgress({ progress }) {
  return <div className="buildProgress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function ScrollIndex({ activeId }) {
  return <aside className="scrollIndex" aria-label="Page sections">
    {navigation.map((item) => <button key={item.id} className={activeId === item.id ? "is-active" : ""} onClick={() => scrollToId(item.id)}><span>{item.number}</span>{item.label}</button>)}
  </aside>;
}

function Navbar({ menuOpen, setMenuOpen }) {
  const menuTrigger = useRef(null);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handler = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    document.body.classList.add("menu-open");
    return () => { document.removeEventListener("keydown", handler); document.body.classList.remove("menu-open"); };
  }, [menuOpen, setMenuOpen]);
  const closeMenu = (id) => { setMenuOpen(false); window.setTimeout(() => scrollToId(id), 40); };
  return <>
    <header className="navbar">
      <button className="wordmark" aria-label="Go to introduction" onClick={() => scrollToId("intro")}><Image className="syMark" src="/brand/sy-mark.svg" alt="" width={31} height={31} priority /><span>Somnath Yadav</span></button>
      <nav className="navbar__links" aria-label="Primary navigation">{navigation.slice(2, 8).map((item) => <button key={item.id} onClick={() => scrollToId(item.id)}>{item.label}</button>)}</nav>
      <div className="navbar__right"><span className="statusLine"><i /> Product UI · APIs · systems</span></div>
      <button ref={menuTrigger} className="menuTrigger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
    </header>
    <AnimatePresence>
      {menuOpen && <motion.div id="mobile-menu" className="mobileMenu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        <div className="mobileMenu__top"><span className="mono">INDEX / 2026</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <div className="mobileMenu__links">{navigation.map((item, index) => <button key={item.id} style={{ "--delay": `${index * 45}ms` }} onClick={() => closeMenu(item.id)}><span>{item.number}</span>{item.label}</button>)}</div>
        <div className="mobileMenu__bottom"><a href={`mailto:${site.email}`}>{site.email}</a></div>
      </motion.div>}
    </AnimatePresence>
  </>;
}

function Hero() {
  return <section id="intro" className="hero sectionAnchor">
    <div className="hero__aside mono"><span>FIELDNOTE / 01</span><span>RAJKOT, INDIA</span></div>
    <div className="hero__copy">
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65, ease }}>FRONTEND DEVELOPER <span>·</span> NEXT.JS FULL-STACK <span>·</span> REACT</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.85, ease }}><span>Complex</span><span className="indent">product.</span><span>Clear</span><span className="indent">interface.</span></motion.h1>
      <motion.p className="hero__lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.7 }}>I build responsive product frontends and Next.js full-stack features for SaaS, B2B, ERP, consumer products, and payment-driven workflows.</motion.p>
      <motion.div className="hero__actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.55, ease }}><button className="button button--dark" onClick={() => scrollToId("work")}>Explore selected work <ArrowUpRight size={15} /></button></motion.div>
    </div>
    <BrowserStack />
    <div className="hero__footer mono"><span>Since 2022</span><span>Rajkot, India</span><span>React / Next.js</span><span className="hero__scroll">Scroll to inspect <span className="scrollArrow">↓</span></span></div>
  </section>;
}

function ImpactLedger() {
  return <section id="impact" className="section impact sectionAnchor"><div className="sectionHeader"><span className="sectionKicker">01 / Impact ledger</span><h2>Impact,<br /><em>recorded.</em></h2><p>Selected outcomes and working patterns from real product delivery.</p></div><div className="ledger">{impact.map((item, index) => <motion.div key={item.label} className="ledger__row" initial={{ opacity: 0, x: index % 2 ? 28 : -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.7, ease }}><span className="ledger__index">0{index + 1}</span><span className="ledger__label">{item.label}</span><strong>{item.value}</strong><span className="ledger__detail">{item.detail}</span></motion.div>)}</div></section>;
}

function WorkflowRibbon() {
  const steps = ["Draft", "Validate", "Review", "Sign", "Complete"];
  return <div className="workflowVisual"><div className="visualNote mono">DIGITAL DOCUMENT / FLOW 04</div><div className="workflowRail">{steps.map((step, index) => <motion.div key={step} className={`workflowStep workflowStep--${index + 1}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5, ease }}><div className="workflowStep__icon">{index === 4 ? <Check size={17} /> : <span>0{index + 1}</span>}</div><span>{step}</span>{index < steps.length - 1 && <MoveRight className="workflowStep__arrow" size={17} />}</motion.div>)}</div><div className="docCard"><span className="docCard__tag">EXPERIVISE / FORM</span><strong>Client onboarding<br />agreement</strong><div className="docCard__line" /><div className="docCard__line docCard__line--short" /><div className="docCard__signature">Signature required <span>→</span></div></div><div className="visualStamp">30%<small>FASTER<br />FORM RENDER</small></div></div>;
}

function VerifySequence() {
  const steps = ["Scan", "Perform", "Validate", "Verify"];
  return <div className="verifyVisual"><div className="visualNote mono">FIELD CHECK / TRACEABLE RECORD</div><div className="phoneFrame"><div className="phoneFrame__top"><span>09:41</span><span>● ●</span></div><div className="scanBox"><span className="scanBeam" /><span className="scanCorner scanCorner--tl" /><span className="scanCorner scanCorner--tr" /><span className="scanCorner scanCorner--bl" /><span className="scanCorner scanCorner--br" /><small>SCAN ASSET QR</small></div><div className="phoneRows"><span>Asset location <b>LOCKED</b></span><span>Evidence attached <b>03 FILES</b></span></div></div><div className="verifyTrail">{steps.map((step, index) => <motion.div key={step} className={`verifyTrail__item verifyTrail__item--${index + 1}`} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.14, duration: 0.55, ease }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < 3 && <i />}</motion.div>)}</div><div className="verificationStamp"><Check size={16} /> VERIFIED</div></div>;
}

function ModuleReflow() {
  return <div className="moduleVisual"><div className="visualNote mono">REPRESENTATIVE INTERFACE — PRODUCTION DATA OMITTED</div><div className="adminShell"><div className="adminShell__nav"><b>EVERGREEN</b><span /><span /><span /><span /></div><div className="adminShell__main"><div className="adminShell__top"><span>Operations overview</span><button>Configure +</button></div><div className="metricTiles"><span><small>ORDERS</small><strong>1,248</strong></span><span><small>USERS</small><strong>482</strong></span><span><small>OPEN TASKS</small><strong>36</strong></span></div><div className="adminLower"><div className="dataTable"><b>Users <small>sort ↑</small></b><span /><span /><span /><span /></div><div className="permissionMatrix"><b>Permissions</b><i /><i /><i /><i /><i /></div></div></div><div className="configDrawer"><span>CONFIGURE</span><strong>Role access</strong><i /><i /><i /><button>Save changes</button></div></div><div className="reflowLabel mono">MODULES → SYSTEM</div></div>;
}

function TenantShift() {
  return <div className="tenantVisual"><div className="visualNote mono">ONE CODEBASE / THREE BRANDS</div><div className="tenantBoard"><div className="tenantNav"><span className="tenantLogo">W.</span><span className="tenantNav__line" /><span className="tenantNav__dot" /></div><div className="tenantContent"><small>BOOK AN APPOINTMENT</small><h4>Find a time<br />that works.</h4><div className="tenantStepper"><b>01 Service</b><span>02 Time</span><span>03 Confirm</span></div><div className="tenantCalendar"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div><div className="tenantTokens"><span style={{ "--token": "#4fd5d0" }}>WENDY</span><span style={{ "--token": "#7f63ff" }}>NORTH</span><span style={{ "--token": "#ff9a80" }}>HARBOR</span></div><div className="tenantCaption">Theme tokens shift. Structure stays clear.</div></div>;
}

function ThemeArena() {
  return <div className="arenaVisual"><div className="visualNote mono">MIGRATION LOG / REACT → NEXT.JS</div><div className="arenaPanels"><div className="arenaPanel arenaPanel--react"><span>REACT SPA</span><strong>One route.<br />One surface.</strong><i /><i /><i /></div><MoveRight className="arenaArrow" /><div className="arenaPanel arenaPanel--next"><span>NEXT.JS</span><strong>Routes<br />assembled.</strong><div className="arenaRoute"><i /><i /><i /></div></div></div><div className="arenaFooter"><span>SSR</span><span>SEO</span><span>20% performance gain</span></div></div>;
}

const interactionMap = { workflow: WorkflowRibbon, verify: VerifySequence, modules: ModuleReflow, tenant: TenantShift, arena: ThemeArena };

function CaseStudyChapter({ project }) {
  const Visual = interactionMap[project.interaction];
  return <motion.article className={`caseChapter caseChapter--${project.accent}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.8, ease }}>
    <div className="caseChapter__meta"><span className="caseChapter__number">{project.number}</span><span className="sectionKicker">{project.role}</span>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Open live project <ExternalLink size={14} /></a>}</div>
    <div className="caseChapter__grid"><div className="caseChapter__copy"><h3>{project.title}</h3><p className="caseChapter__subtitle">{project.subtitle}</p><p>{project.contribution}</p><div className="caseChapter__outcome"><span>Contribution outcome</span><strong>{project.outcome}</strong></div><div className="techList">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div><div className="caseChapter__visual"><Visual />{project.representative && <span className="representativeLabel mono">{project.representative}</span>}</div></div>
  </motion.article>;
}

function ProfessionalWork() {
  return <section id="work" className="section professional sectionAnchor"><div className="workIntro"><div><span className="sectionKicker">02 / Selected product work</span><h2>Interfaces for products where <em>the workflow matters.</em></h2></div><p>Complex forms, multi-step operations, permissions, scheduling, data-heavy dashboards, and responsive product systems.<br /><small>Selected visuals use public pages, sanitised screens, or representative interfaces.</small></p></div><div className="chapterStack">{professionalProjects.map((project) => <CaseStudyChapter key={project.id} project={project} />)}</div></section>;
}

function StoreMorph() {
  return <div className="storeVisual"><div className="visualNote mono">STOREFRONT / RESPONSIVE MORPH</div><div className="deviceRow"><div className="device device--desktop"><div className="device__screen"><span>INSTORIX</span><strong>Launch a store<br />that looks like you.</strong><i /><i /><i /></div></div><div className="device device--tablet"><div className="device__screen"><span>INSTORIX</span><strong>Launch<br />a store.</strong><i /><i /></div></div><div className="device device--mobile"><div className="device__screen"><span>SY</span><strong>Launch<br />your store.</strong><i /><i /></div></div></div><div className="storeFooter"><span>DESKTOP</span><MoveRight size={13} /><span>TABLET</span><MoveRight size={13} /><span>MOBILE</span><b>PAYMENT → MERCHANT</b></div></div>;
}

function PlayableGrid() {
  return <div className="playVisual"><div className="visualNote mono">ROOM / 7 × 7 / READY TO PLAY</div><div className="playGrid">{Array.from({ length: 49 }, (_, index) => <span key={index} className={[6, 7, 8, 15, 22, 29, 30, 31, 38, 45].includes(index) ? "isSnake" : [16, 24, 32].includes(index) ? "isPong" : [10, 11, 17].includes(index) ? "isMark" : ""} />)}</div><div className="playCallout"><span>ROOM CODE</span><strong>4K7—Q2</strong><small>invite a friend <ArrowUpRight size={11} /></small></div><div className="gameMotif">SNAKE <i /> PONG <i /> GRID</div></div>;
}

function IndependentProducts() {
  return <section id="products" className="section products sectionAnchor"><div className="sectionHeader sectionHeader--split"><div><span className="sectionKicker sectionKicker--signal">03 / Independent products</span><h2>Ideas taken from <em>blank page</em> to live URL.</h2></div><p>Personal products where product thinking, visual systems, and frontend engineering share the same surface.</p></div><div className="productSplit">{independentProjects.map((project) => <article key={project.id} className={`productPanel productPanel--${project.accent}`}><div className="productPanel__top"><span className="productPanel__id">{project.id === "instorix" ? "P / 01" : "P / 02"}</span><span className="productPanel__role">{project.role}</span></div><div className="productPanel__visual">{project.interaction === "store" ? <StoreMorph /> : <PlayableGrid />}</div><div className="productPanel__bottom"><div><h3>{project.title}</h3><p>{project.subtitle}</p><span>{project.description}</span></div>{project.url && <a className="button button--light" href={project.url} target="_blank" rel="noopener noreferrer">Open live project <ArrowUpRight size={15} /></a>}</div></article>)}</div></section>;
}

function LabArt({ accent }) {
  if (accent === "stryde") return <div className="posterArt posterArt--stryde"><span>AERO / 01</span><strong>MOVE<br />IN<br /><em>FORM</em></strong><div className="shoeShape" /></div>;
  if (accent === "naxus") return <div className="posterArt posterArt--naxus"><span>GRADE A / GLOBAL</span><strong>DEVICE<br />FLOW</strong><div className="deviceStack"><i /><i /><i /></div></div>;
  if (accent === "satyasee") return <div className="posterArt posterArt--satyasee"><span>ROOTED IN INDIA</span><strong>सत्यसी</strong><div className="spiceOrb" /><b>ORIGIN / 06</b></div>;
  if (accent === "todfood") return <div className="posterArt posterArt--todfood"><span>FROM THE KITCHEN / 01</span><strong>GOOD<br /><em>FOOD.</em></strong><div className="foodOrb" /><b>ORDER / SHARE / ENJOY</b></div>;
  return <div className="posterArt posterArt--noliqs"><span>SOFT / DRY / READY</span><strong>little<br /><em>comforts.</em></strong><div className="packShape" /><b>SIZE 4 / OVERNIGHT</b></div>;
}

function DesignLab() {
  return <section id="lab" className="section lab sectionAnchor"><div className="labIntro"><span className="sectionKicker sectionKicker--acid">04 / Design lab</span><h2>Brand worlds built to test <em>motion, composition,</em> and frontend craft.</h2><p>Independent marketing and interaction experiments. Four different tones, one shared interest in making the interface carry the idea.</p></div><div className="posterWall">{labProjects.map((project, index) => <motion.a key={project.id} className={`poster poster--${project.accent} poster--${index % 2 ? "offset" : ""}`} href={project.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ delay: index * 0.06, duration: 0.7, ease }}><div className="poster__tape" /><LabArt accent={project.accent} /><div className="poster__caption"><div><span className="mono">{project.role}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><ArrowUpRight size={17} /></div></motion.a>)}</div></section>;
}

function SkillSystem() {
  return <section id="system" className="section system sectionAnchor"><div className="systemIntro"><span className="sectionKicker">05 / The product system</span><h2>Tools organised around the <em>work they solve.</em></h2><p>From interface structure to APIs, PostgreSQL data, Prisma models, payment flows, and the last responsive detail, the stack follows the problem.</p></div><div className="systemGrid"><div className="skillColumns">{skillGroups.map((group) => <div className={`skillGroup skillGroup--${group.accent}`} key={group.title}><span className="mono">{group.title}</span><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div><div className="assembler"><div className="assembler__bar"><span className="mono">PRODUCT SYSTEM ASSEMBLER / READY</span><span>⌘ / 04</span></div><div className="appShell"><div className="appShell__nav"><i /><i /><i /><i /></div><div className="appShell__content"><div className="appShell__top"><span /><span /><span /></div><div className="appShell__form"><i /><i /><i /><b>SUBMIT</b></div><div className="appShell__data"><i /><i /><i /><i /></div></div></div><div className="assembler__legend"><span><i className="dot dot--cobalt" />Structure</span><span><i className="dot dot--violet" />Data + API</span><span><i className="dot dot--signal" />Interface</span><span><i className="dot dot--acid" />Delivery + payments</span></div></div></div></section>;
}

function EngineeringPrinciples() {
  const principles = ["Structure before animation", "Reusable components before repeated markup", "Responsive behaviour is part of the feature", "Performance is a product decision", "API states deserve intentional UX", "Complex workflows need visible progress", "Accessibility should survive redesign", "AI can accelerate work, but review owns quality"];
  return <section className="principles"><div className="principles__heading"><span className="sectionKicker">Working notes / 08</span><h2>How I approach<br /><em>frontend work.</em></h2></div><div className="principles__list">{principles.map((principle, index) => <motion.div key={principle} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ delay: index * 0.04, duration: 0.55, ease }}><span className="mono">0{index + 1}</span><strong>{principle}</strong><span className="principleMark">↗</span></motion.div>)}</div></section>;
}

function About() {
  return <section id="about" className="section about sectionAnchor"><div className="aboutIntro"><span className="sectionKicker sectionKicker--violet">06 / About</span><h2>A working history in <em>releases.</em></h2><p>Frontend delivery across complex workflows, reusable systems, and the connective tissue between product, design, and QA.</p></div><div className="aboutGrid"><div className="commitHistory"><div className="aboutLabel mono">WORK HISTORY / PRODUCT DELIVERY</div><div className="commitHistory__main"><span className="commitHash">MAIN</span><h3>{experience.title}</h3><p className="companyName">{experience.company}</p><p>{experience.dates}</p><p>{experience.description}</p><div className="highlightList">{experience.highlights.map((item) => <span key={item}><Check size={13} />{item}</span>)}</div></div><div className="commitHistory__timeline">{experience.milestones.map(([date, label]) => <div key={date}><span>{date}</span><strong>{label}</strong><i /></div>)}</div></div><div className="educationBlock"><div className="aboutLabel mono">EDUCATION / LANGUAGE SET</div><div className="eduItem"><span>01</span><div><strong>Master of Computer Applications</strong><p>Marwadi University <i>·</i> 2022</p></div></div><div className="eduItem"><span>02</span><div><strong>Bachelor of Computer Applications</strong><p>Marwadi University <i>·</i> 2020</p></div></div><div className="languageBlock"><span className="mono">LANGUAGES</span><div>{["English", "Hindi", "Marathi", "Gujarati"].map((language) => <span key={language}>{language}</span>)}</div></div></div></div></section>;
}

function Contact() {
  const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "Frontend role", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submissionState, setSubmissionState] = useState("idle");
  const [delivery, setDelivery] = useState("formspree");
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(`${form.type} enquiry from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "Not provided"}\nProject type: ${form.type}\n\n${form.message}`)}`;
  const submit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!web3FormsAccessKey) {
      setDelivery("mailto");
      setSubmitted(true);
      window.location.href = mailtoUrl;
      return;
    }
    setSubmissionState("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: web3FormsAccessKey, subject: `${form.type} enquiry from ${form.name}`, from_name: "Somnath Yadav Portfolio", ...form, project_type: form.type, botcheck: "" }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Form submission failed");
      setDelivery("formspree");
      setSubmitted(true);
      setSubmissionState("idle");
    } catch {
      setSubmissionState("error");
    }
  };
  const copyEmail = async () => { await navigator.clipboard?.writeText(site.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <section id="contact" className="contact sectionAnchor"><div className="contact__intro"><span className="sectionKicker sectionKicker--cyan">07 / Contact</span><h2>Have a product with a complicated frontend?<br /><em>Let’s make it clear.</em></h2><p>Send a note through the form or email me directly. I’ll get back to you with the next step.</p><div className="contact__email"><a href={`mailto:${site.email}`}>{site.email}</a><button onClick={copyEmail} aria-label="Copy email">{copied ? <Check size={15} /> : <Copy size={15} />}</button></div></div><div className="contact__formWrap">{submitted ? <div className="successState"><span className="successState__icon"><Check /></span><span className="mono">MESSAGE SENT</span><h3>Thanks, {form.name.split(" ")[0]}.</h3><p>{delivery === "formspree" ? "Your message is on its way. I’ll get back to you by email." : "Your email app should open with the message ready to send."}</p><a className="button button--dark" href={mailtoUrl}>Email directly <ArrowUpRight size={15} /></a><button className="textLink" onClick={() => setSubmitted(false)}>Send another message</button></div> : <form className="contactForm" onSubmit={submit}><div className="formRow"><label>Name<input name="name" value={form.name} onChange={update("name")} placeholder="Your name" required /></label><label>Email<input name="email" type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" required /></label></div><div className="formRow"><label>Company<input name="company" value={form.company} onChange={update("company")} placeholder="Optional" /></label><label>Project type<select name="project_type" value={form.type} onChange={update("type")}><option>Frontend role</option><option>Next.js full-stack product</option><option>Freelance project</option><option>SaaS product</option><option>Marketing website</option><option>Collaboration</option></select></label></div><label>Message<textarea name="message" value={form.message} onChange={update("message")} placeholder="What are you building?" rows={4} required /></label><div className="formBottom">{submissionState === "error" && <span className="formError" role="alert">Could not send automatically. Email me directly at {site.email}.</span>}<button className="button button--dark" type="submit" disabled={submissionState === "sending"}>{submissionState === "sending" ? "Sending…" : "Send message"} <ArrowUpRight size={15} /></button></div></form>}</div></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer__top"><div><div className="wordmark wordmark--footer"><Image className="syMark" src="/brand/sy-mark.svg" alt="" width={31} height={31} /><span>Somnath Yadav</span></div><p>Frontend Developer · Next.js Full-stack<br />Rajkot, India</p></div><div className="footer__links"><div><span className="mono">Navigate</span><button onClick={() => scrollToId("work")}>Work</button><button onClick={() => scrollToId("products")}>Products</button><button onClick={() => scrollToId("lab")}>Design Lab</button></div><div><span className="mono">Connect</span><a href={`mailto:${site.email}`}>Email</a></div></div></div><div className="footer__bottom"><span className="mono">© 2026 SOMNATH YADAV</span><strong>BUILD CLEARLY.</strong><span className="mono">REACT / NEXT.JS</span></div></footer>;
}

export default function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("intro");
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const ids = useMemo(() => navigation.map((item) => item.id), []);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? window.scrollY / max : 0);
      const current = ids.reduce((best, id) => { const node = document.getElementById(id); if (!node) return best; return Math.abs(node.getBoundingClientRect().top - 140) < best.distance ? { id, distance: Math.abs(node.getBoundingClientRect().top - 140) } : best; }, { id: "intro", distance: Infinity });
      setActiveId(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [ids]);
  return <div className={`siteShell ${reduceMotion ? "prefersReducedMotion" : ""}`}>
    <FieldGrid /><ScrollIndex activeId={activeId} /><BuildProgress progress={progress} /><Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main><Hero /><ImpactLedger /><ProfessionalWork /><IndependentProducts /><DesignLab /><SkillSystem /><EngineeringPrinciples /><About /><Contact /></main><Footer />
  </div>;
}
