"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import ZrpButton from '@/components/ui/ZrpButton'; 
import { Search, History, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  return (
    // We only need the <main> tag, the layout handles the rest
    <main className="flex-grow p-6 flex flex-col items-center justify-start gap-6 max-w-md mx-auto w-full mt-8">

        {/* Primary Action: Search Vehicle */}
        <ZrpButton
            variant="dashboardPrimary"
            text="SEARCH VEHICLE IN DATABASE"
            icon={<Search size={56} strokeWidth={2.5}/>}
            onClick={() => router.push('/lookup')}
        />

        {/* Secondary Actions: History & Settings*/}
        <div className="grid grid-cols-2 gap-6 w-full mt-4">
            <ZrpButton
                variant="dashboardSecondary"
                text="MY HISTORY"
                icon={<History size={32} strokeWidth={2.5} />}
                onClick={() => router.push('/history')}
            />
            <ZrpButton
                variant="dashboardSecondary"
                text="SETTINGS"
                icon={<Settings size={32} strokeWidth={2.5} />}
                onClick={() => router.push('/settings')}
            />
        </div>
    </main>
  );
}