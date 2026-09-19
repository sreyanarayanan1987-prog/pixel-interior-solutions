/*
  EDIT THIS FILE to change the words, contact details, services, FAQs, and images.
  You do not need to edit the other files for normal website updates.
*/

// These simple types help TypeScript catch accidental mistakes while you edit.
// You can safely ignore them for normal content updates.
export interface NavLink { label: string; path: string; }
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: "home" | "building" | "kitchen" | "wardrobe" | "key";
  image?: string;
}
export interface ProcessStep { id: string; title: string; description: string; }
export interface Testimonial { id: string; name: string; quote: string; source?: string; }
export interface GalleryItem { id: string; title: string; category: string; image: string; }
export interface FaqItem { id: string; question: string; answer: string; }
export interface ContactInfo {
  brandName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  website: string;
  whatsappUrl: string;
  socials: { instagram?: string; facebook?: string; pinterest?: string; };
}

// Business details shown in the header, footer, and contact page.
export const contactInfo: ContactInfo = {
  brandName: "Pixel Interior Solutions",
  tagline: "Designing Spaces, Defining Lifestyles",
  phone: "+916238503639",
  phoneDisplay: "62385 03639",
  email: "pixelinteriorsolutions@gmail.com",
  address: "Nalleppully, Palakkad, Kerala",
  website: "www.pixelinteriors.com",
  whatsappUrl:
    "https://wa.me/916238503639?text=Hi%20Pixel%20Interior%20Solutions%2C%20I%27d%20like%20to%20know%20more%20about%20your%20interior%20design%20services.",
  socials: {
    instagram: "#",
    facebook: "#",
    pinterest: "#",
  },
};

// The links in the top menu.
export const navLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// Services shown on the home page and services page.
export const services: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential",
    description:
      "Complete home interiors tailored to how you actually live — from a single room to a full house.",
    icon: "home",
    image: "/images/residential/r0.jpeg",
  },
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    description:
      "Space-efficient, durable modular kitchens designed around your workflow and storage needs.",
    icon: "kitchen",
    image: "/images/k10.jpeg",
  },
  {
    id: "wardrobes",
    title: "Wardrobes",
    description:
      "Custom wardrobes and storage units that make the most of every corner.",
    icon: "wardrobe",
    image: "/images/wardrobes/w2.jpeg",
  },
];

// Steps shown in the process section on the home page.
export const processSteps: ProcessStep[] = [
  {
    id: "consult",
    title: "Consultation",
    description:
      "We visit your space, understand your lifestyle and budget, and outline what's possible.",
  },
  {
    id: "design",
    title: "Design & Approval",
    description:
      "Detailed 3D designs and material selections, refined with you until every detail is right.",
  },
  {
    id: "production",
    title: "Production",
    description:
      "Your furniture and woodwork are manufactured with precision quality control.",
  },
  {
    id: "execution",
    title: "Delivery & Execution",
    description:
      "On-site installation managed end-to-end, with regular updates until handover.",
  },
];

// Replace these with real client testimonials when available.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Client Name",
    quote:
      "Placeholder testimonial — swap this for a real client quote before launch.",
    source: "Google",
  },
  {
    id: "t2",
    name: "Client Name",
    quote:
      "Placeholder testimonial — swap this for a real client quote before launch.",
    source: "Google",
  },
  {
    id: "t3",
    name: "Client Name",
    quote:
      "Placeholder testimonial — swap this for a real client quote before launch.",
    source: "Google",
  },
];

// Add your photos to public/images and update these filenames if needed.
export const galleryItems: GalleryItem[] = [
  { id: "r0", title: "Residential Interior", category: "Residential", image: "/images/residential/r0.jpeg" },
  { id: "r1", title: "Residential Interior", category: "Residential", image: "/images/residential/r1.jpeg" },
  { id: "r2", title: "Residential Interior", category: "Residential", image: "/images/residential/r2.jpeg" },
  { id: "r3", title: "Residential Interior", category: "Residential", image: "/images/residential/r3.jpeg" },
  { id: "r4", title: "Residential Interior", category: "Residential", image: "/images/residential/r4.jpeg" },
  { id: "r5", title: "Residential Interior", category: "Residential", image: "/images/residential/r5.jpeg" },
  { id: "r6", title: "Residential Interior", category: "Residential", image: "/images/residential/r6.jpeg" },
  { id: "r7", title: "Residential Interior", category: "Residential", image: "/images/residential/r7.jpeg" },
  { id: "r8", title: "Residential Interior", category: "Residential", image: "/images/residential/r8.jpeg" },
  { id: "r9", title: "Residential Interior", category: "Residential", image: "/images/residential/r9.jpeg" },
  { id: "r10", title: "Residential Interior", category: "Residential", image: "/images/residential/r10.jpeg" },
  { id: "g2", title: "The Gathering Kitchen", category: "Kitchen", image: "/images/kitchen/k1.jpeg" },
  { id: "k2", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k2.jpeg" },
  { id: "k3", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k3.jpeg" },
  { id: "k4", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k4.jpeg" },
  { id: "k5", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k5.jpeg" },
  { id: "k6", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k6.jpeg" },
  { id: "k7", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k7.jpeg" },
  { id: "k8", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k8.jpeg" },
  { id: "k9", title: "Modular Kitchen", category: "Kitchen", image: "/images/kitchen/k9.jpeg" },
  { id: "k10", title: "Modular Kitchen", category: "Kitchen", image: "/images/k10.jpeg" },
  { id: "w1", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w1.jpeg" },
  { id: "w2", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w2.jpeg" },
  { id: "w3", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w3.jpeg" },
  { id: "w4", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w4.jpg" },
  { id: "w5", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w5.jpeg" },
  { id: "w6", title: "Wardrobe Interior", category: "Wardrobes", image: "/images/wardrobes/w6.jpeg" },
  { id: "g5", title: "Work, Considered", category: "Commercial", image: "/images/gallery-05.jpg" },
];

// Questions and answers shown on the services page.
export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "What is the process for hiring Pixel Interior Solutions?",
    answer:
      "Reach out via call, WhatsApp or the contact form. We'll set up a consultation to understand your space, requirements and budget, then assign a designer to your project.",
  },
  {
    id: "f2",
    question: "Which areas do you serve?",
    answer:
      "We're based in Nalleppully, Palakkad and serve clients across Palakkad and neighbouring parts of Kerala. Get in touch to confirm coverage for your location.",
  },
  {
    id: "f3",
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope, but most residential projects are completed within 35–45 working days from design finalisation.",
  },
  {
    id: "f4",
    question: "Do you offer a warranty on woodwork?",
    answer:
      "Yes, our woodwork comes with a warranty against manufacturing and installation defects. Ask your design consultant for specifics.",
  },
];
