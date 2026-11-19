import { useEffect, useRef, useState } from 'react';
import profileImage from '../assets/profile.png';
import { ArrowUpRight, Atom, Braces, Camera, Code2, Layers, Mail, MessageCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Service Center Help Desk',
    description: 'Book repairs and track repair status.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1363489310774661263/1571110870820323398/service_center.png?ex=6af98a85&is=6af83905&hm=32175df40bb13875fe7994d39bed7796446aa848a38c600fdae42e1a8350b7ec',
    previewUrl: '',
    projectUrl: 'https://charom-resq.com',
  },
  {
    id: 2,
    title: "Developer's Portfolio",
    description: 'A personal portfolio website.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1363489310774661263/1571113989893652500/image.png?ex=6af98d6d&is=6af83bed&hm=f4371b99de30bb1fc0af1877aafd839d0ce94e0c6ee254d6f9958ee8e77eaaee',
    previewUrl: '',
    projectUrl: 'https://vicky.soulmatrix.in',
  },
  {
    id: 3,
    title: 'Mailing System',
    description: 'A web-based mailing system.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1363489310774661263/1571115049945272342/image.png?ex=6af98e69&is=6af83ce9&hm=36d709530b195fa8f51f72de878bec5e3dca4192ba5768d10035e1b53d77f395',
    previewUrl: 'https://ms.soulmatrix.in',
    projectUrl: '',
  },
  {
    id: 4,
    title: 'Video Editor Portfolio',
    description: 'A portfolio for a video editor.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1363489310774661263/1571115567983759471/image.png?ex=6af98ee5&is=6af83d65&hm=6e25f4ae0792b9a0dfc67abe0f319977f4df6adf9ad4a3d4e7f1c830bad61b02',
    previewUrl: 'https://vportfolio.soulmatrix.in/',
    projectUrl: '',
  },
];

const skills = [
  { name: 'Laravel', level: 'Intermediate', icon: Layers },
  { name: 'Node.js', level: 'Advanced', icon: Code2 },
  { name: 'React', level: 'Intermediate', icon: Atom },
  { name: 'Python', level: 'Advanced', icon: Code2 },
  { name: 'JavaScript', level: 'Advanced', mark: 'JS' },
  { name: 'JSON / APIs', level: 'Advanced', icon: Braces },
];

export default function Home() {
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updateScene = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;

        const scrolled = -track.getBoundingClientRect().top;
        const progress = Math.min(3, Math.max(0, scrolled / window.innerHeight));
        setSceneProgress(progress);
      });
    };

    updateScene();
    window.addEventListener('scroll', updateScene, { passive: true });
    window.addEventListener('resize', updateScene);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateScene);
      window.removeEventListener('resize', updateScene);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined;

    const moveCursor = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add('is-visible');
      cursor.classList.toggle(
        'is-interactive',
        event.target instanceof Element && Boolean(event.target.closest('a, button, input, textarea')),
      );
    };

    window.addEventListener('pointermove', moveCursor);
    return () => window.removeEventListener('pointermove', moveCursor);
  }, []);

  const goToScene = (scene) => {
    const track = trackRef.current;
    if (!track) return;

    const root = document.documentElement;
    const previousSnapType = root.style.scrollSnapType;
    root.style.scrollSnapType = 'none';
    setSceneProgress(scene);
    window.scrollTo({
      top: track.offsetTop + window.innerHeight * scene,
      behavior: 'instant',
    });
    requestAnimationFrame(() => {
      root.style.scrollSnapType = previousSnapType;
    });
  };

  const aboutOpacity = Math.max(0, 1 - Math.abs(sceneProgress - 1));
  const projectsOpacity = Math.max(0, 1 - Math.abs(sceneProgress - 2));
  const contactOpacity = Math.max(0, 1 - Math.abs(sceneProgress - 3));
  const portraitLeft = sceneProgress < 1
    ? 50 - sceneProgress * 25
    : sceneProgress < 2
      ? 25 + (sceneProgress - 1) * 25
      : 50 + (sceneProgress - 2) * 25;

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio contact from ${formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      '',
      formData.get('message'),
    ].join('\n');

    window.location.href = `mailto:akavanshu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] font-sans text-[#111111] selection:bg-black selection:text-white"
      style={{
        '--portrait-left': `${portraitLeft}%`,
        '--hero-opacity': Math.max(0, 1 - sceneProgress),
        '--about-opacity': aboutOpacity,
        '--projects-opacity': projectsOpacity,
        '--contact-opacity': contactOpacity,
      }}
    >
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <header
        className="home-header"
        aria-hidden={sceneProgress >= 0.5 && sceneProgress < 1.5}
        style={{
          opacity: sceneProgress >= 0.5 && sceneProgress < 1.5 ? 0 : 1,
          visibility: sceneProgress >= 0.5 && sceneProgress < 1.5 ? 'hidden' : 'visible',
          pointerEvents: sceneProgress >= 0.5 && sceneProgress < 1.5 ? 'none' : 'auto',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-4 pt-8 md:px-12">
          <div className="hidden items-center gap-2.5 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm sm:flex">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-gray-800">Available for New Project</span>
          </div>

          <nav className="flex items-center gap-3 text-xs font-medium text-gray-700 md:gap-8 md:text-sm">
            <button type="button" onClick={() => goToScene(2)} className="transition-colors hover:text-black">
              Projects
            </button>
            <button type="button" onClick={() => goToScene(3)} className="transition-colors hover:text-black">
              Contact
            </button>
          </nav>

          <button
            type="button"
            onClick={() => goToScene(3)}
            className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-black md:text-sm"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main>
        <section ref={trackRef} id="home-scroll-track" className="home-scroll-track">
          <div className="home-scroll-view">
            <h1 className="home-backdrop-name text-[13vw] font-black uppercase leading-none tracking-tight xl:text-[155px]" aria-hidden="true">
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #141414' }}>YASH</span>{' '}
              <span className="text-[#141414]">GUPTA</span>
            </h1>

            <img
              src={profileImage}
              alt="Yash Gupta"
              className="home-scroll-portrait object-contain object-bottom drop-shadow-sm"
            />

            <div className="home-hero-copy" aria-hidden={sceneProgress >= 0.5}>
                <p className="inline-block -rotate-2 bg-black px-6 py-1 text-xl font-black uppercase tracking-tighter text-[#FF1A1A]"><span className="inline-block scale-x-125">Mogged </span></p>
              <h2 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">Full-Stack Developer</h2>
              <p className="mt-2 text-sm text-gray-600">Scroll to get to know me</p>
            </div>

            <DodgeTag
              label="npm run build"
              className="dodge-tag-hero"
              active={sceneProgress < 0.5}
            />
            <DodgeTag
              label="React · Node · APIs"
              className="dodge-tag-home-stack"
              active={sceneProgress < 0.5}
            />

            <section
              className="home-about text-left"
              aria-hidden={sceneProgress < 0.5 || sceneProgress >= 1.5}
              inert={sceneProgress < 0.5 || sceneProgress >= 1.5}
              style={{ visibility: sceneProgress < 0.5 || sceneProgress >= 1.5 ? 'hidden' : 'visible' }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">About me</p>
              <h2 className="mb-4 text-4xl font-black tracking-tight text-[#141414] sm:text-5xl lg:text-7xl">
                Yash Gupta
              </h2>
              <h3 className="mb-4 text-xl font-bold text-[#141414] sm:text-2xl">Full-Stack Developer</h3>
              <p className="mb-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                I build polished web apps from front end to back end, with a focus on practical, easy-to-use experiences.
              </p>
              <div className="about-skills">
                <h3 className="about-skills-title">
                  <Code2 aria-hidden="true" />
                  <span>My tech stack</span>
                </h3>
                <p className="about-skills-caption">Tools I use to design, build, and connect web applications.</p>
                <div className="about-skills-grid">
                  {skills.map(({ name, level, icon: SkillIcon, mark }) => (
                    <div className="about-skill-card" key={name}>
                      <div className="about-skill-icon">
                        {mark ? <span className="about-skill-mark">{mark}</span> : <SkillIcon aria-hidden="true" />}
                      </div>
                      <span className="about-skill-name">{name}</span>
                      <span className="about-skill-level">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => goToScene(3)}
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 hover:bg-black"
              >
                Let&apos;s collaborate
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <div className="flex flex-wrap gap-3">
                <SocialPill icon={<MessageCircle className="h-4 w-4" />} label="Discord" href="https://discord.com/users/rtx.ltc" />
                <SocialPill icon={<Camera className="h-4 w-4" />} label="Instagram" href="https://www.instagram.com/yashwaskilled" />
                <SocialPill icon={<Mail className="h-4 w-4" />} label="Gmail" href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=CllgCKHRLxVfDprffXbFSvSkFcHQsCbLtzxvJsczCfjjgSnLDLwcBLwqPNrNwHjmWgtQQSxvwkL" />
                <SocialPill icon={<Code2 className="h-4 w-4" />} label="GitHub" href="https://github.com/Rtxltc" />
              </div>
            </section>

            <DodgeTag
              label="const devMode = true"
              className="dodge-tag-about"
              active={sceneProgress >= 0.5 && sceneProgress < 1.5}
            />
            <DodgeTag
              label="while (curious) learn()"
              className="dodge-tag-about-code"
              active={sceneProgress >= 0.5 && sceneProgress < 1.5}
            />

            <section
              id="projects"
              className="home-projects"
              aria-label="Selected projects"
              aria-hidden={sceneProgress < 1.5}
              inert={sceneProgress < 1.5}
              style={{ visibility: sceneProgress < 1.5 || sceneProgress >= 2.5 ? 'hidden' : 'visible' }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </section>

            <DodgeTag
              label="git status: clean"
              className="dodge-tag-projects"
              active={sceneProgress >= 1.5 && sceneProgress < 2.5}
            />
            <DodgeTag
              label="6 builds · 0 limits"
              className="dodge-tag-projects-count"
              active={sceneProgress >= 1.5 && sceneProgress < 2.5}
            />

            <section
              className="home-contact"
              aria-label="Contact Yash"
              aria-hidden={sceneProgress < 2.5}
              inert={sceneProgress < 2.5}
              style={{ visibility: sceneProgress < 2.5 ? 'hidden' : 'visible' }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Get in touch</p>
              <h2 className="mb-4 text-4xl font-black tracking-tight text-[#141414] sm:text-5xl lg:text-7xl">
                Let&apos;s work together
              </h2>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Have a project in mind? Send me a message and let&apos;s make it happen.
              </p>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <label className="block text-sm font-medium text-gray-700">
                  Your name
                  <input
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm text-[#141414] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Name"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Your email
                  <input
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm text-[#141414] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                  <textarea
                    className="mt-1 block w-full resize-y rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm text-[#141414] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                    name="message"
                    rows={3}
                    placeholder="Tell me about your project"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 hover:bg-black"
                >
                  Send message
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </section>

            <DodgeTag
              label="console.log('hello')"
              className="dodge-tag-contact"
              active={sceneProgress >= 2.5}
            />
            <DodgeTag
              label="availability: open"
              className="dodge-tag-contact-status"
              active={sceneProgress >= 2.5}
            />

            <p className="home-scene-hint" aria-hidden="true">
              {sceneProgress < 0.5
                ? 'Scroll to explore'
                : sceneProgress < 1.5
                  ? 'Scroll to see my projects'
                  : sceneProgress < 2.5
                    ? 'Scroll to contact me'
                    : 'You made it'}
            </p>
          </div>
          <div className="home-snap-point home-snap-about" aria-hidden="true" />
          <div className="home-snap-point home-snap-projects" aria-hidden="true" />
          <div className="home-snap-point home-snap-contact" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}

function ProjectCard({ project }) {
  const preview = project.thumbnail ? (
    <img className="h-full w-full object-cover" src={project.thumbnail} alt="" loading="lazy" />
  ) : project.previewUrl ? (
    <iframe
      className="h-full w-full border-0"
      src={project.previewUrl}
      title={`${project.title} live preview`}
      loading="lazy"
      sandbox="allow-scripts"
    />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-gray-500">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Project preview</span>
      <span className="text-xs">Add a thumbnail or preview URL</span>
    </div>
  );

  const content = (
    <>
      <div className="project-preview">{preview}</div>
      <div className="min-w-0 px-3 py-2.5">
        <h3 className="truncate text-sm font-bold text-[#141414]">{project.title}</h3>
        <p className="truncate text-xs text-gray-500">{project.description}</p>
      </div>
    </>
  );

  return (
    <article className="project-card">
      {project.projectUrl ? (
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
}

function SocialPill({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-36 items-center gap-2.5 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-xs font-medium text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50"
    >
      <span className="text-gray-600">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function DodgeTag({ label, className, active }) {
  const [offset, setOffset] = useState({ x: 0, y: 0, rotation: 0 });

  const dodge = () => {
    setOffset({
      x: Math.round((Math.random() - 0.5) * 150),
      y: Math.round((Math.random() - 0.5) * 110),
      rotation: Math.round((Math.random() - 0.5) * 18),
    });
  };

  return (
    <span
      className={`dodge-tag ${className}`}
      aria-hidden="true"
      onPointerEnter={dodge}
      style={{
        visibility: active ? 'visible' : 'hidden',
        '--dodge-x': `${offset.x}px`,
        '--dodge-y': `${offset.y}px`,
        '--dodge-rotation': `${offset.rotation}deg`,
      }}
    >
      <span className="dodge-tag-dot" />
      {label}
    </span>
  );
}
