import { motion } from "framer-motion";

export default function TopicInput({ topic, setTopic }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2"
    >
      <label className="block text-sm font-medium mb-1">
        Target Problem or Real-world Scenario (Optional):
      </label>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Difficulty in monitoring crop health for farmers, Slow queuing system in barangay..."
        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 bg-white text-base sm:text-sm cursor-pointer text-gray-700 truncate"
      />
    </motion.div>
  );
}