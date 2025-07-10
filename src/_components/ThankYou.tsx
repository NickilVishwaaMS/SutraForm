import { motion } from 'framer-motion';
export default function ThankYou() {
  return (
    <motion.div key="thankyou"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold">Thank you!</h1>
      <p className="mt-4 text-xl">Your response has been submitted.</p>
    </motion.div>
  );
}
