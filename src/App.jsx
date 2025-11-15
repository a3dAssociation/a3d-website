/*
A3D — Single-file React app (App.tsx)

Updated: full think-tank skeleton
- Enforces Times New Roman site-wide (inline root style)
- Pure black & white palette
- Pages: Home, Articles, Article Detail, Videos, Publications (Policy Briefs), About (Founders + Advisory Board), Contact/Press, Subscribe
- Search + tag filtering on Articles
- Newsletter signup UI (placeholder)
- Footer with credibility microcopy

How to use: same instructions as before (Vite + Tailwind + react-router-dom + framer-motion + lucide-react)
*/

import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

// --- Sample data ---
const articles = [
  {
    id: 'a3d-intro',
    title: 'Welcome to A3D — Emancipation with Dissemination',
    excerpt: 'An opening reflection on the role of the welfare state and democratic institutions.',
    content: `This opening piece frames our central question — “state is welfare?” — and outlines how A3D will examine law, policy, and civic agency to answer that question through evidence-based research and public engagement.`,
    date: '2025-11-14',
    tags: ['constitutional law', 'theory'],
    author: 'Subrat Suman',
  },
  {
    id: 'free-speech-essay',
    title: 'Free Speech and Its Limits: An Academic Primer',
    excerpt: 'Explainer on constitutional contours of free speech with classroom prompts.',
    content: 'Full article content goes here. Use Markdown or rich text in your CMS; this demo uses plain text.',
    date: '2025-10-01',
    tags: ['civil liberties'],
    author: 'Partner Name',
  },
];

const policyBriefs = [
  {
    id: 'brief-edu-1',
    title: 'Policy Brief: Universal Basic Education — Practical Steps',
    summary: 'Three short recommendations to strengthen public education access at the municipal level.',
    pdf: '#',
    date: '2025-09-20',
    tags: ['education', 'welfare'],
  },
];

const advisory = [
  {
    name: 'Prof. A. Mentor',
    affiliation: 'University — Public Law',
    note: 'Advisory lead (provisional) — provides peer review oversight for policy briefs.',
  },
];

const videos = [
  {
    id: 'vid1',
    title: 'A3D — Introductory Talk',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

// --- UI Helpers ---
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  } catch (e) {
    return dateStr;
  }
}

const pageTransition = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.35, ease: 'easeInOut' },
};

// --- Components ---
function Header() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-black text-white w-20 h-20 flex items-center justify-center text-3xl font-bold">A3D</div>
          <h1 className="text-3xl font-bold leading-tight uppercase tracking-wide" style={{ fontFamily: 'Times New Roman' }}>
            The Association for Democratic Discourse and Discussion
          </h1>
          <p className="text-lg italic mt-2" style={{ fontFamily: 'Times New Roman' }}>“Emancipation with Dissemination”</p>
        </div>

        <nav className="flex items-center gap-6 mt-6 text-lg" style={{ fontFamily: 'Times New Roman' }}>
  <NavLink to="/">Home</NavLink>
  <NavLink to="/articles">Articles</NavLink>
  <NavLink to="/publications">Publications</NavLink>
  <NavLink to="/issues">Issues</NavLink>
  <NavLink to="/get-involved">Get Involved</NavLink>
  <NavLink to="/videos">Videos</NavLink>
  <NavLink to="/founders">Founders</NavLink>       {/* main Founders page */}
  <NavLink to="/about">About</NavLink>              {/* keep About for advisory/mission */}
  <NavLink to="/contact">Contact</NavLink>
</nav>

      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-sm text-black hover:underline" style={{ fontFamily: 'Times New Roman' }}>
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-12 py-8 text-center text-sm text-black">
      <div className="max-w-6xl mx-auto px-4">
        <p style={{ fontFamily: 'Times New Roman' }}>© {new Date().getFullYear()} A3D — Association for Democratic Discourse and Discussion.</p>
        <p className="mt-2 text-xs" style={{ fontFamily: 'Times New Roman' }}>
          A student-led research collective producing evidence-based, opinionated write-ups, commentary, and public engagement. For press or submissions: <strong>a3d@example.org</strong>.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  const latest = articles[0];
  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 p-8">
          <h2 className="text-2xl font-bold mb-2">{latest.title}</h2>
          <p className="text-sm mb-4">Published on {formatDate(latest.date)} • {latest.author}</p>
          <div className="max-w-prose leading-relaxed">
            <p>{latest.content}</p>
            <p className="mt-4 italic">(Excerpt — visit Publications for policy briefs.)</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link to={`/articles/${latest.id}`} className="px-4 py-2 rounded-md border" style={{ fontFamily: 'Times New Roman' }}>Read full article</Link>
            <Link to="/publications" className="px-4 py-2 rounded-md bg-black text-white" style={{ fontFamily: 'Times New Roman' }}>Publications</Link>
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Latest videos</h3>
              <div className="mt-3 space-y-3">
                {videos.map((v) => (
                  <a key={v.id} href={`https://youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
                    <div className="w-16 h-10 bg-black rounded overflow-hidden">
                      <img src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{v.title}</div>
                      <div className="text-xs">YouTube • watch</div>
                    </div>
                    <Play size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded">
              <h4 className="font-semibold text-sm">Subscribe</h4>
              <p className="text-xs mt-1">Monthly briefs, event invites.</p>
              <NewsletterForm compact />
            </div>

            <div className="p-4 border rounded text-sm">
              <h4 className="font-semibold">Quick links</h4>
              <ul className="mt-3 space-y-2">
                <li><Link to="/about" className="hover:underline">Founders & advisory</Link></li>
                <li><Link to="/publications" className="hover:underline">Policy briefs</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h3 className="text-lg font-semibold mb-4">From the archive</h3>
	{/* --- CLICKABLE Question! Block --- */}
<div className="mt-14 flex justify-start">
  <Link to="/issues">
    <div className="
      w-64 h-64 
      rounded-2xl 
      relative 
      overflow-hidden 
      shadow-xl 
      cursor-pointer 
      transition-transform 
      duration-300 
      hover:scale-105
    ">

      {/* bright gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-yellow-400 to-red-500 opacity-90"></div>

      {/* vector circles */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-md"></div>
      <div className="absolute bottom-6 right-6 w-20 h-20 bg-white/20 rounded-full blur-md"></div>

      {/* vector triangle */}
      <div className="absolute top-1/2 left-4 w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-white/30 border-r-[30px] border-r-transparent rotate-12"></div>

      {/* text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 
          className="text-3xl font-bold tracking-wide text-white drop-shadow-xl" 
          style={{ fontFamily: 'Times New Roman' }}
        >
          Question!
        </h1>
      </div>
    </div>
  </Link>
</div>

{/* --- CLICKABLE Start Questioning! Block --- */}
<div className="mt-10 flex justify-start">
  <Link to="/get-involved">
    <div className="
      w-64 h-64 
      rounded-2xl 
      relative 
      overflow-hidden 
      shadow-xl 
      cursor-pointer 
      transition-transform 
      duration-300 
      hover:scale-105
    ">

      {/* bright gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>

      {/* vector circles */}
      <div className="absolute top-6 left-6 w-20 h-20 bg-white/20 rounded-full blur-md"></div>
      <div className="absolute -bottom-4 right-4 w-28 h-28 bg-white/25 rounded-full blur-lg"></div>

      {/* vector diagonal lines */}
      <div className="absolute inset-0">
        <div className="w-full h-1 bg-white/20 transform rotate-12 absolute top-10"></div>
        <div className="w-full h-1 bg-white/20 transform rotate-12 absolute top-20"></div>
        <div className="w-full h-1 bg-white/20 transform rotate-12 absolute top-32"></div>
      </div>

      {/* text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 
          className="text-3xl font-bold tracking-wide text-white drop-shadow-xl" 
          style={{ fontFamily: 'Times New Roman' }}
        >
          Start Questioning!
        </h1>
      </div>
    </div>
  </Link>
</div>


        <div className="grid md:grid-cols-2 gap-4">
          {articles.slice(1).map((a) => (
            <article key={a.id} className="p-4 border rounded">
              <h4 className="font-semibold"><Link to={`/articles/${a.id}`}>{a.title}</Link></h4>
              <p className="text-xs">{formatDate(a.date)}</p>
              <p className="mt-2 text-sm">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}

function ArticlesList() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');

  const tags = useMemo(() => {
    const s = new Set();
    articles.forEach((a) => a.tags?.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = articles.filter((a) => {
    const matchesQuery = query.trim() === '' || a.title.toLowerCase().includes(query.toLowerCase());
    const matchesTag = tag === '' || (a.tags || []).includes(tag);
    return matchesQuery && matchesTag;
  });

  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <input placeholder="Search titles" value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 border rounded w-full md:w-1/3" />
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="p-2 border rounded w-full md:w-1/6">
          <option value="">All tags</option>
          {tags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <ul className="space-y-4">
        {filtered.map((a) => (
          <li key={a.id} className="p-4 border rounded">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg"><Link to={`/articles/${a.id}`}>{a.title}</Link></h3>
                <p className="text-xs">{formatDate(a.date)} • {a.author}</p>
                <p className="mt-2 text-sm">{a.excerpt}</p>
              </div>
              <div className="text-sm">Read →</div>
            </div>
          </li>
        ))}
      </ul>
    </motion.main>
  );
}

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === id) || articles[0];

  return (
    <motion.main {...pageTransition} className="max-w-4xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm mb-4">← Back</button>

      <article className="p-8 border rounded">
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <p className="text-xs mb-4">{formatDate(article.date)} • {article.author}</p>
        <div className="leading-relaxed">
          <p>{article.content}</p>
        </div>
      </article>
    </motion.main>
  );
}

function IssuesPage() {
  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h1 className="text-3xl font-bold mb-6">Issues</h1>
      <p className="text-sm max-w-3xl">
        This section will highlight major policy, constitutional, economic, and social issues that A3D is actively studying.
        You can list categories like: Constitutional Governance, Digital Rights, Public Welfare Delivery, Environmental Justice,
        Judicial Reform, and Democratic Accountability.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Constitutional Law</h3>
          <p className="text-sm mt-2">Welfare state, separation of powers, federalism, rights jurisprudence.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Public Policy</h3>
          <p className="text-sm mt-2">Education, healthcare, welfare delivery, economic inclusion.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">International Law</h3>
          <p className="text-sm mt-2">Trade and investment, global governance, diplomacy frameworks.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Taxation & Finance</h3>
          <p className="text-sm mt-2">Public finance, tax litigation, fiscal policy structures.</p>
        </div>
      </div>
    </motion.main>
  );
}

function GetInvolvedPage() {
  return (
    <motion.main {...pageTransition} className="max-w-5xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h1 className="text-3xl font-bold mb-6">Get Involved</h1>

      <p className="text-sm max-w-3xl">
        A3D welcomes students, scholars, and practitioners who want to contribute to democratic discourse, research, and civic engagement.
        There are multiple ways to get involved — writing, research, outreach, media, and collaborations.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 border rounded">
          <h3 className="font-semibold text-lg">Join as a Research Contributor</h3>
          <p className="mt-2 text-sm">Submit articles, policy briefs, or commentary on constitutional, economic, and social issues.</p>
        </div>
        
        <div className="p-6 border rounded">
          <h3 className="font-semibold text-lg">Collaborate with A3D</h3>
          <p className="mt-2 text-sm">Institutions, NGOs, legal clinics, and student bodies can collaborate on joint research projects.</p>
        </div>

        <div className="p-6 border rounded">
          <h3 className="font-semibold text-lg">Volunteer for Outreach</h3>
          <p className="mt-2 text-sm">Help with community engagement, event organization, and awareness drives.</p>
        </div>

        <div className="p-6 border rounded">
          <h3 className="font-semibold text-lg">Join our Editorial Team</h3>
          <p className="mt-2 text-sm">Help maintain publication quality, fact-checking, and peer review guidance.</p>
        </div>
      </div>

      <div className="mt-10 text-sm p-6 border rounded">
        <h3 className="font-semibold text-lg">Interested?</h3>
        <p className="mt-2">Email us at <strong>a3d@example.org</strong> with a brief note about how you wish to contribute.</p>
      </div>
    </motion.main>
  );
}


function VideosPage() {
  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h2 className="text-2xl font-bold mb-6">Videos</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((v) => (
          <div key={v.id} className="border rounded overflow-hidden">
            <div className="aspect-video">
              <iframe title={v.title} src={`https://www.youtube.com/embed/${v.youtubeId}`} frameBorder="0" allowFullScreen className="w-full h-full" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{v.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.main>
  );
}

function Publications() {
  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h2 className="text-2xl font-bold mb-6">Policy Briefs & Publications</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {policyBriefs.map((p) => (
          <div key={p.id} className="p-4 border rounded">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-xs text-black/80">{formatDate(p.date)}</p>
            <p className="mt-2">{p.summary}</p>
            <div className="mt-4 flex gap-3">
              <a href={p.pdf} className="px-4 py-2 border rounded">Download PDF</a>
              <Link to="/contact" className="px-4 py-2 bg-black text-white rounded">Request citation</Link>
            </div>
          </div>
        ))}
      </div>
    </motion.main>
  );
}

function About() {
  return (
    <motion.main {...pageTransition} className="max-w-6xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h2 className="text-2xl font-bold mb-6">About A3D</h2>

      <section className="p-6 border rounded mb-6">
        <h3 className="text-xl font-semibold">Mission</h3>
        <p className="mt-2">
          A3D publishes independent, evidence-based research and practical policy recommendations to strengthen democratic institutions
          and civic participation. We are student-led and committed to transparent editorial standards.
        </p>
      </section>

      <section className="p-6 border rounded">
        <h3 className="text-xl font-semibold">Advisory Board (provisional)</h3>
        <p className="text-sm mt-2">Our advisory board provides peer review and guidance for major policy briefs. (Listing is provisional.)</p>

        <div className="mt-4 space-y-3">
          {advisory.map((a) => (
            <div key={a.name} className="p-4 border rounded">
              <h4 className="font-semibold">{a.name}</h4>
              <p className="text-xs">{a.affiliation}</p>
              <p className="mt-2 text-sm">{a.note}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}


function Contact() {
  return (
    <motion.main {...pageTransition} className="max-w-4xl mx-auto px-4 py-10" style={{ fontFamily: 'Times New Roman' }}>
      <h2 className="text-2xl font-bold mb-6">Contact & Press</h2>
      <p className="text-sm mb-4">For media enquiries, submissions, partnerships, or to access our press kit, email <strong>a3d@example.org</strong>.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="p-6 border rounded space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input className="w-full mt-1 p-2 border rounded" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input className="w-full mt-1 p-2 border rounded" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm">Message</label>
            <textarea className="w-full mt-1 p-2 border rounded" rows={5} placeholder="How can we help?" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-black text-white rounded">Send</button>
          </div>
        </form>

        <div className="p-6 border rounded text-sm">
          <h4 className="font-semibold">Press kit</h4>
          <p className="mt-2">Download logo, short bios, and recent briefs for press use.</p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="px-4 py-2 border rounded">Logo pack</a>
            <a href="#" className="px-4 py-2 border rounded">Recent briefs</a>
          </div>

          <div className="mt-6">
            <h5 className="font-semibold">Partnerships</h5>
            <p className="mt-2">Interested in collaborating? Tell us your institution and a short note about the partnership.</p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

function FoundersPage() {
 const founders = [
  {
    name: "Subrat Suman",
    image: "/images/subratfounder.jpg",
    specialization: "Constitutional Law",
    bio: "Subrat Suman is a 4th-year law student at UPES with a specialization in Constitutional Law. His work focuses on democratic reform, constitutional adjudication, and the role of state institutions in shaping public welfare.",
  },
  {
    name: "Ananya Gulkhandia",
    image: "/images/ananyafounder.jpg",
    specialization: "Constitutional Law",
    bio: "Ananya Gulkhandia is a 4th-year law student at UPES specializing in Constitutional Law. She is deeply interested in rights-based discourse, structural constitutionalism, and institutional accountability.",
  },
  {
    name: "Arihant Dev Tiwari",
    image: "/images/arihantfounder.jpg",
    specialization: "Tax Law",
    bio: "Arihant Dev Tiwari is a 4th-year law student at UPES with a specialization in Tax Law. His interests lie in fiscal federalism, revenue governance, and the intersection of taxation with public policy.",
  },
  {
    name: "Saathvik Sharma",
    image: "/images/saathvikfounder.jpg",
    specialization: "International Trade & Investment Law",
    bio: "Saathvik Sharma is a 4th-year law student at UPES specializing in International Trade and Investment Law. He studies transnational economic regulation, investment arbitration, and global governance systems.",
  },
  {
    name: "Om Kumar",
    image: "/images/omfounder.jpg",
    specialization: "Constitutional Law",
    bio: "Om Kumar is a 4th-year law student at UPES with a specialization in Constitutional Law. He analyses constitutional structure, fundamental rights, and democratic accountability with a focus on institutional reform.",
  }
];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Founders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {founders.map((f) => (
          <div key={f.name} className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-sm">
            <img
              src={f.image}
              alt={f.name}
              className="w-40 h-40 object-cover rounded-full border border-gray-300 shadow-md"
            />
            <h2 className="text-2xl font-semibold mt-4">{f.name}</h2>
            <p className="text-sm font-medium text-gray-600 mt-1">
              {f.specialization}
            </p>
            <p className="text-sm mt-3 leading-relaxed">
              {f.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


function NewsletterForm({ compact }) {
  const [email, setEmail] = useState('');
  return (
    <form onSubmit={(e) => e.preventDefault()} className={compact ? 'mt-3' : 'mt-6'}>
      <div className="flex gap-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="p-2 border rounded flex-1" />
        <button className="px-3 py-2 bg-black text-white rounded">Subscribe</button>
      </div>
      {!compact && <p className="text-xs mt-2">We send monthly briefs. We do not share your email.</p>}
    </form>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
	  <Route path="/issues" element={<IssuesPage />} />
	  <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/videos" element={<VideosPage />} />
	  <Route path="/founders" element={<FoundersPage />} />
          <Route path="/publications" element={<Publications />} />
	  <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <div className="max-w-6xl mx-auto px-4">
          <Footer />
        </div>
      </div>
    </Router>
  );
}
