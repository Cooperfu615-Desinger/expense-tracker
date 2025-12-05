import React, { useState } from 'react';
import { Banknote, CreditCard, Check } from 'lucide-react';
import { Modal } from '../ui';

interface InputModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: string;
    onSave: (description: string, amount: number, type: 'cash' | 'card') => void;
}

export const InputModal: React.FC<InputModalProps> = ({
    isOpen,
    onClose,
    selectedDate,
    onSave,
}) => {
    const [inputDesc, setInputDesc] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [inputType, setInputType] = useState<'cash' | 'card'>('cash');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputDesc || !inputAmount) return;

        onSave(inputDesc, Number(inputAmount), inputType);

        // Reset form
        setInputDesc('');
        setInputAmount('');
        setInputType('cash');
        onClose();
    };

    const toggleInputType = () => {
        setInputType((prev) => (prev === 'cash' ? 'card' : 'cash'));
    };

    const handleClose = () => {
        // Reset form on close
        setInputDesc('');
        setInputAmount('');
        setInputType('cash');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="NEW ENTRY">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-skranji">
                        DATE
                    </label>
                    <div className="font-bold text-lg border-b-2 border-gray-100 pb-2 font-skranji">
                        {selectedDate}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-skranji">
                        ITEM
                    </label>
                    <input
                        autoFocus
                        type="text"
                        className="w-full text-2xl font-bold border-b-2 border-black/20 focus:border-black outline-none py-2 bg-transparent placeholder:text-gray-200 font-sans"
                        placeholder="e.g. Coffee"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-skranji">
                        AMOUNT
                    </label>
                    <div className="flex items-center gap-2 border-b-2 border-black/20 focus-within:border-black transition-colors">
                        <button
                            type="button"
                            onClick={toggleInputType}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title={inputType === 'cash' ? 'Switch to Credit Card' : 'Switch to Cash'}
                        >
                            {inputType === 'cash' ? <Banknote size={28} /> : <CreditCard size={28} />}
                        </button>
                        <input
                            type="number"
                            className="w-full text-4xl font-bold border-none outline-none py-2 bg-transparent placeholder:text-gray-200 font-skranji"
                            placeholder="0"
                            value={inputAmount}
                            onChange={(e) => setInputAmount(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full bg-black text-white py-4 font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-skranji"
                >
                    <Check size={20} /> SAVE
                </button>
            </form>
        </Modal>
    );
};
