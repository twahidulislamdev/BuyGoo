import React from "react";
import Container from "../Container";

/* ─────────── Components ─────────── */
const Section = ({ children, className = "" }) => (
  <section className={`py-28 ${className}`}>{children}</section>
);

const Button = ({ children, variant = "primary" }) => {
  const base =
    "px-8 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 active:scale-[0.985]";
  const styles = {
    primary: "bg-red-500 text-white hover:bg-black hover:text-white",
    outline: "border border-black text-black hover:bg-black hover:text-white",
  };
  return <button className={`${base} ${styles[variant]}`}>{children}</button>;
};

const FeatureCard = ({ num, title, desc }) => (
  <div className="group p-8 border border-black/10 rounded-3xl hover:border-red-500 transition-all duration-300">
    <p className="text-6xl font-light text-black/10 group-hover:text-red-500/30 transition-colors mb-6">
      {num}
    </p>
    <h4 className="text-xl font-semibold text-black mb-3 group-hover:text-red-500 transition-colors">
      {title}
    </h4>
    <p className="text-black/70 text-[15px] leading-relaxed">{desc}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center">
    <p className="text-5xl font-light text-black tracking-tight">
      <span className="text-red-500">{value}</span>
    </p>
    <p className="mt-2 text-xs uppercase tracking-widest text-black/50 font-medium">
      {label}
    </p>
  </div>
);

const CheckItem = ({ text }) => (
  <li className="flex gap-4 items-start text-black/80">
    <span className="mt-1 w-5 h-5 flex items-center justify-center rounded-full border border-red-500 text-red-500 text-xs flex-shrink-0">
      ✓
    </span>
    <span className="text-[15px]">{text}</span>
  </li>
);

/* ─────────── Data ─────────── */
const features = [
  {
    num: "01",
    title: "Authentic",
    desc: "All products are verified genuine with full warranty.",
  },
  {
    num: "02",
    title: "Fast Delivery",
    desc: "Reliable shipping with real-time tracking.",
  },
  {
    num: "03",
    title: "Best Prices",
    desc: "Premium quality without premium markup.",
  },
];

const stats = [
  { value: "5K+", label: "Customers" },
  { value: "1K+", label: "Products" },
  { value: "3+", label: "Years" },
  { value: "24/7", label: "Support" },
];

const promises = [
  "Authenticity guaranteed",
  "Transparent pricing",
  "24/7 customer support",
  "Easy returns policy",
  "Fast & secure delivery",
];

/* ─────────── Main Component ─────────── */
const About = () => {
  return (
    <div className="bg-white text-black">
      {/* HERO - Clean & Minimal */}
      <Section className="pt-16 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-15 px-3">
            <p className="text-red-500 text-xs tracking-[3px] uppercase font-medium mb-4">
              PRIME TECH STORE
            </p>
            <h1 className="text-6xl md:text-7xl font-light tracking-tighter leading-none mb-6">
              Technology that{" "}
              <span className="text-red-500 font-normal">empowers</span> you
            </h1>
            <p className="text-black/70 text-lg max-w-md mx-auto">
              Curated smartphones, laptops, and smart gadgets for modern living.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button>Explore Collection</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </Container>
      </Section>

      {/* IMAGE + HERO VISUAL */}
      <Section className="pt-0 pb-28">
        <Container>
          <img
            src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece"
            className="w-full px-3 rounded-3xl border border-black/10"
            alt="Tech lifestyle"
          />
        </Container>
      </Section>

      {/* STATS */}
      <Section className="bg-zinc-50 py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section>
        <Container>
          <div className="text-center mb-15 px-3">
            <h2 className="text-4xl font-light tracking-tight">
              Why <span className="text-red-500">Prime Tech</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-3">
            {features.map((f) => (
              <FeatureCard key={f.num} {...f} />
            ))}
          </div>
        </Container>
      </Section>

      {/* STORY */}
      <Section className="bg-zinc-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-15 items-center px-3">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              className="rounded-3xl px-3 border border-black/10 w-full"
              alt="Our journey"
            />
            <div className="space-y-6 px-3">
              <h2 className="text-4xl font-light tracking-tight">
                Our <span className="text-red-500">Journey</span>
              </h2>
              <p className="text-black/70 text-[15px] leading-relaxed">
                We created Prime Tech to make buying premium technology simple,
                trustworthy, and enjoyable.
              </p>
              <p className="text-black/70 text-[15px] leading-relaxed">
                What started as a small idea has now grown into a platform
                trusted by thousands who value quality and transparency.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROMISE */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto px-3">
            <h2 className="text-4xl font-light tracking-tight text-center">
              Our <span className="text-red-500">Promise</span>
            </h2>

            <ul className="space-y-6 max-w-md mx-auto flex justify-center items-center flex-col mt-10">
              {promises.map((p) => (
                <CheckItem key={p} text={p} />
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center bg-black text-white">
        <Container>
          <h2 className="text-5xl font-light tracking-tighter mb-4">
            Find your next device
          </h2>
          <p className="text-white/70 mb-10 max-w-sm mx-auto">
            Premium gadgets. Honest prices. Exceptional experience.
          </p>
          <Button className="bg-red-500 hover:bg-white hover:text-black text-base px-12 py-4">
            Shop Now
          </Button>
        </Container>
      </Section>
    </div>
  );
};

export default About;
