import React from 'react';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function CustomSelect({ options, selected, onSelect }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative mt-6 w-full">
      <div
        onClick={() => setOpen(!open)}
        className="border border-white bg-[#540C0C] text-white px-4 py-3 rounded cursor-pointer flex justify-between items-center"
      >
        <span>{selected || 'Select an option'}</span>
        <span className="ml-2">▾</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-[#540C0C] border border-white rounded z-50">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer border-b border-[#6b1b1b] hover:bg-[#6b1b1b] ${
                selected === opt ? 'bg-[#6b1b1b]' : ''
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
