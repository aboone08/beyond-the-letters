"use client";

import { useState, useMemo } from "react";
import data from "./data/d9-data.json";
import fireConfetti from "canvas-confetti";

type View =
  | "flash"
  | "about"
  | "intro"
  | "mod1"
  | "mod1test"
  | "mod2"
  | "mod2test"
  | "mod3"
  | "mod3test"
  | "summary"
  | "references";

/*   UbD STAGE 2 - Evidence of Learning
These knowledge check questions are the formal assessments for
Modules 2 and 3. Following UbD's backward design process, assessments
were defined before instructional activities were built, ensuring each
question maps directly to a Stage 1 learning goal. Questions are
written at the comprehension and application level (Bloom's Taxonomy)
to measure genuine understanding, not surface-level memorization. */

// Module 2 questions
const M2_QUESTIONS = [
  {
    q: "Which D9 organization led the 'Stroll to the Polls' voter-mobilization initiative?",
    a: "Alpha Kappa Alpha",
    options: ["Alpha Kappa Alpha", "Delta Sigma Theta", "Zeta Phi Beta", "Sigma Gamma Rho"],
  },
  {
    q: "Delta Sigma Theta Sorority was founded at the start of which historic 1913 event?",
    a: "The Women's Suffrage March on Washington",
    options: [
      "The Women's Suffrage March on Washington",
      "The Montgomery Bus Boycott",
      "The March on Washington for Jobs and Freedom",
      "The Selma to Montgomery March",
    ],
  },
  {
    q: "Dr. Martin Luther King Jr. was a member of which D9 fraternity?",
    a: "Alpha Phi Alpha",
    options: ["Alpha Phi Alpha", "Kappa Alpha Psi", "Omega Psi Phi", "Phi Beta Sigma"],
  },
  {
    q: "Which D9 member became the first Black woman elected to the U.S. Congress?",
    a: "Shirley Chisholm",
    options: ["Rosa Parks", "Shirley Chisholm", "Dorothy Height", "Fannie Lou Hamer"],
  },
  {
    q: "The NPHC was founded in 1930 at which historically Black university?",
    a: "Howard University",
    options: ["Howard University", "Spelman College", "Morehouse College", "Hampton University"],
  },
  {
    q: "Which primary pillar unites all nine D9 organizations in their external mission?",
    a: "Social Action",
    options: ["Social Action", "Athletics", "Exclusivity", "Entertainment"],
  },
  {
    q: "D9 organizations were originally created in response to which systemic barrier?",
    a: "Segregation and exclusion from campus opportunities",
    options: [
      "Segregation and exclusion from campus opportunities",
      "Lack of social clubs at HBCUs",
      "Low enrollment at historically Black colleges",
      "Inadequate sports programs",
    ],
  },
  {
    q: "Which fraternity launched the 'Bigger and Better Business' economic empowerment program?",
    a: "Phi Beta Sigma",
    options: ["Alpha Phi Alpha", "Omega Psi Phi", "Phi Beta Sigma", "Iota Phi Theta"],
  },
  {
    q: "Kamala Harris, the first female U.S. Vice President, is a member of which D9 sorority?",
    a: "Alpha Kappa Alpha",
    options: ["Alpha Kappa Alpha", "Delta Sigma Theta", "Zeta Phi Beta", "Sigma Gamma Rho"],
  },
];

// Module 3 questions 

/*UbD STAGE 2 - These questions assess Stage 1 transfer goals:
 can the learner apply understanding of D9 global impact and lifetime
 membership beyond the facts presented in the module content? */

 const M3_QUESTIONS = [
  {
    q: "True or False: D9 membership ends when a member graduates from college.",
    a: "False",
    options: ["True", "False"],
  },
  {
    q: "What do Graduate Chapters of D9 organizations primarily focus on?",
    a: "Community service and mentorship beyond the college campus",
    options: [
      "Community service and mentorship beyond the college campus",
      "Hosting social parties and events",
      "Recruiting new undergraduate members",
      "Managing college athletics programs",
    ],
  },
  {
    q: "Which of the following best describes the nature of D9 membership?",
    a: "A lifelong commitment to scholarship, service, and leadership",
    options: [
      "A lifelong commitment to scholarship, service, and leadership",
      "A four-year undergraduate program",
      "A temporary alliance that ends after initiation",
      "A college social phase",
    ],
  },
  {
    q: "The first D9 chapter established on the African continent was located in which country?",
    a: "Liberia",
    options: ["Liberia", "Ghana", "Nigeria", "South Africa"],
  },
  {
    q: "The NPHC serves what official role in relation to the nine D9 organizations?",
    a: "Governing body that coordinates and represents all nine organizations",
    options: [
      "Governing body that coordinates and represents all nine organizations",
      "A social club for alumni events",
      "A funding agency for scholarships",
      "A legal firm handling member disputes",
    ],
  },
  {
    q: "D9 organizations have established chapters in which of the following regions?",
    a: "Globally, including the United States, Africa, the Caribbean, and Europe",
    options: [
      "Globally, including the United States, Africa, the Caribbean, and Europe",
      "The United States only",
      "The American South only",
      "HBCUs only",
    ],
  },
  {
    q: "Which statement best captures a common myth about D9 organizations?",
    a: "They are only social clubs with no serious civic purpose",
    options: [
      "They are only social clubs with no serious civic purpose",
      "They focus entirely on academic excellence",
      "They provide lifelong professional networking",
      "They lead large-scale social action initiatives",
    ],
  },
  {
    q: "What term describes a person who was initiated into a D9 organization in the same intake group?",
    a: "Line Brother or Line Sister",
    options: [
      "Line Brother or Line Sister",
      "Blood relative",
      "Faculty advisor",
      "Alumni sponsor",
    ],
  },
  {
    q: "Beyond graduation, D9 members continue to serve their communities through which key structures?",
    a: "Graduate chapters, educational foundations, and international initiatives",
    options: [
      "Graduate chapters, educational foundations, and international initiatives",
      "Undergraduate chapters only",
      "Annual alumni galas",
      "Corporate board memberships",
    ],
  },
];


export default function D9Capstone() {
  const [view, setView] = useState<View>("flash");
/*  UbD STAGE 1 - Desired Results 
  The sequential module unlock system enforces the UbD principle that
  learners must demonstrate understanding before advancing. Each gate
  (motto match → M2 unlock, M2 reflection → M3 unlock, M3 reflection →
  summary) mirrors UbD's insistence that transfer of understanding is
  the goal, not mere completion of activities. */

  // Module 1 — Motto Match Game
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedMotto, setSelectedMotto] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [m1Status, setM1Status] = useState<"success" | "error" | null>(null);
  const shuffledMottos = useMemo(
    () => [...data.organizations].sort(() => Math.random() - 0.5),
    []
  );

  // Module 2 — Quiz
  const [m2Index, setM2Index] = useState(0);
  const [m2Score, setM2Score] = useState(0);
  const [m2Status, setM2Status] = useState<"correct" | "incorrect" | null>(null);
  const [m2Complete, setM2Complete] = useState(false);

  // Module 3 — Quiz
  const [m3Index, setM3Index] = useState(0);
  const [m3Score, setM3Score] = useState(0);
  const [m3Status, setM3Status] = useState<"correct" | "incorrect" | null>(null);
  const [m3Complete, setM3Complete] = useState(false);

  // Reflections

  /* UbD STAGE 2 - Open-ended reflection prompts are a key assessment
  tool in Understanding by Design. Unlike the knowledge checks (which
  measure recall and comprehension), reflections ask learners to make
  personal meaning from the content, a hallmark of UbD's emphasis on
  transfer and enduring understanding. Reflections are also required to
  unlock the next module, reinforcing that they are assessments, not
  optional extras. */

  const [reflections, setReflections] = useState({ intro: "", mod2: "", mod3: "" });

  const handleM1Match = (orgId: string, type: "org" | "motto") => {
    if (type === "org") {
      if (selectedMotto) {
        if (selectedMotto === orgId) {
          setMatches((prev) => [...prev, orgId]);
          setM1Status("success");
          setSelectedMotto(null);
        } else {
          setM1Status("error");
          setTimeout(() => {
            setM1Status(null);
            setSelectedMotto(null);
          }, 1000);
        }
      } else {
        setSelectedOrg(orgId);
      }
    } else {
      if (selectedOrg) {
        if (selectedOrg === orgId) {
          setMatches((prev) => [...prev, orgId]);
          setM1Status("success");
          setSelectedOrg(null);
        } else {
          setM1Status("error");
          setTimeout(() => {
            setM1Status(null);
            setSelectedOrg(null);
          }, 1000);
        }
      } else {
        setSelectedMotto(orgId);
      }
    }
  };

  const handleM2Answer = (choice: string) => {
    const isCorrect = choice === M2_QUESTIONS[m2Index].a;
    setM2Status(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setM2Score((prev) => prev + 1);

    setTimeout(() => {
      if (m2Index < M2_QUESTIONS.length - 1) {
        setM2Index((prev) => prev + 1);
        setM2Status(null);
      } else {
        setM2Complete(true);
        setView("mod2test");
        setM2Status(null);
      }
    }, 1000);
  };

  const handleM3Answer = (choice: string) => {
    const isCorrect = choice === M3_QUESTIONS[m3Index].a;
    setM3Status(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setM3Score((prev) => prev + 1);

    setTimeout(() => {
      if (m3Index < M3_QUESTIONS.length - 1) {
        setM3Index((prev) => prev + 1);
        setM3Status(null);
      } else {
        setM3Complete(true);
        setView("mod3test");
        setM3Status(null);
      }
    }, 1000);
  };

  // LANDING PAGE
  if (view === "flash") {
    return (
      <main className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-black text-white mb-4 tracking-tighter uppercase">
            Beyond the Letters
          </h1>
          <p className="text-orange-500 tracking-[0.3em] uppercase mb-10 font-light">
            A Digital Learning Experience
          </p>
          <button
            onClick={() => setView("about")}
            className="px-12 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase"
          >
            Enter to Learn More
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Static Nav */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-50 px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-sm tracking-tighter uppercase">
          BEYOND THE LETTERS
        </span>

        <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
          <button
            onClick={() => setView("about")}
            className={view === "about" ? "text-orange-600" : ""}
          >
            About
          </button>

          <button
            onClick={() => setView("intro")}
            className={view === "intro" ? "text-orange-600" : ""}
          >
            Intro
          </button>

          <button
            onClick={() => setView("mod1")}
            className={view.startsWith("mod1") ? "text-orange-600" : ""}
          >
            Module 1
          </button>

          {/* UbD STAGE 2 — Gated navigation enforces assessment before progression.
              The learner must successfully complete the Module 1 knowledge check
              (motto match) before accessing Module 2 content. This mirrors UbD's
              backward design principle: evidence of understanding must be
              demonstrated before moving to the next stage of learning. */}

          <button
            disabled={matches.length < 9}
            onClick={() => setView("mod2")}
            className={`${view.startsWith("mod2") ? "text-orange-600" : ""} ${
              matches.length < 9 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            {matches.length < 9 ? "🔒 Module 2" : "Module 2"}
          </button>

          {/* Module 3 unlocks when Module 2 reflection is submitted */}
          <button
            disabled={!reflections.mod2}
            onClick={() => setView("mod3")}
            className={`${view.startsWith("mod3") ? "text-orange-600" : ""} ${
              !reflections.mod2 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            {!reflections.mod2 ? "🔒 Module 3" : "Module 3"}
          </button>

          {/* Summary unlocks when Module 3 reflection is submitted */}
          <button
            disabled={!reflections.mod3}
            onClick={() => setView("summary")}
            className={`${view === "summary" ? "text-orange-600" : ""} ${
              !reflections.mod3 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            Summary
          </button>

          <button
            onClick={() => setView("references")}
            className={view === "references" ? "text-orange-600" : ""}
          >
            References
          </button>
        </div>
      </nav>

      {/* ABOUT */}
      {view === "about" && (
        <section className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in slide-in-from-bottom-4">
 
          {/* Header */}
          <div className="mb-14">
            <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">
              About This Project
            </h2>
            <div className="h-1 w-20 bg-orange-600 mb-6" />
            <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">
              Beyond the Letters — A Digital Learning Experience
            </p>
          </div>
 
          {/* Purpose Statement */}
          <div className="bg-slate-900 rounded-3xl p-10 mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-purple-600" />
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-orange-500 mb-4">
              The Purpose
            </span>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight mb-6">
              History Doesn't Disappear<br />Because It's Inconvenient.
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              This project was built with intention. At a moment when DEI initiatives are being dismantled, 
              when Black history is being removed from school curricula, and when the contributions of communities 
              of color are being minimized or erased, this experience exists as an act of preservation and resistance.
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              The Divine Nine were not born out of celebration. They were born out of exclusion. They were built by 
              Black students who were told, through policy and practice, that this country did not fully value or recognize 
              them. Rather than retreat, they chose to build something enduring. That origin story is not just historical. 
              For many, it is present tense.
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              This learning experience is designed to bring that story to anyone willing to engage with it. Especially those 
              who may feel, right now, that their identity, history, and belonging are under threat. The Divine Nine have 
              always found a way to progress, to influence, to teach, and to build community despite the opposition around them. 
              That legacy is worth knowing. It is worth protecting. And it is worth passing on.
            </p>
          </div>
 
          {/* Two-column: What & Why */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
 
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
              <h4 className="text-xs font-black uppercase text-orange-600 tracking-widest">
                What This Project Does
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Through three interactive modules, this experience moves beyond passive reading. Learners explore the identity 
                and mottos of all nine organizations, trace the D9's role in civil rights and political history, and examine 
                the lifetime commitment that defines membership, including its global reach today.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Knowledge checks, reflection prompts, and primary-source links are woven throughout, encouraging learners not 
                just to memorize facts, but to connect history to the present moment and to their own understanding of justice, 
                community, and belonging.
              </p>
            </div>
 
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
              <h4 className="text-xs font-black uppercase text-orange-600 tracking-widest">
                Who This Is For
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                This experience is for anyone who wants to understand the real history of the Divine Nine (not just the step 
                shows and Greek letters, but the scholarship, the sacrifice, the advocacy, and the impact that stretch across 
                more than a century).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                It is especially for those who have ever felt unseen by the history they were taught in school. The Divine Nine
                 are proof that communities shut out of mainstream narratives don't wait to be included, they write their own.
              </p>
            </div>
          </div>
 
          {/* Learning Objectives + Tech */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-black uppercase text-orange-600 tracking-widest mb-4">
                Learning Objectives
              </h4>
              <ul className="text-sm space-y-3 font-medium text-slate-700">
                <li className="flex gap-2"><span className="text-orange-500 shrink-0">→</span> Identify all nine NPHC organizations and their founding mottos.</li>
                <li className="flex gap-2"><span className="text-orange-500 shrink-0">→</span> Understand why the D9 were founded and the barriers they were created to overcome.</li>
                <li className="flex gap-2"><span className="text-orange-500 shrink-0">→</span> Recognize the D9's direct contributions to civil rights, political leadership, and civic engagement.</li>
                <li className="flex gap-2"><span className="text-orange-500 shrink-0">→</span> Appreciate the lifelong, global nature of D9 membership and its ongoing community impact.</li>
                <li className="flex gap-2"><span className="text-orange-500 shrink-0">→</span> Connect this history to the current fight for representation, equity, and belonging.</li>
              </ul>
            </div>
            <div className="md:border-l md:pl-8 border-slate-100">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">
                Built With
              </h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Tailwind CSS", "TypeScript"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-50 border rounded-full text-[10px] font-bold">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6 leading-relaxed italic">
                Designed and developed as a capstone project: a digital space where history, technology, and advocacy meet.
                This project is not affiliated nor endorsed by the NPHC or any organizations of the Divine Nine.
              </p>
            </div>
          </div>
 
          <div className="text-center">
            <button
              onClick={() => setView("intro")}
              className="text-orange-600 font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Continue to Learning Experience →
            </button>
          </div>
        </section>
      )}

      {/* INTRODUCTION */}
      {view === "intro" && (
        <section className="max-w-3xl mx-auto py-20 px-6">
          <h2 className="text-5xl font-black mb-8 uppercase text-center">
            The National Pan-Hellenic Council (NPHC)
          </h2>

          <div className="flex justify-center mb-12">
            <img
              src="/shields/nphc-logo.png"
              alt="NPHC Logo"
              className="h-50 w-auto opacity-90 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
            />
          </div>

          <p className="text-lg text-slate-600 text-center mb-8 leading-relaxed">
            The National Pan-Hellenic Council (NPHC), affectionately known as
            the Divine Nine, represents nine historically Black Greek-letter
            organizations founded between 1906 and 1963. These organizations
            were created during eras of segregation and systemic exclusion when
            Black students were denied access to many opportunities on college
            campuses.
          </p>

          <p className="text-lg text-slate-600 text-center mb-8 leading-relaxed">
            Founded May 10, 1930 at Howard University, the NPHC serves as the
            governing body for these nine organizations. Known as the "Divine
            Nine," these fraternities and sororities have spearheaded social
            action, civil rights, and academic excellence for over a century.
          </p>

          <p className="text-lg text-slate-600 text-center mb-8 leading-relaxed">
            More than social organizations, the Divine Nine became engines of
            leadership, scholarship, civic engagement, and social justice. Their
            members helped organize voter registration drives, challenge
            segregation, advocate for educational access, and shape Black
            cultural identity across the United States and around the world.
          </p>

          <p className="text-lg text-slate-600 text-center mb-12 leading-relaxed">
            In a time when diversity, equity, and inclusion efforts are
            increasingly under attack, understanding the history and impact of
            these organizations reminds us that Black history is American
            history. The Divine Nine continue to demonstrate the power of
            collective action, service, and lifelong commitment to uplifting
            communities.
          </p>
            {/* UbD STAGE 2 - Pre-Assessment / Activating Prior Knowledge
              This opening reflection prompt is a pre-assessment strategy from UbD.
              Before any content is delivered, learners are asked to surface what
              they already think, feel, or wonder about the subject. This activates
              prior knowledge, sets a personal purpose for learning, and gives the
              learner a reference point they can revisit at the end of the experience
              to measure how their thinking has changed (visible in the Summary view). */}

          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
            <h4 className="font-black text-xs uppercase mb-2 tracking-widest">
              Reflection: Initial Perspective
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              What do you hope to learn about the D9's social impact?
            </p>
            <textarea
              className="w-full p-4 rounded-xl border-2 border-orange-200 outline-none focus:border-orange-500 transition-all"
              rows={3}
              value={reflections.intro}
              onChange={(e) =>
                setReflections({ ...reflections, intro: e.target.value })
              }
              placeholder="Your thoughts..."
            />
            <button
              onClick={() => setView("mod1")}
              className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs"
            >
              Enter Module 1
            </button>
          </div>
        </section>
      )}

      {/* UbD STAGE 3: Learning Plan (Acquisition)
          The flip cards are the primary instructional activity for Module 1.
          In UbD's Stage 3, "acquisition" activities build the foundational
          knowledge learners need before they can make meaning or transfer it.
          Each card presents the facts (name, motto, colors, members) that
          learners will need to succeed in the Module 1 knowledge check.
          The interactive flip mechanic promotes active engagement with the
          material rather than passive reading — consistent with UbD's W-H-E-R-E-T-O
          principle of keeping learners engaged and exploring throughout. */}

      {/* MODULE 1: Study Cards */}
      {view === "mod1" && (
        <section className="max-w-7xl mx-auto py-12 px-6 animate-in fade-in duration-700">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black uppercase text-xs tracking-widest bg-orange-50 px-3 py-1 rounded-full font-mono">
              Module 1
            </span>
            <h2 className="text-5xl font-black uppercase mt-4 tracking-tighter">
              The Divine Nine
            </h2>
            <p className="text-slate-500 mt-4 italic max-w-2xl mx-auto">
              Flip each card to study the colors, mottos, and distinguished
              members of each organization. Click the buttons to connect and get
              more involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {data.organizations.map((org) => (
              <div key={org.id} className="group perspective h-[500px]">
                <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">

                  {/* Card Front */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-[2.5rem] border-4 flex flex-col items-center justify-center p-8 text-white shadow-xl"
                    style={{
                      backgroundColor: org.colors[0],
                      borderColor: org.colors[1],
                    }}
                  >
                    <div className="relative w-32 h-32 mb-6 flex items-center justify-center drop-shadow-2xl">
                      <img
                        src={org.shield}
                        alt={`${org.name} Shield`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-7xl font-serif font-bold mb-6 drop-shadow-md">
                      {org.letters}
                    </span>
                    <h3 className="text-2xl font-black text-center uppercase tracking-tighter mb-2 leading-tight">
                      {org.name}
                    </h3>
                  </div>

                  {/* Card Back */}
                  <div
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2.5rem] bg-white border-4 p-8 flex flex-col shadow-2xl overflow-hidden"
                    style={{ borderColor: org.colors[0] }}
                  >
                    {/* Watermark */}
                    <div className="absolute -top-4 -right-4 opacity-10 pointer-events-none">
                      <span
                        className="text-8xl font-serif font-bold italic"
                        style={{ color: org.colors[0] }}
                      >
                        {org.letters}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3
                        className="text-lg font-black uppercase mb-4"
                        style={{ color: org.colors[0] }}
                      >
                        {org.name}
                      </h3>

                      <div className="space-y-4 text-left flex-1 overflow-y-auto pr-2">
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">
                            Motto & Pillars
                          </h4>
                          <p className="text-xs font-bold italic mb-1">
                            "{org.motto}"
                          </p>
                          <p className="text-[10px] text-slate-500 leading-tight">
                            {org.pillars}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">
                            Official Colors
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {org.colorDetails.map((c, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div
                                  className={`h-5 w-5 rounded ${
                                    c.hex === "#FFFFFF"
                                      ? "border border-slate-200"
                                      : ""
                                  }`}
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span className="text-[9px] font-bold uppercase">
                                  {c.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400">
                              Symbol
                            </h4>
                            <p className="text-xs font-bold">{org.symbol}</p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400">
                              Flower
                            </h4>
                            <p className="text-xs font-bold">{org.flower}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">
                            Famous Members
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {org.famousMembers.map((m, i) => (
                              <span
                                key={i}
                                className="text-[9px] bg-slate-50 border px-2 py-1 rounded font-medium"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto space-y-2">
                        <a
                          href={org.chapterLocator}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
                        >
                          Find a Local Chapter
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>

                        <a
                          href={org.foundationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
                        >
                          Connect with Foundation
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setView("mod1test")}
              className="px-16 py-6 bg-orange-900 text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Enter Motto Match Challenge
            </button>
          </div>
        </section>
      )}

      {/* UbD STAGE 2 — Performance Task (Knowledge Check)
          The Motto Match is the Stage 2 assessment for Module 1. Rather than
          a standard multiple-choice quiz, it uses a matching performance task,
          a UbD-preferred format that requires learners to apply knowledge, not
          just select a remembered answer. Successfully pairing all nine
          organizations with their mottos demonstrates acquisition of the Module 1
          learning goals and unlocks Module 2, maintaining the integrity of the
          sequential UbD learning progression. */}
     
      {/* MODULE 1 TEST: Motto Match Game */}    
      {view === "mod1test" && (
        <section className="max-w-5xl mx-auto py-12 px-6">
          <button
            onClick={() => setView("mod1")}
            className="mb-8 flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Study Cards
          </button>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase mb-2">
              Motto Match Challenge
            </h2>
            <div
              className={`h-8 font-bold uppercase text-sm ${
                m1Status === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {m1Status === "success"
                ? "Correct Match! ✅"
                : m1Status === "error"
                ? "Try Again ❌"
                : ""}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Organizations column */}
            <div className="space-y-3">
              {data.organizations.map((org) => (
                <button
                  key={org.id}
                  disabled={matches.includes(org.id)}
                  onClick={() => handleM1Match(org.id, "org")}
                  className={`w-full p-4 rounded-xl border-2 text-left text-xs font-bold transition-all 
                    ${
                      matches.includes(org.id)
                        ? "bg-green-500 border-green-600 text-white"
                        : selectedOrg === org.id
                        ? m1Status === "error"
                          ? "bg-red-500 border-red-600 text-white"
                          : "border-blue-600 bg-blue-50"
                        : "bg-white border-slate-200"
                    }`}
                >
                  {org.name} {matches.includes(org.id) && "✅"}
                </button>
              ))}
            </div>

            {/* Mottos column (shuffled) */}
            <div className="space-y-3">
              {shuffledMottos.map((org) => (
                <button
                  key={`motto-${org.id}`}
                  disabled={matches.includes(org.id)}
                  onClick={() => handleM1Match(org.id, "motto")}
                  className={`w-full p-4 rounded-xl border-2 text-left text-xs italic transition-all h-[64px] 
                    ${
                      matches.includes(org.id)
                        ? "bg-green-500 border-green-600 text-white"
                        : selectedMotto === org.id
                        ? m1Status === "error"
                          ? "bg-red-500 border-red-600 text-white"
                          : "border-blue-600 bg-blue-50"
                        : "bg-white border-slate-200"
                    }`}
                >
                  "{org.motto}" {matches.includes(org.id) && "✅"}
                </button>
              ))}
            </div>
          </div>

          {matches.length === 9 && (
            <button
              onClick={() => setView("mod2")}
              className="mt-12 w-full py-5 bg-green-600 text-white font-black rounded-2xl uppercase animate-bounce"
            >
              Module 1 Cleared! Unlock Module 2 →
            </button>
          )}
        </section>
      )}

      {/* UbD STAGE 3 - Learning Plan (Making Meaning + Transfer)
          Module 2 moves learners from acquisition into meaning-making. The
          content here asks learners to connect historical D9 advocacy to the
          present, a transfer goal central to UbD Stage 1. The essential
          question ("How Have the Divine Nine Helped Shape American Democracy?")
          is displayed prominently because UbD holds that learners should always
          know the purpose of what they are studying and why it matters. */}
      
      {/* MODULE 2: Content + Quiz */}
      {view === "mod2" && (
        <section className="max-w-4xl mx-auto py-20 px-6">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black uppercase text-xs tracking-widest bg-orange-50 px-3 py-1 rounded-full font-mono">
              Module 2
            </span>
            <h2 className="text-5xl font-black uppercase mt-4 tracking-tighter">
              The Vanguard — Advocacy, Activism, and Social Change
            </h2>
            <p className="text-slate-500 mt-4 italic max-w-2xl mx-auto">
              Explore how Divine Nine members and organizations shaped voting
              rights, civil rights, education, and political leadership.
            </p>
          </div>

          {/* Essential Question block */}
          <div className="bg-gradient-to-br from-orange-50 to-slate-50 border border-orange-100 rounded-3xl p-8 mb-12 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-4">
              Essential Question
            </span>

            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-slate-900">
              How Have the Divine Nine Helped Shape American Democracy?
            </h3>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              From their earliest days, the Divine Nine have been catalysts for
              social change. Founded during an era of segregation and systemic
              exclusion, these organizations created spaces where Black students
              could develop as scholars, leaders, and advocates. What began on
              college campuses quickly evolved into a powerful network of
              individuals committed to challenging injustice and expanding
              opportunity.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Members of the Divine Nine played visible and often pivotal roles
              in the Civil Rights Movement. They organized marches, led voter
              registration campaigns, supported legal challenges to segregation,
              and used their collective influence to advance education, economic
              empowerment, and political participation. Their efforts helped
              transform the ideals of equality and justice into concrete change.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The impact of the Divine Nine continues today. Initiatives such as
              "Stroll to the Polls" demonstrate how these organizations blend
              cultural tradition with civic engagement, mobilizing communities
              to vote and participate in democracy. Their legacy reminds us that
              service and advocacy are enduring responsibilities.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-orange-100">
              <h4 className="font-black uppercase text-xs tracking-widest text-orange-600 mb-3">
                In This Module You Will:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 font-medium">
                <li>• Explore how the Divine Nine contributed to the Civil Rights Movement.</li>
                <li>• Examine notable members who influenced politics and public policy.</li>
                <li>• Connect historical activism to contemporary civic engagement efforts.</li>
                <li>• Reflect on the relationship between culture, leadership, and democracy.</li>
              </ul>
            </div>

            {/* UbD STAGE 3 — W-H-E-R-E-T-O Principle (Equip & Explore)
                UbD's W-H-E-R-E-T-O framework calls for instruction that equips
                learners with the tools they need to succeed at the assessment.
                These three multimodal resources (read, watch, explore) address
                different learning modalities and give learners multiple entry
                points into the same core content. A UbD instructional strategy
                to ensure access and depth across diverse learners. */}

            {/* Module 2 Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">📖</span>
                <h4 className="font-bold mt-2">Read</h4>
                <p className="text-xs text-slate-500 mb-4">
                  How the Divine Nine Shaped the Civil Rights Movement
                </p>
                <a
                  href="https://ireishprint.com/blog/divine-nine-impact-on-civil-rights-movement/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Open Article
                </a>
              </div>
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">🎞️</span>
                <h4 className="font-bold mt-2">Watch</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Stroll to the Polls (4:07)
                </p>
                <a
                  href="https://www.11alive.com/article/news/local/atlanta-stroll-to-the-polls-video-images-go-viral/85-b8541896-40d5-40c3-8a32-81d3982b6324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Play Video
                </a>
              </div>
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">📖</span>
                <h4 className="font-bold mt-2">Read</h4>
                <p className="text-xs text-slate-500 mb-4">
                  The Historical Legacy of the Divine Nine — NMAAHC
                </p>
                <a
                  href="https://nmaahc.si.edu/explore/stories/divine-nine-black-fraternities-sororities"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Open Article
                </a>
              </div>
            </div>
          </div>

          {/* UbD STAGE 2 — Formative Assessment
              This 9-question quiz is a formative knowledge check aligned to the
              Module 2 essential question and learning objectives. It provides
              immediate feedback (correct/incorrect with a 1-second reveal) so
              learners can self-assess before writing their reflection. Once
              completed, the quiz is replaced with a score summary, preventing
              re-attempts and preserving the assessment data carried forward
              to the Summary view. */}
          {m2Complete ? (
            <div className="bg-green-50 border-2 border-green-200 p-8 rounded-3xl text-center">
              <p className="text-2xl mb-2">✅</p>
              <h3 className="font-black uppercase text-green-800 text-lg mb-1">
                Knowledge Check Complete
              </h3>
              <p className="text-orange-700 font-bold text-sm">
                Your score: {m2Score} / {M2_QUESTIONS.length}
              </p>
              <button
                onClick={() => setView("mod2test")}
                className="mt-6 px-8 py-3 bg-orange-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition-all"
              >
                View Reflection →
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Question {m2Index + 1} of {M2_QUESTIONS.length}
                </span>
                <span className="text-xs font-black text-green-600 uppercase">
                  Score: {m2Score}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-6">
                {M2_QUESTIONS[m2Index].q}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {M2_QUESTIONS[m2Index].options.map((opt) => (
                  <button
                    key={opt}
                    disabled={m2Status !== null}
                    onClick={() => handleM2Answer(opt)}
                    className={`p-4 rounded-xl border-2 font-bold text-left transition-all 
                      ${
                        m2Status === "correct" &&
                        opt === M2_QUESTIONS[m2Index].a
                          ? "bg-green-500 border-green-600 text-white"
                          : m2Status === "incorrect" &&
                            opt !== M2_QUESTIONS[m2Index].a
                          ? "bg-red-500 border-red-600 text-white"
                          : "bg-slate-50 border-slate-100 hover:border-slate-300"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* UbD STAGE 2: Open-Ended Assessment (Making Meaning)
          The reflection prompt is UbD's primary tool for assessing whether a
          learner has moved beyond acquisition into genuine meaning-making. The
          prompt ("How does knowing the political history of these organizations
          change your view of Greek life?") requires learners to synthesize what
          they studied and connect it to their own perspective — the definition
          of transfer in UbD. This response also gates Module 3 access, making
          reflection a required assessment rather than an optional activity. */}
      {view === "mod2test" && (
        <section className="max-w-2xl mx-auto py-20 px-6 animate-in fade-in zoom-in duration-500">
          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100 shadow-lg">
            <div className="mb-6">
              <h4 className="font-black text-sm uppercase mb-1 tracking-tighter text-orange-900">
                Module 2 Complete
              </h4>
              <p className="text-xs font-bold text-orange-600 uppercase">
                Final Score: {m2Score} / {M2_QUESTIONS.length}
              </p>
            </div>

            <h4 className="font-black text-sm uppercase mb-4">
              Reflection: Leadership & Advocacy
            </h4>
            <p className="text-xs text-slate-500 mb-4 italic">
              How does knowing the political history of these organizations
              change your view of Greek life?
            </p>

            <textarea
              className="w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
              rows={4}
              value={reflections.mod2}
              onChange={(e) =>
                setReflections({ ...reflections, mod2: e.target.value })
              }
              placeholder="Type your reflection here to unlock Module 3..."
            />

            <button
              disabled={!reflections.mod2.trim()}
              onClick={() => setView("mod3")}
              className={`mt-4 w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest text-xs
                ${
                  reflections.mod2.trim()
                    ? "bg-orange-600 text-white hover:bg-orange-700 shadow-md"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              {reflections.mod2.trim()
                ? "Continue to Module 3"
                : "Please provide a reflection"}
            </button>
          </div>
        </section>
      )}

      {/* UbD STAGE 3: Learning Plan (Transfer)
          Module 3 represents the highest level of the UbD learning progression:
          transfer. Learners are no longer just acquiring facts or making meaning
          within the module, they are asked to apply their understanding to a
          broader question about legacy, lifetime commitment, and global community.
          The essential question ("What Does It Mean to Belong to a Legacy That
          Lasts a Lifetime?") is an enduring understanding question, the kind
          UbD reserves for ideas that remain relevant and revisitable long after
          the learning experience ends. */}

      {/* MODULE 3: Content + Quiz */}
      {view === "mod3" && (
        <section className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in duration-700">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black uppercase text-xs tracking-widest bg-orange-50 px-3 py-1 rounded-full font-mono">
              Module 3
            </span>
            <h2 className="text-5xl font-black uppercase mt-4 tracking-tighter">
              Global Infrastructure
            </h2>
            <p className="text-slate-500 mt-4 italic max-w-2xl mx-auto">
              Explore the lifelong commitment, graduate chapters, and worldwide
              reach of the Divine Nine.
            </p>
          </div>

          {/* Essential Question block */}
          <div className="bg-gradient-to-br from-orange-50 to-slate-50 border border-orange-100 rounded-3xl p-8 mb-12 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-4">
              Essential Question
            </span>

            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-slate-900">
              What Does It Mean to Belong to a Legacy That Lasts a Lifetime?
            </h3>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The Divine Nine are often introduced on college campuses, but
              their impact extends far beyond undergraduate years. Membership is
              a lifelong commitment to scholarship, service, leadership, and the
              continued advancement of Black communities around the world.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Through graduate chapters, educational foundations, and
              international initiatives, members continue to mentor students,
              award scholarships, support public health campaigns, promote
              economic empowerment, and advocate for social justice long after
              graduation. These organizations demonstrate how shared values and
              collective action can build institutions that endure for
              generations.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The global reach of the Divine Nine reflects the widespread
              influence of the African diaspora. From the United States to
              Liberia, Europe, the Caribbean, and beyond, these organizations
              have established chapters and partnerships that connect members
              through service and cultural preservation. Their work shows that
              Black excellence and community uplift know no geographic
              boundaries.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-purple-100">
              <h4 className="font-black uppercase text-xs tracking-widest text-orange-600 mb-3">
                In This Module You Will:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 font-medium">
                <li>• Understand the lifelong commitment associated with Divine Nine membership.</li>
                <li>• Explore how graduate chapters and foundations sustain service initiatives.</li>
                <li>• Examine the international expansion of D9 organizations across the African diaspora.</li>
                <li>• Reflect on the meaning of legacy, responsibility, and global community impact.</li>
              </ul>
            </div>

            {/* Module 3 Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">📖</span>
                <h4 className="font-bold mt-2">Read</h4>
                <p className="text-xs text-slate-500 mb-4">
                  What Is the Divine Nine and Why Does It Matter
                </p>
                <a
                  href="https://ireishprint.com/blog/what-is-the-divine-nine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Open Article
                </a>
              </div>
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">🎞️</span>
                <h4 className="font-bold mt-2">Watch</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Twenty Pearls: The Story of Alpha Kappa Alpha Sorority (1:31:12)
                </p>
                <a
                  href="https://www.youtube.com/watch?v=0hOnQke98XY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Play Video
                </a>
              </div>
              <div className="p-6 bg-white border rounded-3xl text-center">
                <span className="text-2xl">📖</span>
                <h4 className="font-bold mt-2">Read</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Where the Bridge First Formed: How Liberia Became the First
                  Home of the Divine Nine in Africa
                </p>
                <a
                  href="https://www.watchtheyard.com/history/how-liberia-became-the-first-home-of-the-divine-nine-in-africa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-[10px] font-black uppercase tracking-widest"
                >
                  Open Article
                </a>
              </div>
            </div>
          </div>

          {/* UbD STAGE 2 - Summative Assessment (Transfer Goals)
              The Module 3 knowledge check is the final formal assessment before
              the capstone reflection. Questions are written to assess understanding,
              can the learner apply knowledge of D9 global reach and lifetime membership 
              to new contexts beyond the module content? As with Module 2, the completed 
              state persists so scores are preserved accurately in the final Summary view. */}
          {m3Complete ? (
            <div className="bg-green-50 border-2 border-green-200 p-8 rounded-3xl text-center">
              <p className="text-2xl mb-2">✅</p>
              <h3 className="font-black uppercase text-green-800 text-lg mb-1">
                Knowledge Check Complete
              </h3>
              <p className="text-green-700 font-bold text-sm">
                Your score: {m3Score} / {M3_QUESTIONS.length}
              </p>
              <button
                onClick={() => setView("mod3test")}
                className="mt-6 px-8 py-3 bg-orange-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition-all"
              >
                View Reflection →
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Question {m3Index + 1} of {M3_QUESTIONS.length}
                </span>
                <span className="text-xs font-black text-orange-600 uppercase">
                  Correct: {m3Score}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-6 text-slate-800">
                {M3_QUESTIONS[m3Index].q}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {M3_QUESTIONS[m3Index].options.map((opt) => (
                  <button
                    key={opt}
                    disabled={m3Status !== null}
                    onClick={() => handleM3Answer(opt)}
                    className={`p-4 rounded-xl border-2 font-bold text-left transition-all 
                      ${
                        m3Status === "correct" &&
                        opt === M3_QUESTIONS[m3Index].a
                          ? "bg-green-500 border-green-600 text-white"
                          : m3Status === "incorrect" &&
                            opt !== M3_QUESTIONS[m3Index].a
                          ? "bg-red-500 border-red-600 text-white"
                          : "bg-slate-50 border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    {opt}
                    {m3Status === "correct" &&
                      opt === M3_QUESTIONS[m3Index].a &&
                      " ✅"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* UbD STAGE 2 - Capstone Reflection (Enduring Understanding)
          This is the final required assessment of the experience. The prompt
          ("What does 'Lifetime Commitment' mean in terms of community service?")
          asks the learner to articulate an enduring understanding, one of UbD's
          core Stage 1 goals. A meaningful response to this question demonstrates
          that the learner has moved from knowing facts about the Divine Nine to
          genuinely understanding what their legacy represents. Completion of this
          reflection unlocks the Summary and triggers the confetti celebration,
          marking the full transfer of learning. */}
      {view === "mod3test" && (
        <section className="max-w-2xl mx-auto py-20 px-6 animate-in zoom-in duration-500">
          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-200 shadow-lg">
            <div className="mb-6">
              <h4 className="font-black text-sm uppercase mb-1 tracking-tighter text-orange-900">
                Module 3 Complete
              </h4>
              <p className="text-xs font-bold text-orange-600 uppercase">
                Final Score: {m3Score} / {M3_QUESTIONS.length}
              </p>
            </div>

            <h4 className="font-black text-sm uppercase mb-4 text-orange-900">
              Reflection: Lifetime Commitment
            </h4>
            <p className="text-xs text-slate-500 mb-4 italic">
              What does "Lifetime Commitment" mean in terms of community
              service?
            </p>

            <textarea
              className="w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none transition-all"
              rows={4}
              value={reflections.mod3}
              onChange={(e) =>
                setReflections({ ...reflections, mod3: e.target.value })
              }
              placeholder="Share your final thoughts to complete the experience..."
            />

            <button
              disabled={!reflections.mod3.trim()}
              onClick={() => {
                setView("summary");
                fireConfetti();
              }}
              className={`mt-6 w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-sm
                ${
                  reflections.mod3.trim()
                    ? "bg-orange-600 text-white hover:bg-orange-700 shadow-xl scale-100 hover:scale-[1.02]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              {reflections.mod3.trim()
                ? "🏁 Finish Experience"
                : "Complete Reflection to Finish"}
            </button>
          </div>
        </section>
      )}

      {/* UbD STAGE 2 — Evidence of Learning (Complete Record)
          The Summary view is the learner's final evidence portfolio. It surfaces
          all three assessment types from across the experience: the Module 1
          performance task (motto match completion), the Module 2 and 3 knowledge
          check scores (formative assessment data), and all three personal
          reflections (open-ended transfer evidence). Displaying these together
          at the end is a deliberate UbD design choice — it allows the learner
          to see the full arc of their engagement and measure how their thinking
          evolved from the opening pre-assessment reflection through to the
          capstone enduring understanding response. */}
      
      {/* SUMMARY */}
      {view === "summary" && (
        <section className="max-w-5xl mx-auto py-20 px-6 animate-in zoom-in duration-700">
          <div className="bg-white rounded-[3rem] border-4 border-slate-900 p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-yellow-500 to-purple-600" />

            <div className="mb-10">
              <div className="inline-block p-4 rounded-full bg-green-50 text-green-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">
                Capstone Complete
              </h2>
              <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">
                Divine Nine Digital Learning Experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 text-left">
                  Knowledge Check Stats
                </h3>
                <div className="p-4 bg-slate-50 rounded-xl text-left">
                  <p className="text-sm font-bold">
                    Module 1:{" "}
                    <span className="text-orange-600">Complete</span>
                  </p>
                  <p className="text-sm font-bold">
                    Module 2 Score:{" "}
                    <span className="text-orange-600">
                      {m2Score}/{M2_QUESTIONS.length}
                    </span>
                  </p>
                  <p className="text-sm font-bold">
                    Module 3 Score:{" "}
                    <span className="text-orange-600">
                      {m3Score}/{M3_QUESTIONS.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 text-left">
                  Your Reflections
                </h3>
                <div className="space-y-4 text-left">
                  <div className="text-xs">
                    <span className="font-bold block text-orange-600">
                      Intro:
                    </span>
                    <p className="italic text-slate-600">
                      "{reflections.intro || "No reflection provided."}"
                    </p>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold block text-orange-600">
                      Module 2:
                    </span>
                    <p className="italic text-slate-600">
                      "{reflections.mod2 || "No reflection provided."}"
                    </p>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold block text-orange-600">
                      Module 3:
                    </span>
                    <p className="italic text-slate-600">
                      "{reflections.mod3 || "No reflection provided."}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-400 italic text-sm">
                Thank you for engaging with this interactive learning experience.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
                <button
                  onClick={() => window.print()}
                  className="px-8 py-4 border-2 border-slate-900 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                >
                  Save Results (PDF)
                </button>
                <button
                  onClick={() => setView("references")}
                  className="px-8 py-4 bg-orange-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition-all"
                >
                  View References
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setView("flash")}
            className="mt-12 block mx-auto text-slate-400 text-xs font-bold uppercase tracking-[0.3em] hover:text-slate-900 transition-colors"
          >
            Restart Experience
          </button>
        </section>
      )}

 {/* ── REFERENCES ── */}
 {view === "references" && (
        <section className="max-w-5xl mx-auto py-16 px-6 animate-in fade-in duration-500">
 
          {/* ── Page Header ── */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">
              Sources & Resources
            </h2>
            <div className="h-1 w-16 bg-orange-600 mx-auto mb-4" />
            <p className="text-slate-500 text-sm tracking-widest uppercase">
              The Divine Nine Digital Learning Experience
            </p>
          </div>
 
          {/* Row 1: Governance + Official Org Websites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 
            {/* National Governance */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b border-slate-100 pb-3">
                National Governance
              </h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-sm font-bold text-slate-800">National Pan-Hellenic Council, Inc.</p>
                  <a href="https://nphchq.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:underline">nphchq.com</a>
                </li>
                <li>
                  <p className="text-sm font-bold text-slate-800">Smithsonian NMAAHC</p>
                  <a href="https://nmaahc.si.edu/explore/collection" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:underline">nmaahc.si.edu/explore/collection</a>
                </li>
              </ul>
            </div>
 
            {/* Official Organization Websites */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b border-slate-100 pb-3">
                Official Organization Websites
              </h3>
              <p className="text-xs text-slate-400 italic">
                Symbols, colors, and notable member data were curated from each organization's official national website.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {data.organizations.map((org) => (
                  <a key={org.id} href={org.website} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-orange-300 hover:bg-orange-50 transition-all">
                    <span className="text-xs font-black uppercase text-slate-700 group-hover:text-orange-700 transition-colors leading-tight">{org.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0 text-slate-200 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
 
          {/* Row 2: Glossary */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4 mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b border-slate-100 pb-3">
              Glossary of Key Terms
            </h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
              {[
                { term: "NPHC",                      def: "National Pan-Hellenic Council — the governing body for all nine historically Black Greek-letter organizations, founded in 1930 at Howard University." },
                { term: "Divine Nine",               def: "The collective name for the nine NPHC fraternities and sororities founded between 1906 and 1963." },
                { term: "HBCU",                      def: "Historically Black College or University — institutions established primarily to serve the African American community." },
                { term: "Undergraduate Chapter",     def: "A D9 chapter based on a college campus, open to currently enrolled students." },
                { term: "Graduate Chapter",          def: "A chapter composed of initiated alumni who continue serving their communities after graduation." },
                { term: "Intake Process",            def: "The formal membership selection and initiation process used by D9 organizations." },
                { term: "Line Brother / Line Sister",def: "A fellow member initiated into a D9 organization during the same intake group or 'line.'" },
                { term: "Stroll to the Polls",       def: "A voter-mobilization initiative blending D9 step culture with civic engagement." },
                { term: "Social Action",             def: "The shared external pillar of all nine D9 organizations — advocacy, civic engagement, and community service." },
                { term: "African Diaspora",          def: "The global community of people of African descent living outside the African continent." },
                { term: "Civic Engagement",          def: "Active participation in the political and social life of one's community." },
                { term: "Legacy Member",             def: "A person who joins a D9 organization that a close family member already belongs to." },
              ].map(({ term, def }) => (
                <div key={term} className="flex gap-3">
                  <dt className="text-[10px] font-black text-slate-900 uppercase tracking-wide shrink-0 w-28 pt-0.5">{term}</dt>
                  <dd className="text-[10px] text-slate-500 leading-relaxed">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
 
          {/* Row 3: Module Resources */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-600 border-b border-slate-100 pb-3 mb-5">
              Module Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {[
                { module: "Module 2", type: "Read",    icon: "📖", title: "How the Divine Nine Shaped the Civil Rights Movement",                              href: "https://ireishprint.com/blog/divine-nine-impact-on-civil-rights-movement/",                                                                              domain: "ireishprint.com" },
                { module: "Module 2", type: "Watch",   icon: "🎞️", title: "Stroll to the Polls (4:07)",                                                        href: "https://www.11alive.com/article/news/local/atlanta-stroll-to-the-polls-video-images-go-viral/85-b8541896-40d5-40c3-8a32-81d3982b6324",             domain: "11alive.com" },
                { module: "Module 2", type: "Read", icon: "📖", title: "The Historical Legacy of the Divine Nine — Smithsonian NMAAHC",                     href: "https://nmaahc.si.edu/explore/stories/divine-nine-black-fraternities-sororities",                                                                    domain: "nmaahc.si.edu" },
                { module: "Module 3", type: "Read",    icon: "📖", title: "What Is the Divine Nine and Why Does It Matter",                                     href: "https://ireishprint.com/blog/what-is-the-divine-nine/",                                                                                              domain: "ireishprint.com" },
                { module: "Module 3", type: "Watch",   icon: "🎞️", title: "Twenty Pearls: The Story of Alpha Kappa Alpha Sorority (1:31:12)",                   href: "https://www.youtube.com/watch?v=0hOnQke98XY",                                                                                                        domain: "youtube.com" },
                { module: "Module 3", type: "Read",    icon: "📖", title: "Where the Bridge First Formed: How Liberia Became the First Home of the Divine Nine", href: "https://www.watchtheyard.com/history/how-liberia-became-the-first-home-of-the-divine-nine-in-africa/",                                               domain: "watchtheyard.com" },
              ].map(({ module, type, icon, title, href, domain }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-300 hover:bg-orange-50 transition-all">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">{module}</span>
                      <span className="text-[9px] text-slate-300">·</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{type}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-orange-700 transition-colors line-clamp-2">{title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{domain}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0 mt-1 text-slate-200 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all ml-auto">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
 
          {/* Acknowledgements */}
          <div className="bg-slate-900 rounded-2xl p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-purple-600" />
 
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">
                Acknowledgements
              </h3>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                With Gratitude
              </h4>
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
 
                {/* D9 Brothers & Sisters */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-base shrink-0">✊🏾</div>
                    <h5 className="text-white font-black uppercase text-xs tracking-widest leading-tight">My D9 Brothers & Sisters</h5>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To my brothers and sisters across the Divine Nine, thank you. Your review of this content, your input, your honesty, 
                    and your lived experience gave this project depth and authenticity that no textbook could provide. Your support from 
                    the earliest idea to the final submission made all the difference. This work is rooted in your legacy, and I am honored 
                    to carry it forward.
                  </p>
                </div>
 
                {/* Classmates & Professors */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-base shrink-0">🎓</div>
                    <h5 className="text-white font-black uppercase text-xs tracking-widest leading-tight">My Classmates & Professors</h5>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To my classmates and professors: your words of encouragement carried me further than you know. The feedback, the 
                    late-night motivation, the genuine investment in each other's success: that is the spirit of this work. Thank you 
                    for creating a space where curiosity and creativity could thrive, and for cheering me on every step of the way.
                  </p>
                </div>
 
                {/* Family & Friends */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-base shrink-0">🏡</div>
                    <h5 className="text-white font-black uppercase text-xs tracking-widest leading-tight">My Family & Friends</h5>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To my family and friends: your love and patience throughout this journey meant everything. You celebrated every 
                    milestone, offered grace on the hard days, and reminded me of what this work is truly for. None of this would have 
                    been possible without the foundation you provide. Thank you for always believing in me, even when I doubted myself.
                  </p>
                </div>
              </div>
 
              <p className="text-center text-slate-500 text-xs italic mt-8">
              "We have a torch and we should use it to lighten everyone else's darkness." - Ethel Hedgemon Lyle (AKA Founder)
              </p>
            </div>
          </div>
 
          {/* ── Footer nav ── */}
          <div className="text-center">
            <button
              onClick={() => setView("intro")}
              className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              ← Back to Introduction
            </button>
          </div>
        </section>
      )}
    </main>
  );
}