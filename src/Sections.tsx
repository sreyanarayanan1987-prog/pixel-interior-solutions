/* Sections used by the home page and contact page. */
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Send, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { contactInfo, galleryItems, processSteps, services, testimonials } from "./EDIT_THIS_FILE";
import { Button, Container, KineticTitle, Reveal } from "./Components";

// ===== ContactForm.tsx =====

type Status = "idle" | "submitting" | "success" | "error";

// Keep the separate contact form's existing Formspree integration unchanged.
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

export function CustomerReviewSection() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const review = String(formData.get("review") ?? "").trim();
    const selectedRating = Number(formData.get("rating"));
    const phone = contactInfo.phone.replace(/\D/g, "");
    const message = [
      `Customer review for ${contactInfo.brandName}`,
      `Name: ${name}`,
      `Rating: ${selectedRating}/5`,
      `Review: ${review}`,
    ].join("\n");

    window.location.assign(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <section className="bg-brand-cream py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="editorial-label text-brand-ink/55">Share your experience</p>
            <h2 className="mt-5 font-display text-4xl font-semibold text-brand-green-900 sm:text-5xl">
              Your feedback means a lot.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-text-light">
              Tell us about your experience. We’ll open WhatsApp with your review
              ready to send to our team.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="review-name" className="text-sm font-medium text-brand-green-900">
                Your name
              </label>
              <input
                id="review-name"
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
                className="rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-brand-green-900">Your rating</legend>
              <div
                role="radiogroup"
                aria-label="Choose a star rating"
                className="flex w-fit gap-1"
                onMouseLeave={() => setHoveredRating(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className="cursor-pointer rounded-sm p-1 focus-within:outline focus-within:outline-2 focus-within:outline-brand-gold-600"
                    onMouseEnter={() => setHoveredRating(value)}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="rating"
                      value={value}
                      required
                      checked={rating === value}
                      onChange={() => setRating(value)}
                      aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    />
                    <Star
                      aria-hidden="true"
                      className={`h-7 w-7 transition-colors ${
                        value <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-500"
                          : "text-neutral-300"
                      }`}
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="review-message" className="text-sm font-medium text-brand-green-900">
                Your review
              </label>
              <textarea
                id="review-message"
                name="review"
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                placeholder="Share a few words about your experience..."
                className="resize-y rounded-lg border border-brand-cream-dark bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-gold-500"
              />
            </div>

            <Button type="submit" variant="primary">
              Continue to WhatsApp
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
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

const isPlaceholderTestimonial = (quote: string, name: string) => {
  const normalizedQuote = quote.toLowerCase();
  return (
    name.toLowerCase() === "client name" ||
    normalizedQuote.includes("placeholder testimonial") ||
    normalizedQuote.includes("swap this for a real client quote")
  );
};

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const visibleTestimonials = testimonials.filter(
    (testimonial) => !isPlaceholderTestimonial(testimonial.quote, testimonial.name)
  ).map((testimonial) => ({ ...testimonial, rating: 5 }));

  useEffect(() => {
    if (visibleTestimonials.length < 2 || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleTestimonials.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [paused, visibleTestimonials.length]);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const cardWidth = trackRef.current.firstElementChild?.getBoundingClientRect().width ?? 360;
    const gap = 20;
    trackRef.current.scrollTo({
      left: activeIndex * (cardWidth + gap),
      behavior: "smooth",
    });
  }, [activeIndex, visibleTestimonials.length]);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  const showPrevious = () => {
    setPaused(true);
    setActiveIndex((current) => (current - 1 + visibleTestimonials.length) % visibleTestimonials.length);
  };

  const showNext = () => {
    setPaused(true);
    setActiveIndex((current) => (current + 1) % visibleTestimonials.length);
  };

  return (
    <section
      className="bg-brand-cream py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container>
        <Reveal>
          <p className="editorial-label text-brand-ink/55">04 / The feeling</p>
        </Reveal>

        <Reveal delay={.08} className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <blockquote className="max-w-5xl text-4xl leading-[.96] sm:text-5xl lg:col-span-9 lg:text-7xl">
            The best interiors do not ask for attention. They make the everyday feel considered.
          </blockquote>

          <div className="flex items-center justify-between gap-3 border-t border-brand-ink/25 pt-4 lg:col-span-3">
            <p className="editorial-label text-brand-ink/55">Pixel approach<br />to lasting spaces</p>
            {visibleTestimonials.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Show previous testimonial"
                  onClick={showPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/20 bg-white text-brand-ink transition hover:bg-brand-cream"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Show next testimonial"
                  onClick={showNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/20 bg-white text-brand-ink transition hover:bg-brand-cream"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {visibleTestimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    setActiveIndex(index);
                  }}
                  className="group w-[min(82vw,320px)] shrink-0 text-left transition-all duration-300 sm:w-[300px] lg:w-[320px]"
                >
                  <article
                    className={`flex h-full min-h-[260px] flex-col justify-between rounded-[28px] border p-6 shadow-[0_14px_40px_rgba(15,32,26,0.06)] transition-all duration-300 sm:p-7 ${
                      isActive
                        ? "border-brand-ink/15 bg-white shadow-[0_18px_50px_rgba(15,32,26,0.12)]"
                        : "border-brand-ink/10 bg-[#f8f5f2] opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-yellow-500">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={`${testimonial.id}-star-${starIndex}`}
                            className={`h-4 w-4 ${starIndex < testimonial.rating ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>

                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold-100 text-lg text-brand-gold-600">
                        “
                      </span>
                    </div>

                    <p className="mt-5 text-lg leading-relaxed text-brand-text-light sm:text-xl">
                      {testimonial.quote}
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-brand-ink/10 pt-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold-200 to-brand-green-200 text-sm font-semibold text-brand-green-900">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>

                      <div>
                        <p className="font-semibold text-brand-green-900">{testimonial.name}</p>
                        {testimonial.source && (
                          <p className="text-sm text-brand-ink/55">{testimonial.source}</p>
                        )}
                      </div>
                    </div>
                  </article>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
