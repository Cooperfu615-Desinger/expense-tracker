import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../ui';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClearAll: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    onClearAll,
}) => {
    const handleClearAll = async () => {
        if (confirm('Are you sure you want to erase all data? This action cannot be undone.')) {
            await onClearAll();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="SETTINGS">
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 font-sans">
                    <p>
                        This is a minimalist paper-style expense tracker. Click anywhere on the blank
                        space to start writing.
                    </p>
                </div>
                <button
                    onClick={handleClearAll}
                    className="w-full py-3 border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2 font-skranji"
                >
                    <Trash2 size={18} /> ERASE ALL DATA
                </button>
                <div className="text-center text-xs text-gray-300 mt-8 font-skranji">
                    Version 2.0 (Paper Edition)
                </div>
            </div>
        </Modal>
    );
};
