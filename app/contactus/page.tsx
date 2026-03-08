"use client"
import React from 'react';
import ContactUs from '@/components/ContactUs';

/**
 * Contact Us Page
 * Dedicated route for getting in touch. 
 */
export default function ContactPage() {
    return (
        <div className="pt-20">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[150px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px]" />
            </div>

            <div className="relative z-10">
                <ContactUs />
            </div>
        </div>
    );
}
