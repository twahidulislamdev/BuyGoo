import { Truck, Headphones, ShieldCheck } from "lucide-react";
import Container from "../Container";

const features = [
  {
    icon: Truck,
    title: "Free & Fast Delivery",
    description: "Free delivery on all orders over $140",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Service",
    description: "Friendly support whenever you need it",
  },
  {
    icon: ShieldCheck,
    title: "Money Back Guarantee",
    description: "Full refund within 30 days, no hassle",
  },
];

export default function Policy() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-50 py-10 sm:py-14 lg:py-16">
      {/* Soft background accents */}
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-mainColor/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-48 w-48 rounded-full bg-mainColor/5 blur-3xl"
        aria-hidden
      />

      <Container className="relative px-4 sm:px-6 lg:px-0">
        {/* Section label — matches other home sections */}
        <div className="mb-6 flex items-center gap-2 sm:mb-8">
          <span className="h-6 w-3 rounded-sm bg-mainColor sm:h-7 sm:w-4" />
          <p className="text-sm font-semibold text-mainColor sm:text-base">
            Why shop with us
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-mainColor/25 hover:shadow-[0_12px_32px_rgba(251,44,54,0.1)] sm:flex-col sm:items-center sm:p-7 sm:text-center lg:p-8"
            >
              {/* Hover highlight */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-mainColor to-transparent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
              />

              {/* Icon */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mainColor/10 text-mainColor ring-1 ring-mainColor/15 transition-all duration-300 group-hover:bg-mainColor group-hover:text-white group-hover:ring-mainColor group-hover:shadow-lg group-hover:shadow-mainColor/25 sm:h-16 sm:w-16 sm:rounded-full">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
              </div>

              {/* Copy */}
              <div className="min-w-0 flex-1 sm:flex-none">
                <h3 className="text-[15px] font-bold leading-snug text-gray-900 sm:text-base">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 sm:mt-2">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
