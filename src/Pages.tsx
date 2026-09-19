/* The five website pages live together here. */
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { contactInfo, galleryItems, services } from "./EDIT_THIS_FILE";
import { Container, PageHeader, Reveal, ServiceIcon } from "./Components";
import { CTASection, ContactForm, Hero, ProcessSteps, Testimonials } from "./Sections";

// ===== About.tsx =====

const values = [
  "Fully customized designs tailored to your space and lifestyle",
  "In-house design, production, and execution for complete accountability",
  "Premium materials with comprehensive warranty coverage",
  "Transparent communication and regular project updates",
];

const team = [
  {
    title: "Design Philosophy",
    description:
      "We believe that great interiors start with listening. Before we sketch a single line, we understand how you live, what matters to you, and your vision for the space. Every design decision serves a purpose.",
  },
  {
    title: "Quality Commitment",
    description:
      "From material selection to final installation, quality is never compromised. We partner with trusted suppliers and employ skilled craftspeople who share our commitment to excellence.",
  },
  {
    title: "Complete Service",
    description:
      "We handle everythingâ€”design, production, and executionâ€”under one roof. This means seamless coordination, consistent quality, and a single point of accountability for your entire project.",
  },
];

export function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Design with Purpose"
        description="Pixel Interior Solutions creates premium residential and commercial interiors for clients across Palakkad and Kerala."
      />

      {/* Main About Section */}
      <section className="bg-white py-32 lg:py-40">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-green-900 mb-6">
                  Who We Are
                </h2>
                <p className="text-lg leading-relaxed text-brand-text-light mb-6">
                  We are a team of designers and craftspeople dedicated to creating interior spaces that people love living in. Based in Nalleppully, Palakkad, we work across residential and commercial projectsâ€”from modular kitchens and custom wardrobes to full turnkey homes.
                </p>
                <p className="text-lg leading-relaxed text-brand-text-light">
                  Every project is an opportunity to transform a space into something meaningful. We approach each with the same rigor, creativity, and attention to detailâ€”regardless of size or budget.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={0.15}>
            <div className="image-frame aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85"
                alt="Interior design workspace"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-brand-cream py-32 lg:py-40">
        <Container className="flex flex-col gap-16 lg:gap-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-green-900 mb-6">
                Our Commitment
              </h2>
              <p className="text-lg text-brand-text-light">
                What sets us apart is our approach. We listen before we design. We execute with precision. We stand behind every project.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value} delay={index * 0.08}>
                <div className="flex items-start gap-4 rounded-lg bg-white p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-gold-600 flex-shrink-0 mt-1" />
                  <span className="text-lg leading-relaxed text-brand-ink">{value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Pillars */}
      <section className="bg-white py-32 lg:py-40">
        <Container className="flex flex-col gap-16 lg:gap-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-green-900">
                How We Work
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-3">
            {team.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="flex flex-col gap-6">
                  <div className="h-12 w-12 rounded-lg bg-brand-gold-600/10 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-brand-gold-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-brand-green-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-brand-text-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}


// ===== Contact.tsx =====

export function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's Discuss Your Vision"
        description="Start a conversation with our design team. We're ready to listen and create."
      />

      <section className="bg-white py-32 lg:py-40">
        <Container className="grid gap-16 lg:grid-cols-5 lg:gap-12">
          {/* Contact Information */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-10 rounded-lg bg-brand-green-950 p-10 sm:p-12 text-white">
              <div>
                <h3 className="font-display text-2xl font-semibold mb-2">Contact Details</h3>
                <p className="text-base text-white/70 leading-relaxed">
                  Reach out directly or fill the form. We'll respond within 24 hours.
                </p>
              </div>

              <ul className="flex flex-col gap-6 text-base">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-gold-400 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">Address</span>
                    <span className="text-white/70">{contactInfo.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-gold-400 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">Phone</span>
                    <a 
                      href={`tel:${contactInfo.phone}`} 
                      className="text-white/70 hover:text-brand-gold-400 transition-colors"
                    >
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-gold-400 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">Email</span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white/70 hover:text-brand-gold-400 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-white/60 mb-4">Hours: Mon â€“ Sat, 9:30 AM â€“ 6:30 PM</p>
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#20BA5C] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-lg border border-neutral-200 bg-brand-cream/30 p-10 sm:p-12">
              <h3 className="font-display text-2xl font-semibold text-brand-green-900 mb-8">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Map Section */}
      <section className="h-[400px] sm:h-[500px] w-full bg-neutral-200">
        <iframe
          title="Pixel Interior Solutions location"
          src="https://www.google.com/maps?q=Nalleppully,+Palakkad,+Kerala&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}


// ===== Gallery.tsx =====

export function Gallery() {
  const [searchParams] = useSearchParams();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))],
    []
  );
  const requestedCategory = searchParams.get("category");
  const [active, setActive] = useState(
    requestedCategory && categories.includes(requestedCategory) ? requestedCategory : "All"
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  const selectedItem = selectedIndex === null ? null : filtered[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((current) => current === null ? 0 : (current + 1) % filtered.length);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => current === null ? filtered.length - 1 : (current - 1 + filtered.length) % filtered.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, filtered]);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Project Gallery"
        description="A curated collection of our finest interior design projects. Each space tells a story of transformation and craftsmanship."
      />

      <section className="bg-white py-32 lg:py-40">
        <Container className="flex flex-col gap-16 lg:gap-20">
          {/* Category Filter */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 border-y border-brand-ink/15 py-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`editorial-label px-4 py-2 transition-all duration-300 ${
                    active === cat
                      ? "bg-brand-ink text-brand-cream"
                      : "text-brand-ink/65 hover:text-brand-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {filtered.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="image-frame group relative block aspect-video w-full cursor-pointer text-left"
                  aria-label={`View ${item.title} full screen`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs uppercase tracking-widest text-brand-gold-400 font-medium">
                        {item.category}
                      </p>
                      <p className="font-display text-xl font-semibold text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} full screen viewer`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/15"
            aria-label="Close full screen viewer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length); }}
            className="absolute left-2 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/15 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <figure className="flex max-h-full max-w-6xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
            <img src={selectedItem.image} alt={selectedItem.title} className="max-h-[calc(100svh-7rem)] max-w-full object-contain" />
            <figcaption className="text-center text-white">
              <p className="editorial-label text-brand-gold-400">{selectedItem.category}</p>
              <p className="mt-1 font-display text-xl">{selectedItem.title}</p>
              <p className="mt-1 text-sm text-white/60">{selectedIndex + 1} / {filtered.length}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % filtered.length); }}
            className="absolute right-2 z-10 rounded-full p-3 text-white transition-colors hover:bg-white/15 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}


// ===== Home.tsx =====

export function Home() {
  return (
    <>
      <Hero />
      <ServicesPage />
      <Gallery />
      <ProcessSteps />
      <Testimonials />
      <CTASection />
    </>
  );
}


// ===== Services.tsx =====

export function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we offer"
        title="Complete Interior Solutions"
        description="From residential to commercial, modular kitchens to turnkey projects. Every service is backed by design excellence and meticulous execution."
      />

      {/* Services Grid */}
      <section className="bg-white py-32 lg:py-40">
        <Container className="flex flex-col gap-20 lg:gap-28">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <Link
                to={service.id === "modular-kitchen" ? "/gallery?category=Kitchen" : service.id === "residential" ? "/gallery?category=Residential" : service.id === "wardrobes" ? "/gallery?category=Wardrobes" : "/services"}
                className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start"
              >
                {/* Icon and title side */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-start gap-6">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-brand-green-900/10">
                      <ServiceIcon icon={service.icon} className="h-8 w-8 text-brand-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-3xl sm:text-4xl font-semibold text-brand-green-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-brand-text-light">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder image side */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="image-frame aspect-video">
                    <img
                      src={service.image ?? galleryItems[index % galleryItems.length].image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

    </>
  );
}

