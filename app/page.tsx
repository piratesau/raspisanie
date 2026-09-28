import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Расписание занятий',
  description: 'Актуальное расписание занятий на осенний семестр 2026-2027 уч.г.',
};

/* ============ Данные ============ */

const FEATURES = [
  {
    icon: '📅',
    title: 'Актуально всегда',
    text: 'Изменения появляются мгновенно — ты не пропустишь перенос или отмену.',
  },
  {
    icon: '🔔',
    title: 'Уведомления',
    text: 'Напоминания о занятиях и оповещения об изменениях прямо в браузере.',
  },
  {
    icon: '🎯',
    title: 'Фильтры',
    text: 'Смотри только свои группы, кабинеты или преподавателей — без лишнего.',
  },
] as const;

const SAMPLE_LESSONS = [
  { time: '09:00 – 10:30', subject: 'Математика', room: 'каб. 204' },
  { time: '10:45 – 12:15', subject: 'Физика', room: 'каб. 118' },
  { time: '12:45 – 14:15', subject: 'Информатика', room: 'каб. 305' },
] as const;

/* ============ Стили-константы ============ */

const SECTION = 'w-full max-w-5xl px-6';

const BTN_PRIMARY =
  'flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200';

const BTN_SECONDARY =
  'flex h-12 items-center justify-center rounded-full border border-black/[.08] px-8 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-white dark:hover:bg-white/[.06]';

const CARD =
  'rounded-2xl border border-black/[.06] bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/[.08] dark:bg-zinc-950';

/* ============ Мелкие компоненты ============ */

type FeatureProps = {
  icon: string;
  title: string;
  text: string;
};

function FeatureCard({ icon, title, text }: FeatureProps) {
  return (
    <article className={`${CARD} p-6`}>
      <div className="text-2xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-black dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {text}
      </p>
    </article>
  );
}

type LessonRowProps = {
  time: string;
  subject: string;
  room: string;
};

function LessonRow({ time, subject, room }: LessonRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 font-mono text-zinc-500 dark:text-zinc-400">
        {time}
      </td>
      <td className="px-6 py-4 font-medium text-black dark:text-zinc-50">
        {subject}
      </td>
      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{room}</td>
    </tr>
  );
}

/* ============ Секции ============ */

function Hero() {
  return (
    <section
      className={`${SECTION} flex flex-col items-center py-20 text-center`}
    >
      <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
        Расписание · Онлайн
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
        Все занятия в одном месте — без путаницы
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Смотри актуальное расписание, следи за изменениями и получай уведомления
        об отменах. Учителям и студентам — одинаково удобно.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/schedule" className={BTN_PRIMARY}>
          Открыть расписание
        </Link>
        <Link href="/schedule?group=ПИ16д" className={BTN_SECONDARY}>
          Пример группы
        </Link>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={`${SECTION} pb-20`}>
      <div className="grid gap-6 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}

function SchedulePreview() {
  return (
    <section className={`${SECTION} pb-24`}>
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Как это выглядит
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Простой и понятный вид — по дням недели.
      </p>

      <div
        className={`mt-6 overflow-hidden ${CARD}`}
        role="region"
        aria-label="Пример расписания"
      >
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">
                Время
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Предмет
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Аудитория
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
            {SAMPLE_LESSONS.map((row) => (
              <LessonRow key={row.time} {...row} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={`${SECTION} pb-24`}>
      <div className="rounded-3xl bg-black px-8 py-12 text-center dark:bg-white">
        <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-black sm:text-3xl">
          Готов начать?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-300 dark:text-zinc-700">
          Открой расписание, выбери свою группу — и больше не запутаешься в парах.
        </p>
        <Link
          href="/schedule"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
        >
          Перейти к расписанию
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-black/[.06] py-8 text-center text-sm text-zinc-500 dark:border-white/[.08] dark:text-zinc-400">
      © {new Date().getFullYear()} Расписание · Все права защищены
    </footer>
  );
}

/* ============ Страница ============ */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-1 flex-col items-center">
        <Hero />
        <Features />
        <SchedulePreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}