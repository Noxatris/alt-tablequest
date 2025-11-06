"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // J'utilise Framer Motion pour la transition, en cohérence avec votre stack.

// Clé utilisée pour stocker l'état dans le navigateur
const STORAGE_KEY = "disclaimer_accepted";

type DisclaimerModalProps = {
    title: string;
    message: string;
    buttonText: string;
    // Optionnel: classes pour thématiser le modal (ex: couleur, police)
    className?: string;
};

export default function DisclaimerModal({
    title,
    message,
    buttonText,
    className = "",
}: DisclaimerModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. Vérifie si l'utilisateur a déjà cliqué sur "Je comprends"
        const accepted = localStorage.getItem(STORAGE_KEY);
        
        // 2. Si non accepté, affiche le modal
        if (!accepted) {
            // Utilise un petit délai pour s'assurer que le reste de la page commence à charger
            // avant que le modal n'apparaisse (effet plus propre)
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        // Enregistre le choix de l'utilisateur
        localStorage.setItem(STORAGE_KEY, "true");
        // Ferme le modal
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        // Utilise la prop className pour un style customisé (votre thème)
                        className={`max-w-md w-full p-8 rounded-lg shadow-2xl border border-gray-700 text-white font-[cinzel] ${className}`}
                    >
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2 text-[#d8b661]">
                            {title}
                        </h2>
                        
                        <p className="mb-6 text-gray-300">
                            {message}
                        </p>
                        
                        <button
                            onClick={handleAccept}
                            className="w-full py-3 bg-[#d8b661] text-black font-bold uppercase rounded-md transition-colors hover:bg-yellow-700"
                        >
                            {buttonText}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}