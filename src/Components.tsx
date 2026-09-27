/* Shared visual building blocks. Change only when changing the layout or design. */
import { AnimatePresence, motion } from "framer-motion";
import { Building2, DoorOpen, Home, KeyRound, Mail, MapPin, Menu, Phone, UtensilsCrossed, X } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink, Outlet, useLocation } from "react-router-dom";
import { contactInfo, navLinks } from "./EDIT_THIS_FILE";
import type { ServiceItem } from "./EDIT_THIS_FILE";

// ===== Button.tsx =====

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-ink text-brand-cream hover:bg-brand-green-800",
  secondary:
    "bg-brand-cream text-brand-ink hover:bg-brand-cream-dark",
  ghost:
    "border border-current text-inherit hover:bg-white/10",
};

const base =
  "editorial-label inline-flex items-center justify-center gap-3 rounded-none px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 cursor-pointer";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Renders an <a> when `href` is provided, otherwise a <button>. */
export function Button(props: AsButton | AsAnchor) {
  const { variant = "primary", children, className = "", ...rest } = props;
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}


// ===== Container.tsx =====

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Consistent max-width + horizontal padding wrapper used across all sections. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}


// ===== EditorialSplit.tsx =====

interface EditorialSplitProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  children?: ReactNode;
  imagePosition?: "left" | "right";
  delay?: number;
  className?: string;
}

/**
 * Editorial split layout with image and text side-by-side.
 * Alternates position based on imagePosition prop.
 * Includes staggered animations for premium feel.
 */
export function EditorialSplit({
  image,
  imageAlt,
  title,
  description,
  children,
  imagePosition = "left",
  delay = 0,
  className = "",
}: EditorialSplitProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div
      className={`grid gap-8 items-center lg:grid-cols-2 lg:gap-12 xl:gap-16 ${className}`}
    >
      <motion.div
        className={isImageLeft ? "lg:order-1" : "lg:order-2"}
        initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="overflow-hidden aspect-video">
          <motion.img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: delay + 0.1 }}
          />
        </div>
      </motion.div>

      <motion.div
        className={isImageLeft ? "lg:order-2" : "lg:order-1"}
        initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-5">
          <h3 className="font-display text-4xl font-semibold text-brand-green-900">
            {title}
          </h3>
          <p className="text-lg leading-relaxed text-brand-ink/70">{description}</p>
          {children}
        </div>
      </motion.div>
    </div>
  );
}


// ===== FeaturedSection.tsx =====

interface FeaturedSectionProps {
  image: string;
  imageAlt: string;
  overline?: string;
  title: string;
  subtitle?: string;
  height?: "small" | "medium" | "large";
}

const heightClasses = {
  small: "h-96",
  medium: "h-screen",
  large: "h-screen",
};

/**
 * Full-width cinematic featured section with image background.
 * Perfect for hero sections and featured imagery.
 */
export function FeaturedSection({
  image,
  imageAlt,
  overline,
  title,
  subtitle,
  height = "medium",
}: FeaturedSectionProps) {
  return (
    <section className={`relative w-full overflow-hidden ${heightClasses[height]} flex items-center justify-center`}>
      {/* Background image with zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex max-w-2xl flex-col gap-4 text-white">
          {overline && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-script text-3xl sm:text-4xl text-brand-gold-400"
            >
              {overline}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-lg sm:text-xl text-white/85 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/60"
      >
        <span className="flex flex-col items-center gap-2">
          Scroll
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-6 w-px bg-white/50"
          />
        </span>
      </motion.div>
    </section>
  );
}


// ===== ImageBlock.tsx =====

interface ImageBlockProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  children?: ReactNode;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}

const aspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

/**
 * Premium image block with reveal animation and optional overlay content.
 * Supports various aspect ratios and smooth entrance animations.
 */
export function ImageBlock({
  src,
  alt,
  delay = 0,
  className = "",
  children,
  aspectRatio = "video",
}: ImageBlockProps) {
  return (
    <motion.div
      className={`overflow-hidden ${aspectRatios[aspectRatio]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative h-full w-full">
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        />
        {children && (
          <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 sm:p-8">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}


// ===== KineticTitle.tsx =====

interface KineticTitleProps {
  children: string;
  className?: string;
  delay?: number;
}

/** A line-by-line editorial title reveal for landing and section headings. */
export function KineticTitle({ children, className = "", delay = 0 }: KineticTitleProps) {
  const lines = children.split("\n");

  return (
    <h1 className={className} aria-label={children.replace("\n", " ")}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "112%", rotate: 1 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.05, delay: delay + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}


// ===== PageHeader.tsx =====

interface PageHeaderProps { eyebrow: string; title: string; description?: string; image?: string; }
const fallbackImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85";

export function PageHeader({ eyebrow, title, description, image = fallbackImage }: PageHeaderProps) {
  return (
    <section className="grain relative flex min-h-[72svh] items-end overflow-hidden bg-brand-ink pt-20 text-white">
      <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-9 px-6 pb-9 sm:px-10 lg:grid-cols-12 lg:px-14">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }} className="editorial-label text-white/65 lg:col-span-3">{eyebrow}</motion.p>
        <div className="lg:col-span-9">
          <KineticTitle className="max-w-5xl text-6xl leading-[.84] sm:text-7xl lg:text-9xl" delay={.1}>{title}</KineticTitle>
          {description && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .65 }} className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{description}</motion.p>}
        </div>
      </div>
    </section>
  );
}


// ===== Reveal.tsx =====

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}

/**
 * Wraps children in a fade-up-on-scroll animation, mirroring the subtle
 * section reveals used on era-residence.com. Animates once, the first time
 * the element enters the viewport.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}


// ===== SectionHeading.tsx =====
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  size = "lg",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  
  const titleSizes = {
    sm: "text-4xl sm:text-5xl",
    md: "text-5xl sm:text-6xl",
    lg: "text-5xl sm:text-6xl lg:text-7xl",
    xl: "text-6xl sm:text-7xl lg:text-8xl",
  };

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClasses}`}>
      {eyebrow && (
        <span
          className={`editorial-label ${light ? "text-white/60" : "text-brand-ink/55"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display leading-[.91] ${titleSizes[size]} ${
          light ? "text-white" : "text-brand-green-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl text-base sm:text-lg leading-relaxed ${light ? "text-white/65" : "text-brand-text-light"}`}>
          {description}
        </p>
      )}
    </div>
  );
}


// ===== ServiceIcon.tsx =====

const iconMap: Record<ServiceItem["icon"], typeof Home> = {
  home: Home,
  building: Building2,
  kitchen: UtensilsCrossed,
  wardrobe: DoorOpen,
  key: KeyRound,
};

export function ServiceIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: ServiceItem["icon"];
  className?: string;
}) {
  const IconComponent = iconMap[icon];
  return <IconComponent className={className} strokeWidth={1.75} />;
}


// ===== SocialIcons.tsx =====
type IconProps = { className?: string };

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8.4h2.8l.42-3.27H13.5V7.2c0-.95.26-1.6 1.63-1.6h1.74V2.7A23 23 0 0 0 14.6 2.6c-2.42 0-4.08 1.48-4.08 4.2v2.7H7.7v3.27h2.82V21h2.98z" />
    </svg>
  );
}

export function PinterestIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.15 2 11.28c0 3.4 2 6.35 4.94 7.9-.07-.67-.13-1.7.03-2.44.14-.63.9-4 .9-4s-.23-.46-.23-1.13c0-1.06.62-1.85 1.38-1.85.65 0 .97.49.97 1.07 0 .65-.42 1.63-.63 2.53-.18.76.38 1.38 1.14 1.38 1.36 0 2.42-1.43 2.42-3.5 0-1.83-1.32-3.11-3.2-3.11-2.18 0-3.46 1.63-3.46 3.32 0 .66.25 1.36.57 1.75a.23.23 0 0 1 .05.22c-.06.24-.19.76-.22.87-.03.14-.11.17-.26.1-.97-.45-1.58-1.87-1.58-3.01 0-2.45 1.78-4.71 5.14-4.71 2.7 0 4.8 1.92 4.8 4.49 0 2.68-1.69 4.83-4.03 4.83-.79 0-1.53-.41-1.78-.9l-.48 1.85c-.18.68-.66 1.53-.98 2.05.74.23 1.52.35 2.33.35 5.52 0 10-4.15 10-9.28C22 6.15 17.52 2 12 2z" />
    </svg>
  );
}


// ===== Footer.tsx =====

export function Footer() {
  return (
    <footer className="bg-brand-green-950 text-white/80">
      {/* Main footer content */}
      <Container className="grid gap-16 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Brand section */}
        <div className="flex flex-col gap-6">
          <div>
            <img
              src="/images/logo-dark.jpg"
              alt="Pixel Interior Solutions"
              className="h-24 w-auto rounded-sm object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-white/70">{contactInfo.tagline}</p>
          
          {/* Social links */}
          <div className="flex gap-4 pt-2">
            <a
              href={contactInfo.socials.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-gold-400 transition-colors"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={contactInfo.socials.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-gold-400 transition-colors"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div>
          <h3 className="mb-6 font-display text-base font-semibold text-white uppercase tracking-wide">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="text-white/70 hover:text-brand-gold-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="mb-6 font-display text-base font-semibold text-white uppercase tracking-wide">
            Contact
          </h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-400 flex-shrink-0" />
              <span className="text-white/70">{contactInfo.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-gold-400" />
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="text-white/70 hover:text-brand-gold-400 transition-colors"
              >
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-gold-400" />
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="text-white/70 hover:text-brand-gold-400 transition-colors break-all"
              >
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours & CTA */}
        <div>
          <h3 className="mb-6 font-display text-base font-semibold text-white uppercase tracking-wide">
            Hours
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li>Monday - Saturday</li>
            <li>9:30 AM - 6:30 PM</li>
            <li className="pt-2">
              <a 
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#20BA5C] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>

      {/* Footer bottom */}
      <div className="border-t border-white/10 py-8">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>Â© {new Date().getFullYear()} {contactInfo.brandName}. All rights reserved.</p>
          <p>{contactInfo.website}</p>
        </Container>
      </div>
    </footer>
  );
}


// ===== Header.tsx =====

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-brand-cream/95 backdrop-blur-md border-b border-brand-ink/10" 
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}
        <RouterNavLink 
          to="/" 
          className={`group flex flex-col leading-none transition-colors ${scrolled ? "text-brand-ink" : "text-white"}`}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/images/logo.png" alt="Pixel Interior Solutions" className="h-14 w-auto object-contain" style={{ transform: "translateX(-60px)" }} />
        </RouterNavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `editorial-label border-b border-transparent pb-1 transition-colors duration-300 ${
                  scrolled ? "text-brand-ink/65 hover:text-brand-ink" : "text-white/75 hover:text-white"
                } ${isActive ? (scrolled ? "border-brand-ink text-brand-ink" : "border-white text-white") : ""}`
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <RouterNavLink
            to="/contact"
            className={`editorial-label border px-4 py-3 transition-all duration-300 ${
              scrolled
                ? "border-brand-ink bg-brand-ink text-brand-cream hover:bg-brand-green-800"
                : "border-white/60 text-white hover:bg-white hover:text-brand-ink"
            }`}
          >
            Get Started
          </RouterNavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className={`lg:hidden transition-colors ${
            scrolled ? "text-brand-ink" : "text-white"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-brand-cream/98 backdrop-blur-md border-t border-brand-ink/10 lg:hidden"
          >
            <Container className="flex flex-col gap-2 py-6">
              {navLinks.map((link) => (
                <RouterNavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive 
                        ? "bg-brand-ink text-brand-cream" 
                        : "text-brand-ink/70 hover:bg-brand-cream-dark"
                    }`
                  }
                >
                  {link.label}
                </RouterNavLink>
              ))}
              <div className="my-2 border-t border-brand-ink/10" />
              <RouterNavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-base font-medium bg-brand-ink text-brand-cream text-center"
              >
                Get Started
              </RouterNavLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


// ===== Layout.tsx =====

export function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}


// ===== WhatsAppButton.tsx =====

export function WhatsAppButton() {
  return (
    <motion.a
      href={contactInfo.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.98.577 3.827 1.573 5.383L2 22l4.735-1.544A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18.2c-1.75 0-3.383-.522-4.75-1.417l-.34-.213-3.31 1.08 1.098-3.222-.22-.334A8.19 8.19 0 0 1 3.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.523-3.678 8.2-8.199 8.2z" />
      </svg>
    </motion.a>
  );
}

