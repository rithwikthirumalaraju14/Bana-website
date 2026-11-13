import { useEffect, useRef, useState } from 'react'
import { enquiryGuidance, faqs, images, initiatives, subjects, values } from './content'
import './App.css'

const currentYear = new Date().getFullYear()

function Icon({ name = 'arrow', size = 22, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    northeast: <><path d="M6 18 18 6M6 6h12v12" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    book: <><path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z" /><path d="M6 8h3m6 0h3" /></>,
    health: <><path d="M8 3H4v6a4 4 0 0 0 8 0V3h-2M8 13v3a5 5 0 0 0 10 0v-3" /><circle cx="18" cy="10" r="3" /></>,
    water: <><path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z" /><path d="M8 15a4 4 0 0 0 4 4" /></>,
    people: <><circle cx="9" cy="7" r="3" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 4 6" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    phone: <path d="m8 3 2 5-3 2a16 16 0 0 0 7 7l2-3 5 2v4c0 1-1 2-2 2C9 21 3 15 2 5c0-1 1-2 2-2Z" />,
    leaf: <><path d="M20 3C9 2 2 7 5 15c8 6 16-1 15-12ZM4 21 15 10" /></>,
    shield: <><path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z" /><path d="m8 12 3 3 5-6" /></>,
    balance: <><path d="M12 3v18M7 21h10M3 6h18M6 6l-4 8h8L6 6Zm12 0-4 8h8l-4-8Z" /></>,
    hands: <><path d="m2 12 4-3 5 2 3-1 8 6-5 5-8-3-7-6Zm20-4-5-3-5 2-3 5 3 2 4-4M2 5l4 4m16 7-3 4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M5 12h14M12 5v14" />,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>
}

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#/" aria-label="BANA Development Foundation home"><span className="brand-symbol"><Icon name="heart" size={25} /></span><span><strong>BANA<span className="brand-dot">.</span></strong><small>DEVELOPMENT FOUNDATION</small></span></a>
}

function Button({ href, children, variant = 'orange', className = '', ...props }) {
  const Tag = href ? 'a' : 'button'
  return <Tag href={href} className={`button button-${variant} ${className}`} {...props}><span>{children}</span><span className="button-arrow"><Icon size={20} /></span></Tag>
}

function Eyebrow({ children, icon = 'heart', light = false }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span><Icon name={icon} size={14} /></span>{children}</span>
}

function Header({ page }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  useEffect(() => {
    function escape(event) {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    if (open) window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])
  return <header className="header-wrap"><div className="header container">
    <Brand light />
    <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
      {[['home', '#/', 'Home'], ['about', '#/about', 'About Us'], ['contact', '#/contact', 'Contact Us']].map(([key, href, title]) => <a key={key} href={href} aria-current={page === key ? 'page' : undefined} onClick={() => setOpen(false)}>{title}</a>)}
      <a className="mobile-contact" href="#/contact" onClick={() => setOpen(false)}>Get in Touch <Icon size={16} /></a>
    </nav>
    <Button className="header-cta" href="#/contact">Get in Touch</Button>
    <button ref={menuButton} className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </div></header>
}

function Photo({ src, className = '', alt = '', eager = false }) {
  return <img className={className} src={`${src}?scale-down-to=1920`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}

function HomeHero() {
  return <section className="home-hero">
    <Photo className="hero-background" src={images.hero} eager />
    <div className="hero-shade" />
    <div className="container hero-content">
      <div className="hero-kicker"><span className="kicker-icon"><Icon name="heart" size={19} /></span><div>Rooted in community. Driven by purpose.<small>BANA Development Foundation</small></div></div>
      <h1>Empowering<br />communities.<br />A <span>better tomorrow.</span></h1>
      <p>Education, healthcare, safe drinking water and shared resources. Together, we build healthier, brighter communities.</p>
      <Button href="#/?section=initiatives" variant="white">Discover Our Initiatives</Button>
      <a className="hero-location" href="#/about"><Icon name="pin" size={16} /> Rooted in Telangana, India <Icon name="northeast" size={14} /></a>
    </div>
    <div className="hero-bottom container"><span className="hero-brandline">Educate. Empower. <span>Build a brighter future.</span></span><a className="hero-impact" href="#/?section=impact"><div><span className="impact-number">520<span>≈</span></span><p>Students supported through<br />merit scholarships</p></div><Photo src={images.education} alt="" /><span className="impact-link"><Icon name="northeast" size={16} /></span></a></div>
  </section>
}

function Intro() {
  return <section className="section container intro-grid">
    <div className="intro-visual"><Photo src={images.about} alt="Illustrative community-support photograph" /><div className="image-sticker"><Icon name="hands" size={34} /><span>People at the heart.<br /><strong>Purpose in every step.</strong></span></div><span className="photo-caption">Community imagery · illustrative</span></div>
    <div className="intro-copy"><Eyebrow>About BANA</Eyebrow><h2>Creating opportunities.<br /><span className="muted-heading">Supporting everyday life.</span></h2><p>Every individual deserves the opportunity to learn, access essential services and build a better future. Meaningful development begins with the needs people experience every day.</p><p>BANA Development Foundation brings these priorities together through practical initiatives in education, healthcare, safe drinking water and community development.</p><div className="intro-points"><span><Icon name="check" size={17} /> People-centred purpose</span><span><Icon name="check" size={17} /> Locally rooted action</span></div><Button href="#/about" variant="green">Learn More About BANA</Button></div>
  </section>
}

function PillarStrip() {
  return <div className="pillar-strip"><div className="container">{initiatives.map(item => <a key={item.id} href={`#/?section=${item.id}`}><Icon name={item.icon} size={29} /><span>{item.category}</span><span className="pillar-dot" /></a>)}</div></div>
}

function Initiatives() {
  return <section className="section soft-section" id="initiatives"><div className="container">
    <div className="section-heading"><div><Eyebrow icon="leaf">Our core initiatives</Eyebrow><h2>Four pillars. One purpose.<br /><span className="muted-heading">Stronger communities.</span></h2></div><p>Opportunities to learn. Connections to care.<br />Practical support for the things that matter.</p></div>
    <div className="initiative-grid">{initiatives.map(item => <article className="initiative-card" key={item.id} id={item.id}>
      <div className="initiative-photo"><Photo src={images[item.id]} alt={`Illustrative ${item.category.toLowerCase()} photograph`} /><span className="photo-tag"><Icon name={item.icon} size={15} />{item.category}</span><span className="initiative-number">{item.number}</span></div>
      <div className="initiative-body"><h3>{item.title}</h3><p>{item.summary}</p><div className="initiative-note"><span />{item.note}</div><details className="initiative-details"><summary>About this initiative <Icon name="plus" size={17} /></summary><div><h4>{item.tagline}</h4>{item.detail.map(text => <p key={text}>{text}</p>)}</div></details><a className="text-link" href={`#/contact?subject=${encodeURIComponent(item.subject)}`}>{item.cta}<Icon name="northeast" size={18} /></a></div>
    </article>)}</div>
  </div></section>
}

function Impact() {
  return <section className="section impact-section" id="impact"><div className="container">
    <div className="section-heading"><div><Eyebrow icon="sun">Our impact</Eyebrow><h2>Small steps.<br />Meaningful progress.</h2></div><p>Our work takes shape through educational support,<br className="desktop-break" /> access to services and shared village infrastructure.</p></div>
    <div className="impact-grid"><div className="impact-feature"><span className="tiny-label">OPPORTUNITY THROUGH EDUCATION</span><strong>520<span>≈</span></strong><h3>Young minds encouraged.</h3><p>Students supported through merit scholarship initiatives. Every aspiration deserves a chance.</p><Icon name="book" size={100} /></div><div className="impact-small"><Icon name="health" size={33} /><h3>Care, connected.</h3><p>Tele-health video consultations connecting villagers with hospital doctors.</p><span>In association with Apollo Hospitals</span></div><div className="impact-small pale"><Icon name="water" size={33} /><h3>Everyday essentials.</h3><p>A village-level RO water filtration plant and a multipurpose community hall.</p><span>Resources that bring people together</span></div></div>
    <div className="local-note"><Icon name="pin" size={23} /><p><strong>A local focus. A lasting commitment.</strong> Supporting rural development, particularly in Mudigonda Mandal, Khammam district, Telangana.</p><a href="#/about" aria-label="Learn about our local focus"><Icon name="northeast" /></a></div>
  </div></section>
}

function Founder({ full = false }) {
  return <section className={`section container founder-grid ${full ? 'founder-full' : ''}`} id="founder"><div className="founder-panel"><span className="tiny-label">A CONTINUING COMMITMENT TO SOCIETY</span><Icon name="hands" size={68} /><h2>A life of service.<br />A purpose that<br /><span>continues.</span></h2><div className="founder-panel-bottom"><span>BANA</span><small>Educate. Empower.</small></div></div><div><Eyebrow icon="people">Our founder</Eyebrow><h2>A vision rooted<br />in public service.</h2><h3>Sri Avula Bhaskar Reddy</h3><span className="founder-role">IRS (Retd.) · Founder, BANA Development Foundation</span><p>A former Indian Revenue Service officer, author and social-service leader, Sri Avula Bhaskar Reddy established BANA Development Foundation following his career in public service.</p><p>His continuing commitment to society takes practical form through work in education, healthcare, safe drinking water and community development.</p>{full && <p>The Foundation carries this purpose into initiatives that support students, connect villagers with medical services and provide shared infrastructure. Its work reflects a view of service that includes both the aspirations of individuals and the essential resources of a community.</p>}<Button href={full ? '#/contact' : '#/about'} variant="green">{full ? 'Contact the Foundation' : 'Know Our Story'}</Button></div></section>
}

function CallToAction() {
  return <section className="cta-wrap container"><div className="cta-panel"><Photo src={images.together} /><div className="cta-shade" /><div className="cta-copy"><Eyebrow light>Empowering lives, together</Eyebrow><h2>Together, we can build<br />a <span>brighter tomorrow.</span></h2><p>Have a question, an idea, or a wish to contribute?<br />Meaningful change begins with a conversation.</p><Button href="#/contact">Connect With Us</Button></div><span className="cta-flower" aria-hidden="true">✳</span></div></section>
}

function FAQs({ preview = false }) {
  const list = preview ? [faqs[0], faqs[1], faqs[3], faqs[6], faqs[12]] : faqs
  return <section className="section container faq-section" id="questions"><div className="faq-intro"><Eyebrow icon="people">Questions answered</Eyebrow><h2>A little clarity.<br /><span className="muted-heading">A helpful next step.</span></h2><p>Find answers about our Foundation, initiatives, and how to get in touch.</p><Button href={preview ? '#/contact?section=questions' : '#/contact?section=enquiry'} variant="green">{preview ? 'All Questions & Answers' : 'Have Another Question?'}</Button><div className="faq-contact"><span>Prefer a conversation?</span><a href="tel:+919618519524">+91 96185 19524 <Icon name="northeast" size={15} /></a></div></div><div className="faq-list">{list.map(([question, answer], i) => <details key={question} className="faq-item"><summary><span className="faq-number">{String(i + 1).padStart(2, '0')}</span><span>{question}</span><Icon name="plus" size={20} /></summary><p>{answer}</p></details>)}</div></section>
}

function PageHero({ page }) {
  const about = page === 'about'
  return <section className="page-hero"><Photo className="hero-background" src={about ? images.about : images.together} eager /><div className="page-hero-shade" /><div className="container"><div className="breadcrumb"><a href="#/">Home</a><span>/</span>{about ? 'About Us' : 'Contact Us'}</div><Eyebrow light>{about ? 'The purpose behind our work' : 'Every conversation matters'}</Eyebrow><h1>{about ? <>Driven by purpose.<br /><span>Committed to people.</span></> : <>Let’s connect.<br /><span>Let’s create change.</span></>}</h1><p>{about ? 'Dedicated to practical progress in education, healthcare, safe drinking water and community development.' : 'Questions, ideas and conversations are welcome. Tell us how we can help with your enquiry.'}</p></div></section>
}

function AboutPage() {
  return <><PageHero page="about" /><section className="section container story-grid"><div><Eyebrow>Our story</Eyebrow><h2>Meaningful change<br />begins with <span className="muted-heading">people.</span></h2><div className="story-highlight"><Icon name="leaf" size={30} /><p>Educate. Empower.<br /><strong>Build Healthier, Brighter Communities.</strong></p></div></div><div><p className="lead">Every community deserves the opportunity to grow, thrive and live with dignity.</p><p>Established by Sri Avula Bhaskar Reddy, IRS (Retd.), following his career in public service, BANA Development Foundation reflects a continuing commitment to society and to the opportunities that help people build better lives.</p><p>That purpose has taken practical form through scholarship support for meritorious students, tele-health services connecting villagers with hospital doctors, a village-level RO water filtration plant and a multipurpose function hall.</p><p>These areas belong together because community needs are connected. A young person’s ambitions exist within a family and a village. Families depend on essential services, and villages benefit from resources that can be used together.</p><Button href="#/?section=initiatives" variant="green">Explore Our Initiatives</Button></div></section>
    <section className="section soft-section"><div className="container"><div className="center-heading"><Eyebrow icon="sun">Our vision & mission</Eyebrow><h2>A clear purpose.<br />Four essential priorities.</h2></div><div className="purpose-grid"><article className="vision-card"><Icon name="sun" size={38} /><span className="tiny-label">OUR VISION</span><h3>An empowered society where everyone has the opportunity to thrive.</h3><p>We envision healthy, inclusive communities in which deserving students have opportunities to learn, rural families can access affordable healthcare and safe drinking water, and shared resources support community life.</p><p>Our vision places dignity and opportunity alongside essential services. A stronger society grows when people’s ambitions are recognised and fundamental needs receive attention.</p></article><article className="mission-card"><Icon name="leaf" size={38} /><span className="tiny-label">OUR MISSION</span><h3>Turning essential needs into meaningful opportunities.</h3><p>To strengthen underserved communities through practical initiatives that connect care for people with useful support.</p><ul>{[['Encourage education', 'Recognise academic effort and help reduce financial barriers to learning.'], ['Improve healthcare access', 'Facilitate medical consultations, diagnostics and rural tele-health connections.'], ['Support drinking-water access', 'Provide RO water filtration as essential village infrastructure.'], ['Strengthen shared resources', 'Make space for community functions, gatherings and local activities.']].map(([title, text]) => <li key={title}><Icon name="check" size={18} /><div><strong>{title}.</strong> {text}</div></li>)}</ul></article></div></div></section>
    <section className="section container"><div className="section-heading"><div><Eyebrow icon="heart">Our values</Eyebrow><h2>The principles<br />behind our purpose.</h2></div><p>Six principles guide our commitment to people<br className="desktop-break" /> and community development.</p></div><div className="values-grid">{values.map(([title, icon, text], i) => <article key={title}><div className="value-top"><Icon name={icon} size={30} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="rural-section"><div className="container rural-grid"><div><Eyebrow light icon="pin">Rooted in rural Telangana</Eyebrow><h2>A local focus.<br />A people-centred purpose.</h2></div><div><p>Our focus on Mudigonda Mandal, Khammam district, keeps our mission grounded in a defined community context. It brings together support for individuals and infrastructure intended for shared use.</p><p>We see progress in the opportunities people can pursue, the services they can reach and the resources available within their community. Our aspiration is greater confidence, dignity and inclusion.</p></div></div></section>
    <Founder full /><section className="section soft-section"><div className="container"><div className="center-heading"><Eyebrow icon="hands">Our approach</Eyebrow><h2>Practical solutions.<br />Community-focused development.</h2></div><div className="approach-grid">{[['Understand the need', 'Begin with the opportunities and resources that matter: support for education, a connection to medical advice, purified drinking water and a shared place to gather.'], ['Create practical solutions', 'Connect purpose with a useful response. Merit scholarships, tele-health services, RO water filtration and a multipurpose hall each respond to a particular need.'], ['Support community progress', 'Keep the intended benefit to people at the centre of the work. Strengthen access, opportunity and shared resources while staying connected to the community.']].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><CallToAction /></>
}

function EnquiryForm({ initialSubject }) {
  const [subject, setSubject] = useState(subjects.includes(initialSubject) ? initialSubject : '')
  const [status, setStatus] = useState({ type: '', message: '' })
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT
  const busy = status.type === 'sending'

  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (['name', 'email', 'subject', 'message'].some(key => !data[key]?.trim())) {
      setStatus({ type: 'error', message: 'Please complete the required fields before sending your message.' })
      form.querySelector(':invalid')?.focus()
      return
    }
    if (!form.elements.email.validity.valid) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      form.elements.email.focus()
      return
    }
    if (!endpoint) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nVillage / locality: ${data.locality || 'Not provided'}\n\n${data.message}`
      window.location.href = `mailto:Venkat@banafoundation.in?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
      setStatus({ type: 'draft', message: 'Your email draft is ready in your email app. Please send it there to complete your enquiry. If no app opened, email Venkat@banafoundation.in or call +91 96185 19524. Your details remain below.' })
      return
    }
    setStatus({ type: 'sending', message: 'Sending your message...' })
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(20000) })
      if (!response.ok) throw new Error('Submission failed')
      setStatus({ type: 'success', message: 'Thank you for contacting BANA Development Foundation. Your message has been received. We appreciate your interest in our work and the time you have taken to get in touch.' })
      form.reset()
      setSubject('')
    } catch {
      setStatus({ type: 'error', message: 'Your message could not be sent. Please try again, or contact us at Venkat@banafoundation.in or +91 96185 19524.' })
    }
  }

  return <form className="enquiry-form" id="enquiry" onSubmit={submit} noValidate><Eyebrow icon="mail">Start a conversation</Eyebrow><h2>Send us a message.</h2><p>Tell us which initiative you’re interested in and how we can help.</p><div className="form-grid"><label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Enter your full name" required maxLength={150} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label><label>Phone number <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" placeholder="Include your country code" maxLength={40} /></label><label>Village / locality <small>(optional)</small><input name="locality" autoComplete="address-level2" placeholder="Your village or locality" maxLength={200} /></label><label className="full-field">Subject <span>*</span><select name="subject" required value={subject} onChange={e => { setSubject(e.target.value); setStatus({ type: '', message: '' }) }} aria-describedby={subject ? 'subject-guidance' : undefined}><option value="">Select the topic of your enquiry</option>{subjects.map(item => <option key={item}>{item}</option>)}</select></label>{subject && <div className="subject-guidance full-field" id="subject-guidance"><Icon name="leaf" size={19} /><p>{enquiryGuidance[subject]}</p></div>}<label className="full-field">Your message <span>*</span><textarea name="message" rows={5} placeholder="Briefly explain your question and the information you need…" required maxLength={5000} /></label></div><p className="form-help">Fields marked with * are required. A short, clear message is enough to begin the conversation.</p>{!endpoint && <p className="email-handoff"><Icon name="mail" size={17} />This form opens your email app with your enquiry ready to send.</p>}<Button type="submit" disabled={busy}>{busy ? 'Sending your message...' : endpoint ? 'Send Message' : 'Continue in Email'}</Button><div aria-live="polite" aria-atomic="true">{status.message && <p className={`form-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</p>}</div></form>
}

function ContactPage({ subject }) {
  return <><PageHero page="contact" /><section className="section container contact-grid"><aside className="contact-info"><Eyebrow icon="hands">Get in touch</Eyebrow><h2>A conversation can<br />make a difference.</h2><p>Whether you’re seeking information about an initiative or have an idea for community development, we welcome your enquiry.</p><div className="contact-method"><span><Icon name="phone" /></span><div><small>GIVE US A CALL</small><a href="tel:+919618519524">+91 96185 19524</a></div></div><div className="contact-method"><span><Icon name="mail" /></span><div><small>WRITE TO US</small><a href="mailto:Venkat@banafoundation.in">Venkat@banafoundation.in</a></div></div><div className="contact-method"><span><Icon name="pin" /></span><div><small>OUR OFFICE</small><address>Villa No. E-07, Rolling Hills,<br />Opposite Ramky Tower,<br />Gachibowli, Hyderabad – 500032,<br />Telangana, India.</address><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Rolling+Hills+Gachibowli+Hyderabad+500032" target="_blank" rel="noreferrer">View area on map <Icon name="northeast" size={15} /></a></div></div><div className="visit-note"><Icon name="pin" size={22} /><div><strong>Before arranging a visit</strong><p>This is our Hyderabad office address. Please contact us for the relevant location, current availability and access arrangements for a village facility or service.</p></div></div></aside><EnquiryForm key={subject || 'general'} initialSubject={subject} /></section><div className="contact-band"><div className="container"><Icon name="heart" size={27} /><p>Education. Healthcare. Safe Water. <strong>Stronger Communities.</strong></p><span>Empowering Lives, Together.</span></div></div><FAQs /><CallToAction /></>
}

function Footer() {
  return <footer><div className="container"><div className="footer-top"><div><Eyebrow light>Be part of the change</Eyebrow><h2>Small acts.<br /><span>Brighter futures.</span></h2></div><Button href="#/contact" variant="white">Let’s Start a Conversation</Button></div><div className="footer-grid"><div className="footer-about"><Brand light /><p>Supporting education, healthcare, safe drinking water and community development, with a commitment to rural Telangana.</p><span>Mudigonda Mandal · Khammam district</span></div><div><h3>Explore</h3><a href="#/">Home</a><a href="#/about">About Us</a><a href="#/contact">Contact Us</a><a href="#/contact?section=questions">FAQs</a></div><div><h3>Our initiatives</h3>{initiatives.map(item => <a key={item.id} href={`#/?section=${item.id}`}>{item.category}</a>)}</div><div className="footer-contact"><h3>Get in touch</h3><a href="tel:+919618519524"><Icon name="phone" size={17} />+91 96185 19524</a><a href="mailto:Venkat@banafoundation.in"><Icon name="mail" size={17} />Venkat@banafoundation.in</a><p><Icon name="pin" size={18} /><span>Villa No. E-07, Rolling Hills,<br />Gachibowli, Hyderabad – 500032,<br />Telangana, India.</span></p></div></div><div className="footer-bottom"><span>© {currentYear} BANA Development Foundation.</span><span>Educate. Empower. Build brighter communities.</span><a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Back to top"><Icon name="arrow" size={18} /></a></div><p className="imagery-note">Photographs are illustrative and do not document BANA’s initiatives.</p></div></footer>
}

function readRoute() {
  const [path, query] = window.location.hash.slice(1).split('?')
  return { page: path === '/about' ? 'about' : path === '/contact' ? 'contact' : 'home', params: new URLSearchParams(query) }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    const meta = {
      home: ['BANA Development Foundation | Community Development', 'Explore BANA Development Foundation’s work in education, tele-health, safe drinking water and community development in rural Telangana.'],
      about: ['About BANA Development Foundation | Purpose & Founder', 'Learn about BANA Development Foundation’s purpose, founder, vision and values, and its focus on rural communities in Mudigonda Mandal, Telangana.'],
      contact: ['Contact BANA Development Foundation | Enquiries', 'Contact BANA Development Foundation for scholarship, tele-health, drinking-water and community-development enquiries. Find phone, email and office details.'],
    }
    document.title = meta[route.page][0]
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[route.page][1])
    const frame = requestAnimationFrame(() => {
      const section = route.params.get('section')
      const target = section ? document.getElementById(section) : null
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [route])
  return <><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main').focus() }}>Skip to content</a><Header key={route.page} page={route.page} /><main id="main" tabIndex={-1}>{route.page === 'home' ? <><HomeHero /><Intro /><PillarStrip /><Initiatives /><Impact /><Founder /><CallToAction /><FAQs preview /></> : route.page === 'about' ? <AboutPage /> : <ContactPage subject={route.params.get('subject')} />}</main><Footer /></>
}
