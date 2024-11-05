"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  message: string;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="fixed bottom-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg
                     w-[100%] max-w-sm sm:max-w-none sm:w-auto sm:left-auto sm:bottom-5 sm:right-5 sm:translate-x-0"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
