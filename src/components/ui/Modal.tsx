import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-white w-full max-w-sm border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative animate-in fade-in zoom-in duration-200 font-skranji">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded-full border border-transparent hover:border-black transition-all"
                >
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-6 border-b-2 border-black pb-2 tracking-wide">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};
