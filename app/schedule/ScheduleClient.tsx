'use client';

import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import {
  SCHEDULE,
  GROUPS,
  DAYS,
  type Group,
  type Lesson,
} from '../../data/schedule';

/* ============ Утилиты ============ */

function parseSlot(slot: string) {
  const [a, b] = slot.split('-');
  const toMin = (t: string) => {
    const [h, m] = t.split('.').map(Number);
    return h * 60 + m;
  };
  return { start: toMin(a), end: toMin(b) };
}

function todayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

function subjectColor(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
  return `hsl(${Math.abs(hash) % 360} 70% 45%)`;
}

function isGroup(v: string | null): v is Group {
  return !!v && (GROUPS as readonly string[]).includes(v);
}

/* ============ Хук текущего времени ============ */

function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/* ============ Поиск следующей пары ============ */

type NextLesson = { day: string; time: string; lesson: Lesson; inMinutes: number };

function findNextLesson(
  schedule: Record<string, Record<string, Lesson[]>>,
  now: Date,
): NextLesson | null {
  const idx = todayIndex(now);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset < 7; offset++) {
    const day = DAYS[idx + offset] ?? DAYS[(idx + offset) % 7];
    const dayData = schedule[day];
    if (!dayData) continue;

    const entries = (Object.entries(dayData) as [string, Lesson[]][]).sort(
      (a, b) => parseSlot(a[0]).start - parseSlot(b[0]).start,
    );

    for (const [time, lessons] of entries) {
      const { start } = parseSlot(time);
      if (offset === 0 && start + 85 < nowMin) continue;
      return {
        day,
        time,
        lesson: lessons[0],
        inMinutes: offset === 0 ? start - nowMin : 24 * 60 - nowMin + start,
      };
    }
  }
  return null;
}

/* ============ Статус занятия ============ */

type Status = 'past' | 'current' | 'future';

function lessonStatus(time: string, now: Date | null): Status {
  if (!now) return 'future';
  const { start, end } = parseSlot(time);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (nowMin > end) return 'past';
  if (nowMin >= start) return 'current';
  return 'future';
}

/* ============ Виджет «Следующая пара» ============ */

const NextLessonBanner = memo(function NextLessonBanner({
  next,
}: {
  next: NextLesson;
}) {
  const { day, time, lesson, inMinutes } = next;
  const h = Math.floor(inMinutes / 60);
  const m = inMinutes % 60;
  const inText = h > 0 ? `через ${h} ч ${m} мин` : `через ${m} мин`;

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
        Следующая пара · {day} · {time} · {inText}
      </div>
      <div className="text-lg font-semibold">{lesson.subject}</div>
      <div className="text-sm opacity-90 mt-1 flex flex-wrap gap-x-4">
        {lesson.teacher && <span>👤 {lesson.teacher}</span>}
        {lesson.room && <span>🚪 {lesson.room}</span>}
      </div>
    </div>
  );
});

/* ============ Карточка занятия ============ */

const KIND_STYLES: Record<string, string> = {
  'Лек.': 'bg-blue-50',
  'Пр.': 'bg-green-50',
  'Л.р.': 'bg-amber-50',
};

const LessonCard = memo(function LessonCard({
  lesson,
  time,
  now,
}: {
  lesson: Lesson;
  time: string;
  now: Date | null;
}) {
  const status = lessonStatus(time, now);
  const accent = subjectColor(lesson.subject);

  const stateClass =
    status === 'past'
      ? 'opacity-40 grayscale'
      : status === 'current'
      ? 'ring-2 ring-blue-500 shadow-md'
      : '';

  return (
    <div
      className={`relative rounded-lg border border-gray-200 pl-4 pr-3 py-3 transition-all ${stateClass} ${
        KIND_STYLES[lesson.kind] ?? 'bg-gray-50'
      }`}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
        style={{ backgroundColor: accent }}
      />

      {status === 'current' && (
        <span className="absolute top-2 right-2 flex items-center gap-1 text-xs font-semibold text-blue-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
          </span>
          идёт
        </span>
      )}

      <div className="flex flex-wrap items-baseline gap-2">
        {lesson.kind && (
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            {lesson.kind}
          </span>
        )}
        <span className="font-medium text-gray-900">{lesson.subject}</span>
        {lesson.note && (
          <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full text-gray-700">
            {lesson.note}
          </span>
        )}
      </div>
      <div className="mt-1 text-sm text-gray-700 flex flex-wrap gap-x-4 gap-y-1">
        {lesson.teacher && <span>👤 {lesson.teacher}</span>}
        {lesson.room && <span>🚪 {lesson.room}</span>}
      </div>
    </div>
  );
});

/* ============ Блок дня ============ */

const DayBlock = memo(function DayBlock({
  day,
  entries,
  isToday,
  now,
}: {
  day: string;
  entries: [string, Lesson[]][];
  isToday: boolean;
  now: Date | null;
}) {
  return (
    <section
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-colors ${
        isToday ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
    >
      <header
        className={`px-6 py-3 border-b flex items-center justify-between ${
          isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-200'
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800">{day}</h2>
        {isToday && (
          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
            Сегодня
          </span>
        )}
      </header>

      {entries.length === 0 ? (
        <p className="px-6 py-4 text-gray-400 text-sm italic">Нет занятий</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {entries.map(([time, lessons]) => (
            <div
              key={time}
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="sm:w-32 flex-shrink-0 text-sm font-mono text-gray-500 pt-1">
                {time}
              </div>
              <div className="flex-1 space-y-2">
                {lessons.map((lesson, i) => (
                  <LessonCard
                    key={`${lesson.subject}-${i}`}
                    lesson={lesson}
                    time={time}
                    now={now}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

/* ============ Переключатель групп ============ */

const GroupTabs = memo(function GroupTabs({
  selected,
  onSelect,
}: {
  selected: Group;
  onSelect: (g: Group) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {GROUPS.map((g) => {
        const active = selected === g;
        return (
          <button
            key={g}
            onClick={() => onSelect(g)}
            aria-pressed={active}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
});

/* ============ Главный компонент ============ */

export default function ScheduleClient() {
  const now = useNow();

  // Начальная группа: URL → localStorage → первая из списка
  const [selectedGroup, setSelectedGroup] = useState<Group>(() => {
    if (typeof window === 'undefined') return GROUPS[0];
    const fromUrl = new URLSearchParams(window.location.search).get('group');
    if (isGroup(fromUrl)) return fromUrl;
    const saved = localStorage.getItem('lastGroup');
    if (isGroup(saved)) return saved;
    return GROUPS[0];
  });

  // Синхронизация с URL/localStorage после монтирования
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fromUrl = new URLSearchParams(window.location.search).get('group');
    if (isGroup(fromUrl)) {
      setSelectedGroup(fromUrl);
      return;
    }
    const saved = localStorage.getItem('lastGroup');
    if (isGroup(saved)) setSelectedGroup(saved);
  }, []);

  const handleSelect = useCallback((g: Group) => {
    setSelectedGroup(g);
    if (typeof window === 'undefined') return;

    localStorage.setItem('lastGroup', g);

    // Обновляем URL нативно — БЕЗ next/navigation, чтобы не дёргать RSC
    const params = new URLSearchParams(window.location.search);
    params.set('group', g);
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, []);

  const days = useMemo(() => {
    const raw = SCHEDULE[selectedGroup] ?? {};
    return DAYS.map((day) => ({
      day,
      entries: (Object.entries(raw[day] ?? {}) as [string, Lesson[]][]).sort(
        (a, b) => parseSlot(a[0]).start - parseSlot(b[0]).start,
      ),
    }));
  }, [selectedGroup]);

  const nextLesson = useMemo(() => {
    if (!now) return null;
    return findNextLesson(SCHEDULE[selectedGroup] ?? {}, now);
  }, [selectedGroup, now]);

  const todayIdx = now ? todayIndex(now) : -1;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Расписание занятий
        </h1>
        <p className="text-gray-600 mb-6">
          Осенний семестр 2026-2027 уч.г. · Группы 16д
        </p>

        <GroupTabs selected={selectedGroup} onSelect={handleSelect} />

        {nextLesson && <NextLessonBanner next={nextLesson} />}

        <div className="space-y-8">
          {days.map(({ day, entries }, i) => (
            <DayBlock
              key={day}
              day={day}
              entries={entries}
              isToday={i === todayIdx}
              now={now}
            />
          ))}
        </div>
      </div>
    </main>
  );
}