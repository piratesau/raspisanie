import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center">
        {/* Hero */}
        <section className="w-full max-w-5xl px-6 py-20 flex flex-col items-center text-center">
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
            <Link
              href="/schedule"
              className="flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Открыть расписание
            </Link>
            <Link
              href="/dashboard"
              className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-8 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-white dark:hover:bg-white/[.06]"
            >
              Личный кабинет
            </Link>
          </div>
        </section>

        {/* Преимущества */}
        <section className="w-full max-w-5xl px-6 pb-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "📅",
                title: "Актуально всегда",
                text: "Изменения появляются мгновенно — ты не пропустишь перенос или отмену.",
              },
              {
                icon: "🔔",
                title: "Уведомления",
                text: "Напоминания о занятиях и оповещения об изменениях прямо в браузере.",
              },
              {
                icon: "🎯",
                title: "Фильтры",
                text: "Смотри только свои группы, кабинеты или преподавателей — без лишнего.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-black/[.06] bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/[.08] dark:bg-zinc-950"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-black dark:text-zinc-50">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Пример расписания */}
        <section className="w-full max-w-5xl px-6 pb-24">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Как это выглядит
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Простой и понятный вид — по дням недели.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/[.06] bg-white dark:border-white/[.08] dark:bg-zinc-950">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">Время</th>
                  <th className="px-6 py-3 font-semibold">Предмет</th>
                  <th className="px-6 py-3 font-semibold">Аудитория</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
                {[
                  { time: "09:00 – 10:30", subject: "Математика", room: "каб. 204" },
                  { time: "10:45 – 12:15", subject: "Физика", room: "каб. 118" },
                  { time: "12:45 – 14:15", subject: "Информатика", room: "каб. 305" },
                ].map((row) => (
                  <tr key={row.time}>
                    <td className="px-6 py-4 font-mono text-zinc-500 dark:text-zinc-400">
                      {row.time}
                    </td>
                    <td className="px-6 py-4 font-medium text-black dark:text-zinc-50">
                      {row.subject}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {row.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-5xl px-6 pb-24">
          <div className="rounded-3xl bg-black px-8 py-12 text-center dark:bg-white">
            <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-black sm:text-3xl">
              Готов начать?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-300 dark:text-zinc-700">
              Зайди в личный кабинет, чтобы настроить уведомления и выбрать свою группу.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
            >
              Перейти в кабинет
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-black/[.06] py-8 text-center text-sm text-zinc-500 dark:border-white/[.08] dark:text-zinc-400">
          © {new Date().getFullYear()} Расписание · Все права защищены
        </footer>
      </main>
    </div>
  );
}