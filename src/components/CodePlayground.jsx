import React, { useState } from 'react';
import { PLAYGROUND_CHALLENGE } from '../data/examData';
import { 
  Play, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Check, 
  Bug,
  Cpu
} from 'lucide-react';

export function CodePlayground({ onChallengeComplete, isCompleted, challengeScore = 0 }) {
  const [selectedFixId, setSelectedFixId] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([]);

  const handleRunTests = () => {
    if (!selectedFixId) return;

    setIsRunningTests(true);
    setTestResults(null);
    setTerminalLogs([
      "▶ Initializing KnewIT Test Harness v2.6.1 (Almaty Campus Engine)...",
      "▶ Compiling React 19 synthetic environment...",
      "▶ Testing memory profiling & cycle detection..."
    ]);

    const chosenOption = PLAYGROUND_CHALLENGE.options.find(o => o.id === selectedFixId);
    const isCorrect = chosenOption?.isCorrect;

    setTimeout(() => {
      if (isCorrect) {
        setTerminalLogs(prev => [
          ...prev,
          "✔ TEST 1: [PASS] Prevents re-render loop when state updates (0.4ms)",
          "✔ TEST 2: [PASS] Correctly re-fetches when userId changes from 'ALM-1029' to 'ALM-2045'",
          "✔ TEST 3: [PASS] Component unmounts cleanly without memory leak",
          "🎉 ALL 3 TESTS PASSED! +25 баллов начислено в аттестат."
        ]);
        setTestResults({ passed: true, score: 25 });
        onChallengeComplete(25, true);
      } else {
        setTerminalLogs(prev => [
          ...prev,
          "❌ TEST 1: [FAIL] Infinite recursion detected: setActivity calls re-render",
          "❌ TEST 2: [FAIL] Component crashed due to Maximum Update Depth Exceeded",
          "⚠️ Тесты не пройдены. Выберите другое исправление строки."
        ]);
        setTestResults({ passed: false, score: 0 });
        onChallengeComplete(0, false);
      }
      setIsRunningTests(false);
    }, 700);
  };

  const handleReset = () => {
    setSelectedFixId(null);
    setTestResults(null);
    setTerminalLogs([]);
    onChallengeComplete(0, false);
  };

  return (
    <div className="bento-card rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
      {/* Challenge Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              ПРАКТИЧЕСКИЙ БЛОК (25 БАЛЛОВ)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {PLAYGROUND_CHALLENGE.title}
            </h3>
          </div>
        </div>

        {testResults?.passed && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            +25 БАЛЛОВ НАЧИСЛЕНО
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        {PLAYGROUND_CHALLENGE.instructions}
      </p>

      {/* Code Editor Container */}
      <div className="rounded-2xl bg-[#070B14] border border-slate-800 overflow-hidden font-mono text-xs mb-6">
        <div className="bg-[#0F172A] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-slate-300 font-medium ml-1">UserActivitySync.jsx</span>
          </span>
          <span className="text-rose-400 text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Runtime Infinite Loop on Line 13
          </span>
        </div>

        <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed">
          <div className="text-slate-600">1  import React, {'{'} useState, useEffect {'}'} from 'react';</div>
          <div className="text-slate-600">2  </div>
          <div className="text-slate-300">3  export function UserActivitySync({'{'} userId {'}'}) {'{'}</div>
          <div className="text-slate-300">4    const [activity, setActivity] = useState(null);</div>
          <div className="text-slate-300">5    const [syncCount, setSyncCount] = useState(0);</div>
          <div className="text-slate-600">6  </div>
          <div className="text-slate-300">7    useEffect(() =&gt; {'{'}</div>
          <div className="text-slate-400">8      // Запрос активности студента в кампусе Алматы</div>
          <div className="text-slate-300">9      api.fetchStudentActivity(userId).then(data =&gt; {'{'}</div>
          <div className="text-slate-300">10       setActivity(data);</div>
          <div className="text-slate-300">11       setSyncCount(prev =&gt; prev + 1);</div>
          <div className="text-slate-300">12     {'}'});</div>
          <div className="bg-rose-950/40 border border-rose-500/40 rounded px-2 py-1 my-1 text-rose-300 flex items-center justify-between">
            <span>
              13   <span className="font-bold underline">{selectedFixId ? PLAYGROUND_CHALLENGE.options.find(o => o.id === selectedFixId)?.snippet : "}, [activity]);"}</span>
            </span>
            <span className="text-[10px] text-rose-400 font-sans uppercase font-bold">
              {selectedFixId ? "Ваше исправление" : "Критический баг"}
            </span>
          </div>
          <div className="text-slate-300">14 </div>
          <div className="text-slate-300">15   return &lt;div&gt;Синхронизаций: {'{'}syncCount{'}'}&lt;/div&gt;;</div>
          <div className="text-slate-300">16 {'}'}</div>
        </div>
      </div>

      {/* Options */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
          Выберите правильную строку для замены строки 13:
        </h4>

        <div className="grid sm:grid-cols-2 gap-3">
          {PLAYGROUND_CHALLENGE.options.map((opt) => {
            const isSelected = selectedFixId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFixId(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 text-white ring-1 ring-cyan-400 shadow-glow-cyan'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <code className="px-2 py-0.5 rounded bg-black text-cyan-400 font-bold font-mono text-xs border border-slate-800">
                    {opt.label}
                  </code>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={handleRunTests}
          disabled={!selectedFixId || isRunningTests}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-cyan transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunningTests ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Запуск изолированных тестов...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Запустить тесты (Run Tests)</span>
            </>
          )}
        </button>

        {selectedFixId && (
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить выбор</span>
          </button>
        )}
      </div>

      {/* Terminal Output Stream */}
      {terminalLogs.length > 0 && (
        <div className="bg-[#050811] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 animate-fade-in">
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>KnewIT Automated Test Runner Console</span>
          </div>
          <div className="space-y-1">
            {terminalLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('PASS') || log.includes('🎉')
                    ? 'text-emerald-400'
                    : log.includes('FAIL')
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
