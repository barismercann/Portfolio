"use client";

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const TypewriterCode = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const texts = useMemo(() => [
        'const developer = "Senior";',
        'const developer = "Elite";',
        'const developer = "Expert";'
    ], []);

    useEffect(() => {
        const currentText = texts[currentTextIndex];
        const speed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
        if (!isDeleting) {
            if (currentIndex < currentText.length) {
            setDisplayText(currentText.substring(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
            } else {
            // Wait before deleting
            setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (currentIndex > 0) {
            setDisplayText(currentText.substring(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
            } else {
            setIsDeleting(false);
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }
        }
        }, speed);

        return () => clearTimeout(timer);
    }, [currentIndex, isDeleting, currentTextIndex, texts]);

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="bg-slate-800 px-4 py-6 rounded-lg shadow-2xl border border-slate-600 min-w-[280px] max-w-sm"
        >
        {/* Code Editor Header */}
        <div className="flex items-center mb-4 pb-2 border-b border-slate-600">
            <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-slate-400 text-xs font-mono">main.js</div>
        </div>

        {/* Comment Line */}
        <div className="text-slate-400 mb-2 text-sm font-mono">
            {`// Expertise in action`}
        </div>

        {/* Typewriter Code */}
        <div className="font-mono text-sm">
            {/* const keyword */}
            {displayText.length > 0 && (
            <span className="text-blue-400">
                {displayText.slice(0, Math.min(displayText.length, 5))}
            </span>
            )}
            
            {/* space after const */}
            {displayText.length > 5 && (
            <span className="text-white">
                {displayText.slice(5, Math.min(displayText.length, 6))}
            </span>
            )}
            
            {/* developer keyword */}
            {displayText.length > 6 && (
            <span className="text-green-400">
                {displayText.slice(6, Math.min(displayText.length, 15))}
            </span>
            )}
            
            {/* space and = */}
            {displayText.length > 15 && (
            <span className="text-white">
                {displayText.slice(15, Math.min(displayText.length, 18))}
            </span>
            )}
            
            {/* quoted string */}
            {displayText.length > 18 && (
            <span className="text-yellow-400">
                {displayText.slice(18, displayText.length - (displayText.endsWith(';') ? 1 : 0))}
            </span>
            )}
            
            {/* semicolon */}
            {displayText.endsWith(';') && (
            <span className="text-white">;</span>
            )}
            
            <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-white ml-1"
            >
            |
            </motion.span>
        </div>
        </motion.div>
    );
};

export default TypewriterCode;