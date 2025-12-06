import { useState, useMemo } from 'react';
import {
  PaperBackground,
  CornerControls,
  DateHeader,
  ExpenseList,
  CalendarModal,
  InputModal,
  StatsModal,
  SettingsModal,
} from './components';
import { useExpenses, useCalendar } from './hooks';
import { getTodayString } from './utils';
import type { StatsView } from './types/expense';

function App() {
  // Selected date state
  const [selectedDate, setSelectedDate] = useState(() => getTodayString());

  // Modal states
  const [showCalendar, setShowCalendar] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Stats view state
  const [statsView, setStatsView] = useState<StatsView>('daily');

  // Custom hooks
  const {
    expenses,
    loading: _loading,
    addExpense,
    deleteExpense,
    clearAllExpenses,
    getDailyExpenses,
    getDailyTotal,
    getStatsData,
  } = useExpenses();

  const {
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    navigatePrevMonth,
    navigateNextMonth,
    setCurrentDate,
  } = useCalendar(new Date(selectedDate));

  // Derived data
  const dailyExpenses = useMemo(() => getDailyExpenses(selectedDate), [getDailyExpenses, selectedDate]);
  const dailyTotal = useMemo(() => getDailyTotal(selectedDate), [getDailyTotal, selectedDate]);
  const statsData = useMemo(() => getStatsData(selectedDate, statsView), [getStatsData, selectedDate, statsView]);

  // Handlers
  const handleBackgroundClick = () => {
    if (!showCalendar && !showStats && !showSettings) {
      setShowInput(true);
    }
  };

  const handleSaveExpense = async (description: string, amount: number, type: 'cash' | 'card') => {
    await addExpense({
      date: selectedDate,
      description,
      amount,
      type,
    });
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this entry?')) {
      await deleteExpense(id);
    }
  };

  const handleDayClick = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const handleOpenCalendar = () => {
    setCurrentDate(new Date(selectedDate));
    setShowCalendar(true);
  };

  const handleOpenStats = () => {
    setStatsView('daily');
    setShowStats(true);
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col font-skranji bg-gray-100 selection:bg-black selection:text-white">
      {/* Container simulating a desk or device frame */}
      <div className="relative w-full h-full max-w-md mx-auto shadow-2xl overflow-hidden bg-white">
        {/* Corner UI Controls */}
        <CornerControls
          onHomeClick={() => setSelectedDate(getTodayString())}
          onSettingsClick={() => setShowSettings(true)}
          onCalendarClick={handleOpenCalendar}
          onStatsClick={handleOpenStats}
        />

        {/* Header Date Display */}
        <DateHeader selectedDate={selectedDate} />

        {/* Main Paper Area */}
        <PaperBackground onClick={handleBackgroundClick} className="flex flex-col p-6 cursor-text">
          <ExpenseList
            expenses={dailyExpenses}
            total={dailyTotal}
            onDelete={handleDelete}
          />
        </PaperBackground>

        {/* Modals */}
        <CalendarModal
          isOpen={showCalendar}
          onClose={() => setShowCalendar(false)}
          year={year}
          month={month}
          daysInMonth={daysInMonth}
          firstDayOfMonth={firstDayOfMonth}
          selectedDate={selectedDate}
          expenses={expenses}
          onDayClick={handleDayClick}
          onPrevMonth={navigatePrevMonth}
          onNextMonth={navigateNextMonth}
        />

        <InputModal
          isOpen={showInput}
          onClose={() => setShowInput(false)}
          selectedDate={selectedDate}
          onSave={handleSaveExpense}
        />

        <StatsModal
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          statsView={statsView}
          onStatsViewChange={setStatsView}
          statsData={statsData}
        />

        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onClearAll={clearAllExpenses}
        />
      </div>
    </div>
  );
}

export default App;
