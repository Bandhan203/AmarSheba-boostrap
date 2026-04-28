import { ChevronDown } from 'lucide-react';

interface FaqAccordionItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

export const FaqAccordionItem = ({ question, answer, open, onToggle }: FaqAccordionItemProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="text-sm font-semibold text-slate-900 md:text-base">{question}</span>
        <ChevronDown size={18} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-slate-600">{answer}</p>}
    </div>
  );
};
