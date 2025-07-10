import { isAnswerValid } from '../utils/TypeCheck';
import CustomSelect from './CustomSelect';

type Question = {
  type: string;
  subtitle?: string | undefined;
  question: string;
  options?: string[];
};

type Props = {
  step: number;
  data: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  setError?: (err: string) => void; // <-- add this
  onSubmit?: (isFinalStep: boolean) => void;
  isLast?: boolean;
};



export default function QuestionSlide({ step, data, value, onChange, error, onSubmit, isLast ,setError}: Props) {
  const isEmpty = !value || value.trim() === '';
   

  const handleOkClick = () => {
  if (!isAnswerValid(value, data)) {
    if (setError) setError(`Please provide a valid answer for: "${data.question}"`);
    return;
  }

  if (setError) setError(''); // clear any previous error

  if (onSubmit) onSubmit(Boolean(isLast));
};
 const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submit/default behavior
      handleOkClick();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div>
        <h2 className="text-2xl">{step} → {data.question}</h2>
        {data.subtitle && <p className='mt-1'>{data.subtitle}</p>}
      </div>

      {(data.type === 'text' || data.type === 'email' )&& (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-6 bg-transparent border-b border-white text-white placeholder-gray-400 outline-none text-3xl w-full py-2"
          placeholder="Type your answer here..."
        />
      )}

      {data.type === 'date' && (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          max={new Date().toISOString().split('T')[0]} 
          className="mt-6 bg-transparent border-b border-white text-white placeholder-gray-400 outline-none text-3xl w-full py-2"
        />
      )}

      {data.type === 'select' && data.options && (
        <CustomSelect options={data.options} selected={value} onSelect={onChange} />
      )}

      {error && (
        <p className="text-red-500 font-bold mt-4">{error}</p>
      )}

      <button
        onClick={handleOkClick}
        disabled={isEmpty}
        className={`mt-6 px-4 py-2 font-bold rounded ${
          isEmpty ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-[#540C0C]'
        }`}
      >
        {isLast ? 'Submit' : 'OK'}
      </button>
    </div>
  );
}
