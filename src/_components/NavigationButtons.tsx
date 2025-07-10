import { ChevronUp, ChevronDown } from 'lucide-react';

export default function NavigationButtons({ prev, next, showNext }: { prev: () => void; next: () => void; showNext: boolean }) {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <button onClick={prev} className="w-12 h-12 flex items-center justify-center bg-white text-[#540C0C] rounded-full shadow">
        <ChevronUp size={20} />
      </button>
      {showNext && (
        <button onClick={next} className="w-12 h-12 flex items-center justify-center bg-white text-[#540C0C] rounded-full shadow">
          <ChevronDown size={20} />
        </button>
      )}
    </div>
  );
}
