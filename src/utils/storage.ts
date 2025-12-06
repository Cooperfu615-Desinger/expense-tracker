/**
 * Safe localStorage wrapper that handles storage access denied errors
 * This is needed for environments where localStorage is blocked (e.g., some browser privacy settings)
 */
export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('Storage access denied', e);
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('Storage write denied', e);
        }
    },
    removeItem: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Storage remove denied', e);
        }
    },
};
