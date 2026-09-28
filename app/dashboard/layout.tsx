'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [text, setText] = useState('');
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('dashboardText');
            if (saved) setText(saved);
        } catch (_) { /* ignore */ }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            try {
                localStorage.setItem('dashboardText', text);
            } catch (_) { /* ignore */ }
        }, 300);

        return () => clearTimeout(timerRef.current);
    }, [text, isLoaded]);

    return (
        <div className="flex flex-row min-h-[calc(100vh-2rem)] border-4 border-blue-500 rounded-xl m-4 overflow-hidden">
            <aside className="w-64 bg-blue-50 p-6 border-r border-blue-100 flex flex-col flex-shrink-0">
                <div className="mb-8 text-xs font-bold text-blue-500 uppercase tracking-wider font-sans">
                    dashboard
                </div>
                <nav className="flex flex-col gap-4" aria-label="Dashboard navigation">
                    <span className="font-bold text-sm text-zinc-400">Navigation</span>

                    <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>

                    <Link href="/dashboard/settings" className="hover:text-blue-600 transition-colors">
                        Settings
                    </Link>

                   <Link
    href="/"
    className="text-left hover:text-red-600 transition-colors"
>
    ← Выйти на главную
</Link>
                </nav>
                <div className="mt-auto pt-6 border-t border-blue-200">
                    <label htmlFor="stateInput" className="block text-[10px] font-bold text-blue-400 uppercase mb-2">
                        State
                    </label>
                    <input
                        id="stateInput"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text save"
                        className="bg-white w-full p-2 text-sm border border-blue-200 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {text && (
                        <div className="mt-2 text-xs text-green-600">
                            ✅ Сохранено
                        </div>
                    )}
                </div>
            </aside>
            <main className="flex-1 flex flex-col bg-white p-8">
                {children}
            </main>
        </div>
    );
}