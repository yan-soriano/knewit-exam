export const EXAM_QUESTIONS = [
  {
    id: 1,
    category: "React 19 & State Loop",
    badge: "FRONTEND CORE",
    question: "Почему данный компонент React уходит в бесконечный цикл повторного рендеринга?",
    codeSnippet: `function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }); // <-- Обратите внимание сюда

  return <div>{users.length} пользователей</div>;
}`,
    options: [
      { id: 'a', text: "Потому что useState не может хранить массивы объектов" },
      { id: 'b', text: "В useEffect отсутствует массив зависимостей [], из-за чего эффект срабатывает после каждого рендера" },
      { id: 'c', text: "fetch() в React разрешено вызывать только внутри обработчиков onClick" },
      { id: 'd', text: "Необходимо обернуть компонент в React.memo" }
    ],
    correctAnswer: 'b',
    explanation: "Если массив зависимостей в useEffect опущен, функция выполняется после каждого рендера. Вызов setUsers обновляет состояние, вызывая новый рендер, что приводит к бесконечному циклу."
  },
  {
    id: 2,
    category: "Modern JavaScript",
    badge: "ASYNC ARCHITECTURE",
    question: "Вам необходимо одновременно загрузить профиль студента и список его курсов. Какой подход выполнит оба запроса параллельно и быстрее всего?",
    codeSnippet: `// Задача: выполнить запросы одновременно
async function loadDashboard(studentId) {
  // Как сделать запросы действительно параллельными?
}`,
    options: [
      { id: 'a', text: "const user = await getUser(id); const courses = await getCourses(id);" },
      { id: 'b', text: "const [user, courses] = await Promise.all([getUser(id), getCourses(id)]);" },
      { id: 'c', text: "Promise.race([getUser(id), getCourses(id)])" },
      { id: 'd', text: "Использовать цикл for..of с await внутри" }
    ],
    correctAnswer: 'b',
    explanation: "Promise.all запускает обе асинхронные операции конкурентно в фоновом режиме, сокращая суммарное время ожидания до продолжительности самого медленного запроса."
  },
  {
    id: 3,
    category: "AI & Vibe Coding",
    badge: "LLM ENGINEERING",
    question: "Как в продакшне гарантировать, что Claude 3.5 или GPT-4o вернет строгий валидный JSON без лишнего сопроводительного текста?",
    codeSnippet: `// Задача: получить JSON { score: number, feedback: string } без "Here is your JSON:"`,
    options: [
      { id: 'a', text: "Написать капслоком в промпте: 'ПОЖАЛУЙСТА, ТОЛЬКО JSON!'" },
      { id: 'b', text: "Использовать Structured Outputs (response_format: json_schema) с валидацией Zod / Pydantic" },
      { id: 'c', text: "Увеличить параметр temperature до 2.0" },
      { id: 'd', text: "Ограничить max_tokens до 10 символов" }
    ],
    correctAnswer: 'b',
    explanation: "Structured Outputs на уровне API провайдеров (OpenAI / Anthropic Tool Calling) форсируют декодер модели следовать синтаксису грамматики JSON-схемы со 100% гарантией структуры."
  },
  {
    id: 4,
    category: "CSS & Responsive UI",
    badge: "DESIGN SYSTEMS",
    question: "Какое CSS Grid свойство позволяет создать адаптивную сетку карточек, которая автоматически перестраивает колонки без единого медиа-запроса (@media)?",
    codeSnippet: `.card-container {
  display: grid;
  /* Какое правило нужно написать? */
}`,
    options: [
      { id: 'a', text: "grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));" },
      { id: 'b', text: "grid-template-columns: 1fr 1fr 1fr;" },
      { id: 'c', text: "flex-direction: column-reverse;" },
      { id: 'd', text: "display: inline-block; width: 33.3%;" }
    ],
    correctAnswer: 'a',
    explanation: "Комбинация repeat(auto-fit, minmax(280px, 1fr)) автоматически вычисляет доступную ширину контейнера и размещает столько колонок по 280px+, сколько помещается, растягивая их на 1fr."
  },
  {
    id: 5,
    category: "Backend & Supabase",
    badge: "SECURITY & DB",
    question: "Зачем в PostgreSQL / Supabase на всех публичных таблицах обязательно активировать Row Level Security (RLS)?",
    codeSnippet: `ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;`,
    options: [
      { id: 'a', text: "Для ускорения SQL запросов через индексацию строк" },
      { id: 'b', text: "Чтобы предотвратить чтение и модификацию чужих записей напрямую с фронтенда по анонимному API-ключу" },
      { id: 'c', text: "RLS требуется только для генерации PDF файлов" },
      { id: 'd', text: "Это встроенный в PostgreSQL механизм сжатия картинок" }
    ],
    correctAnswer: 'b',
    explanation: "Так как Supabase позволяет фронтенду делать запросы к БД напрямую через клиентскую библиотеку, RLS на уровне ядра PostgreSQL гарантирует, что пользователь видит только разрешенные политикой строки."
  }
];

export const PLAYGROUND_CHALLENGE = {
  title: "Интерактивная отладка: Почините реактивный трекер студента",
  instructions: "В компоненте `UserActivitySync` обнаружен критический баг. Команда обнаружила, что вкладка браузера зависает, а сервер получает сотни запросов в секунду. Выберите правильную строку исправления и нажмите 'Запустить тесты' в изолированной песочнице.",
  buggyCodeSnippet: [
    "import React, { useState, useEffect } from 'react';",
    "",
    "export function UserActivitySync({ userId }) {",
    "  const [activity, setActivity] = useState(null);",
    "  const [syncCount, setSyncCount] = useState(0);",
    "",
    "  useEffect(() => {",
    "    // Запрос активности студента в кампусе Алматы",
    "    api.fetchStudentActivity(userId).then(data => {",
    "      setActivity(data);",
    "      setSyncCount(prev => prev + 1);",
    "    });",
    "  }, [activity]); // 💥 СТРОКА 13: БАГ РЕКУРСИИ ЗДЕСЬ!",
    "",
    "  return <div>Синхронизаций: {syncCount}</div>;",
    "}"
  ],
  options: [
    {
      id: 'fix_1',
      label: "}, [userId]);",
      snippet: "}, [userId]);",
      desc: "✅ Правильно: эффект перезапускается только когда меняется ID студента, предотвращая цикл рендеринга.",
      isCorrect: true
    },
    {
      id: 'fix_2',
      label: "}, []);",
      snippet: "}, []);",
      desc: "❌ Неполноценно: цикл пропадет, но компонент перестанет обновляться при смене студента.",
      isCorrect: false
    },
    {
      id: 'fix_3',
      label: "}, [activity, userId]);",
      snippet: "}, [activity, userId]);",
      desc: "❌ Ошибка: наличие activity в зависимостях сохраняет вечный цикл рендеринга.",
      isCorrect: false
    },
    {
      id: 'fix_4',
      label: "});",
      snippet: "});",
      desc: "❌ Ошибка: удаление массива зависимостей запускает эффект на каждый тик рендера.",
      isCorrect: false
    }
  ]
};
