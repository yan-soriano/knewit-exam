import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Award, 
  Download,
  AlertCircle,
  FileCode2,
  ChevronRight,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

const BUGGY_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 1; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const FIXED_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export default function App() {
  const [code, setCode] = useState(BUGGY_CODE);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState(null);
  const [studentName, setStudentName] = useState('Арман Асанов');

  const handleTestRun = () => {
    setIsEvaluating(true);
    setResult(null);
    
    setTimeout(() => {
      setIsEvaluating(false);
      // Simple validation for demonstration
      if (code.replace(/\s+/g, '') === FIXED_CODE.replace(/\s+/g, '')) {
        setResult({ success: true, score: 100, message: 'Все тесты пройдены! Ошибка "Off-by-one" исправлена.' });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setResult({ success: false, score: 0, message: 'Тест 1 (items=[{price:10}]) упал: Cannot read properties of undefined (reading "price")' });
      }
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header (No print) */}
      <header className="no-print sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-glow-cyan">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                Knew<span className="text-cyan-400">IT</span> Exam
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold">
                Студенческий кабинет
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Казахстан, Алматы • ул. Манаса 34/1
            </p>
          </div>
        </div>
      </header>

      {/* Main Layout (No print) */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Code Playground */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bento-card rounded-2xl flex flex-col overflow-hidden h-[500px]">
            {/* Editor Header */}
            <div className="bg-slate-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300">calculateTotal.js</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCode(BUGGY_CODE)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Сброс
                </button>
                <button 
                  onClick={handleTestRun}
                  disabled={isEvaluating}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-glow-cyan flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" /> {isEvaluating ? 'Запуск...' : 'Проверить'}
                </button>
              </div>
            </div>
            {/* Editor Body */}
            <div className="flex-1 bg-[#070B14] p-4 relative font-mono text-sm">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-slate-200 outline-none resize-none leading-relaxed"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Test Results Output */}
          <div className="bento-card rounded-2xl p-4 min-h-[120px]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">
              <Terminal className="w-4 h-4" /> Console Output
            </div>
            
            {isEvaluating ? (
              <div className="text-cyan-400 text-sm font-mono animate-pulse flex flex-col gap-1">
                <span>&gt; Running test suite...</span>
                <span>&gt; Compiling bundle...</span>
              </div>
            ) : result ? (
              <div className={`flex items-start gap-3 p-3 rounded-xl border ${result.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-bold ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.success ? 'Тесты пройдены 성공' : 'Ошибка выполнения 실패'}
                  </h4>
                  <p className="text-slate-300 text-sm mt-1 font-mono">{result.message}</p>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-sm font-mono">
                &gt; Ожидание запуска...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Instructions & Certificate */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bento-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Задача 01: Корзина покупок</h3>
            <p className="text-sm text-slate-400 mb-4">
              Найдите и исправьте логическую ошибку в функции <code className="text-cyan-400 bg-cyan-950 px-1 rounded">calculateTotal</code>, которая приводит к падению программы при перечислении товаров.
            </p>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Функция должна возвращать сумму цен всех объектов.</span>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Массив может быть пустым.</span>
              </div>
            </div>
          </div>

          {result?.success && (
            <div className="bento-card-active rounded-2xl p-6 animate-fade-in text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white mb-4 shadow-glow-mint">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Модуль сдан!</h3>
              <p className="text-sm text-slate-400 mb-6">Ваш сертификат сформирован и готов к загрузке.</p>
              
              <button 
                onClick={handlePrint}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-glow-cyan transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Распечатать сертификат
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Printable Certificate (Hidden on screen, visible on print) */}
      {result?.success && (
        <div id="certificate-printable" className="hidden print:block relative bg-white w-[297mm] h-[210mm] text-slate-900 mx-auto overflow-hidden">
          {/* Certificate Border & Background */}
          <div className="absolute inset-8 border-4 border-slate-900 p-2">
            <div className="absolute inset-0 border-2 border-slate-900 m-1"></div>
            <div className="h-full w-full flex flex-col items-center justify-center text-center px-20">
              
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center text-xl font-bold rounded-lg">
                  &lt;/&gt;
                </div>
                <h1 className="text-4xl font-black tracking-tighter">Knew<span className="text-cyan-600">IT</span></h1>
              </div>

              <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-4">
                Сертификат об окончании
              </h2>
              
              <p className="text-lg text-slate-600 mb-6">Настоящим подтверждается, что</p>
              
              <h3 className="text-6xl font-black text-slate-900 mb-6 border-b-2 border-slate-300 pb-2 inline-block px-10">
                {studentName}
              </h3>
              
              <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-16 leading-relaxed">
                успешно завершил(а) обучение по программе <strong>«AI & Vibe Coding Bootcamp 2026»</strong>, сдал(а) финальный экзамен и готов(а) к созданию production-ready стартапов.
              </p>

              <div className="w-full flex justify-between items-end px-12">
                <div className="text-left">
                  <div className="text-sm font-bold mb-1">ID: KNW-2026-ALM-{Math.floor(Math.random() * 9000 + 1000)}</div>
                  <div className="text-sm text-slate-500">Алматы, Казахстан</div>
                  <div className="text-sm text-slate-500">Дата: {new Date().toLocaleDateString('ru-RU')}</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center opacity-80 rotate-12 mb-2">
                    <span className="text-red-500 font-bold text-xl uppercase tracking-widest border-y-2 border-red-500 px-2 py-1 rotate-[-15deg]">
                      VERIFIED
                    </span>
                  </div>
                  <div className="border-t-2 border-slate-900 w-48 text-center pt-2 font-bold mt-4">
                    Подпись CEO
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
