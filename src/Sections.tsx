/* Sections used by the home page and contact page. */
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { galleryItems, processSteps, services } from "./EDIT_THIS_FILE";
import { Button, Container, KineticTitle, Reveal } from "./Components";

// ===== ContactForm.tsx =====

type Status = "idle" | "submitting" | "success" | "error";

// Sign up at https://formspree.io, create a form, and set its endpoint ID
// here (or via the VITE_FORMSPREE_ENDPOINT env var). No custom backend needed.
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "YOUR_FORMSPREE_FORM_ID";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_FORM_ID") {
      // eslint-disable-next-line no-console
      console.warn(
        "Contact form is not connected yet. Set VITE_FORMSPREE_ENDPOINT in your .env file â€” see README."
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-brand-green-900">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your name"
            className="rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-brand-green-900">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            placeholder="Your phone number"
            className="rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-brand-green-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="you@example.com"
          className="rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-brand-green-900">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Space type, approximate size, timeline..."
          className="resize-none rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
        />
      </div>

      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
        <Send className="h-4 w-4" />
      </Button>

      {status === "success" && (
        <p className="text-sm font-medium text-brand-green-700">
          Thanks! We've received your enquiry and will get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          Something went wrong. Please call or WhatsApp us directly, or try again.
        </p>
      )}
    </form>
  );
}


// ===== CTASection.tsx =====

const ctaImage = "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85";

export function CTASection() {
  return (
    <section className="grain relative min-h-[75svh] overflow-hidden bg-brand-ink text-white">
      <motion.img initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} src={ctaImage} alt="Warm modern home detail" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-auto flex min-h-[75svh] max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-10 lg:px-14">
        <Reveal><p className="editorial-label text-white/60">04 / Your next space</p></Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9"><h2 className="max-w-5xl text-5xl leading-[.85] sm:text-7xl lg:text-9xl">Let's make room for what matters.</h2></Reveal>
          <Reveal delay={.12} className="lg:col-span-3 lg:pb-2"><a href="/contact" className="editorial-label inline-flex items-center gap-3 border-b border-white pb-3">Start a conversation <ArrowUpRight className="h-4 w-4" /></a></Reveal>
        </div>
      </div>
    </section>
  );
}


// ===== GalleryPreview.tsx =====

export function GalleryPreview() {
  const [primary, secondary, tertiary] = galleryItems;
  return (
    <section className="bg-neutral-50 py-24 sm:py-32 lg:py-44">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <Reveal><p className="editorial-label text-brand-ink/55">03 / Selected work</p></Reveal>
          <Reveal delay={.1}><Link className="editorial-label inline-flex items-center gap-2 border-b border-brand-ink pb-2" to="/gallery">View all work <ArrowUpRight className="h-3.5 w-3.5" /></Link></Reveal>
        </div>
        <Reveal className="mt-10"><h2 className="max-w-4xl text-5xl leading-[.93] sm:text-6xl lg:text-8xl">A home should feel like it has always known you.</h2></Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Link to="/gallery" className="group block">
              <div className="image-frame aspect-[5/6] sm:aspect-[4/3]"><img src={primary.image} alt={primary.title} className="h-full w-full object-cover" /></div>
              <div className="mt-4 flex justify-between gap-4"><h3 className="text-2xl">{primary.title}</h3><span className="editorial-label pt-2 text-brand-ink/45">{primary.category}</span></div>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-12 pt-0 md:col-span-5 md:pt-28">
            {[secondary, tertiary].map((item, index) => (
              <Reveal key={item.id} delay={.12 + index * .08}>
                <Link to="/gallery" className="group block">
                  <div className="image-frame aspect-[4/3]"><img src={item.image} alt={item.title} className="h-full w-full object-cover" /></div>
                  <div className="mt-4 flex justify-between gap-4"><h3 className="text-xl">{item.title}</h3><span className="editorial-label pt-1 text-brand-ink/45">{item.category}</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


// ===== Hero.tsx =====

const heroImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90";

export function Hero() {
  return (
    <section className="grain relative min-h-[100svh] overflow-hidden bg-brand-ink text-brand-cream">
      <motion.div className="absolute inset-0" initial={{ scale: 1.13 }} animate={{ scale: 1 }} transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}>
        <img src={heroImage} alt="Warm contemporary living room" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/24 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pb-7 pt-7 sm:px-10 lg:px-14">
        <div className="flex items-start justify-between">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .8 }} className="editorial-label max-w-36 text-white/75"><br /></motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6, duration: .8 }} href="/contact" className="editorial-label border-b border-white/50 pb-2 text-white hover:border-white">Begin a project</motion.a>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <KineticTitle className="max-w-5xl text-[clamp(4rem,10vw,10.5rem)] leading-[.78] text-white" delay={.1}>
              {"Space,\nmade personal."}
            </KineticTitle>
          </div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .8 }} className="max-w-xs lg:col-span-3 lg:pb-3">
            <p className="text-base leading-relaxed text-white/75">Thoughtful interiors for homes, workspaces and the life that happens inside them.</p>
            <a href="#our-story" className="editorial-label mt-7 inline-flex items-center gap-3 text-white"><span>Discover Pixel</span><ArrowDownRight className="h-4 w-4" /></a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: .8 }} className="flex items-end justify-between border-t border-white/25 pt-4">
          <span className="editorial-label text-white/55">Palakkad, Kerala</span>
          <span className="editorial-label text-white/55">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}


// ===== ProcessSteps.tsx =====

const processImage = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85";

export function ProcessSteps() {
  return (
    <section className="grid bg-brand-ink text-brand-cream lg:grid-cols-2">
      <div className="grain image-frame min-h-[56svh] lg:min-h-[100svh]">
        <img src={processImage} alt="Quietly detailed modern interior" className="h-full w-full object-cover" />
      </div>
      <Container className="flex min-h-full flex-col justify-between py-20 sm:py-28 lg:px-16 lg:py-20 xl:px-24">
        <Reveal>
          <p className="editorial-label text-white/50">02 / The process</p>
          <h2 className="mt-8 max-w-md text-5xl leading-[.92] sm:text-6xl">A clear path from feeling to finish.</h2>
        </Reveal>
        <div className="mt-20 border-t border-white/20">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * .07} y={16}>
              <div className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/20 py-6">
                <span className="editorial-label pt-1 text-white/45">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl leading-none sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


// ===== Services.tsx =====

export function Services() {
  return (
    <section id="our-story" className="bg-brand-cream py-24 sm:py-32 lg:py-44">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="editorial-label text-brand-ink/55">01 / What we shape</p>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="max-w-4xl text-5xl leading-[.93] sm:text-6xl lg:text-8xl">Every room holds a different kind of living.</h2>
            </Reveal>
            <Reveal delay={.12} className="mt-10 max-w-lg lg:ml-[25%]">
              <p className="text-lg leading-relaxed text-brand-text-light">We translate your routines, references and ambitions into interiors with warmth, clarity and a sense of ease.</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-t border-brand-ink/25">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * .045} y={18}>
              <Link to={service.id === "modular-kitchen" ? "/gallery?category=Kitchen" : "/services"} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-brand-ink/20 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:py-8">
                <span className="editorial-label text-brand-ink/45">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                  <h3 className="text-3xl leading-none sm:text-4xl lg:text-5xl">{service.title}</h3>
                  <span className="hidden max-w-sm text-sm leading-relaxed text-brand-text-light lg:block">{service.description}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-brand-ink/55 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


// ===== Testimonials.tsx =====

export function Testimonials() {
  return (
    <section className="bg-brand-cream py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal><p className="editorial-label text-brand-ink/55">04 / The feeling</p></Reveal>
        <Reveal delay={.08} className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <blockquote className="max-w-5xl text-4xl leading-[.96] sm:text-5xl lg:col-span-9 lg:text-7xl">The best interiors do not ask for attention. They make the everyday feel considered.</blockquote>
          <p className="editorial-label border-t border-brand-ink/25 pt-4 text-brand-ink/55 lg:col-span-3">Pixel approach<br />to lasting spaces</p>
        </Reveal>
      </Container>
    </section>
  );
}
