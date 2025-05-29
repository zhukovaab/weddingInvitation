import { motion } from "framer-motion";

export  function Checkbox({ id, label, checked, onChange, value }) {
  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        className="sr-only peer"
      />
      <motion.div
        className="h-5 w-5 border-2 border-green-500 rounded flex items-center justify-center
                   peer-focus:ring-2 peer-focus:ring-green-300 peer-focus:ring-offset-1
                   transition-colors duration-200"
        initial={{ backgroundColor: "rgba(34,197,94,0)" }} // green-500 transparent
        animate={{ backgroundColor: checked ? "rgba(34,197,94,1)" : "rgba(34,197,94,0)" }}
        transition={{ duration: 0.2 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="3"
          viewBox="0 0 24 24"
          className="w-3 h-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>
      <span className="ml-2 text-gray-700 select-text">{label}</span>
    </label>
  );
}
