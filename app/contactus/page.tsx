"use client"
import React from 'react';
import ContactUs from '@/components/ContactUs';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Contact Us Page
 * Dedicated route for getting in touch. 
 */
export default function ContactPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 350);
        return () => clearTimeout(timer);
    }, []);

    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#03060D] pt-20 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6 pt-0 md:pt-4">
                <div className="mb-10">
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group cursor-pointer">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>

                <div className={`relative z-10 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    <ContactUs standalone={true} />
                </div>
            </div>
        </div>
    );
}
