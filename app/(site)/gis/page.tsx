import React from 'react';
import Infrastructure from '@/components/Infrastructure';
import FAQSection from '@/components/FAQSection';

export default function GISPage() {
    return (
        <div className="relative z-10 pt-20 pb-20 min-h-screen">
            <Infrastructure />
            <FAQSection type="gis" showHeader={false} />
        </div>
    );
}
