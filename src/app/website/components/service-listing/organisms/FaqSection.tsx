import { useState } from 'react';
import { FaqAccordionItem } from '../molecules/FaqAccordionItem';

interface FaqSectionProps {
  items: { q: string; a: string }[];
}

export const FaqSection = ({ items }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="rounded-3xl bg-white p-6 md:p-8">
      <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">Service Page FAQs</h2>
      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {items.map((item, index) => (
          <FaqAccordionItem
            key={item.q}
            question={item.q}
            answer={item.a}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
          />
        ))}
      </div>
    </section>
  );
};
