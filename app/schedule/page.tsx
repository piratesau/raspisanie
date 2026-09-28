import { Suspense } from 'react';
import ScheduleClient from './ScheduleClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Загрузка…</div>}>
      <ScheduleClient />
    </Suspense>
  );
}