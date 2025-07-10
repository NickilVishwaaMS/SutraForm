import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThankYou from './ThankYou';
import NavigationButtons from './NavigationButtons';
import QuestionSlide from './QuestionSlide';
import { isAnswerValid } from '../utils/TypeCheck';
import { db } from '../utils/config';
import { addDoc, collection } from 'firebase/firestore';

type Question = {
  type: string;
  subtitle?: string | undefined;
  question: string;
  options?: string[];
};


const questions:Question[] = [
  { type: 'text', question: 'What is your first name?' },
  { type: 'text', question: 'What is your last name?' },
  { type: 'date', question: 'When is your birthday?' },
  { type: 'text', question: 'Where are you from?', subtitle:'Country of Residence' },
  { type: 'email', question: 'E-mail Address', subtitle:`Don't worry, we won't spam!` },
  { type: 'select', question: 'What describes you best?', options: [
    'I wear modest fashion',
    'Im exploring modest style',
    'Im here for the aesthetics',
    'Im just curious!'] },
  { type: 'select', question: 'What are you most excited about?', options: [
    'Getting effortless and stylish summer looks',
    'Finding pre-styled modest outfits',
    'Discovering modest fashion brands',
    'Having a one-stop shop that actually gets modest fashion'] },
];

export default function TypeformStyleForm() {
    const [error, setError] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0 && step < questions.length + 1) next();
    else if (e.deltaY < 0) prev();
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [step]);

  const handleChange = (val: string) => {
    const updated = [...answers];
    updated[step - 2] = val;
    setAnswers(updated);
  };

  const next = () => {
  setStep(step + 1); // just move forward when told by QuestionSlide
};

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
  for (let i = 0; i < questions.length; i++) {
    
    if (!isAnswerValid(answers[i], questions[i])) {
      setError(`Please provide a valid answer for: "${questions[i].question}"`);
      return;
    }
  }
  const formattedData = questions.map((q, i) => ({
    question: q.question,
    answer: answers[i],
  }));

  setError('');
  setSubmitted(true);
  try{
    await addDoc(collection(db,'FormResult'),{responses:formattedData, timestamp:new Date()})
}
  catch(e){
    console.error(e)
  }
  
};

  

  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? ( <ThankYou/>) : step === 0 ? (
          <motion.div
            key="intro1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Sutra!</h1>
            <p className="text-xl mb-2">Effortless, fashion-forward modest outfits tailored to your aesthetic.</p>
            <p className="text-xl mb-6">Be the first to stay in the loop!</p>
            <button onClick={next} className="bg-white text-[#540C0C] font-bold px-6 py-2 rounded-md">Start</button>
            <p className="text-sm mt-2">🕒 Takes 45 sec</p>
          </motion.div>
        ) : step === 1 ? (
          <motion.div
            key="intro2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Modest doesn't mean missing out. Sign Up to Stay in the Loop</h2>
            <p className="mb-4 text-lg">Sutra, we bring you pieces that speak your style and your values. We’re building this from the ground up, and your input helps us shape a brand that truly understands your taste, values, and lifestyle.</p>
            <ul className="list-none mb-4 space-y-1">
              <li>✔ Early access to our launch</li>
              <li>✔ Special launch-day discounts</li>
              <li>✔ Behind-the-scenes sneak peeks</li>
              <li>✔ Styling tips for effortless modest looks</li>
            </ul>
            <p className="mb-6">Don’t worry, we won’t spam you with ads.</p>
            <button onClick={next} className="bg-white text-[#540C0C] font-bold px-6 py-2 rounded-md">Continue</button>
          </motion.div>
        ) : step >= 2 && step < questions.length + 2 ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl w-full"
          >
            <QuestionSlide
  step={step - 1}
  data={questions[step - 2]}
  value={answers[step - 2]}
  onChange={handleChange}
  onSubmit={step === questions.length + 1 ? handleSubmit : next}
  isLast={step === questions.length + 1}
  error={error}
  setError={setError}
/>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!submitted && (
         <NavigationButtons prev={prev} next={next} showNext={step < questions.length + 1} />)}
    </div>
  );
}
