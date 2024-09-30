import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { get, save } from '../storage/asyncStorage';
import { dayStatusState } from '../storage/dayStatusStorage';

// Get yesterday's date as a string formatted as YYYY-MM-DD
const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

const useTrackDayStatus = () => {
  const [dayStatus, setDayStatus] = useRecoilState(dayStatusState);
  
  // Helper to determine if user opened the app today
  const hasUserOpenedToday = async () => {
    console.log("Already opened app today")
    const lastOpenDate = await get('lastOpenDate');
    const today = new Date().toISOString().split('T')[0];
    return lastOpenDate === today;
  };

  // Save the current state as yesterday's data
  const logYesterdayStatus = async () => {
    const yesterdayKey = getYesterdayDate();
    const yesterdayData = await get(yesterdayKey);
    // If no data exists for yesterday, store the current state
    if (!yesterdayData) {
      await save(yesterdayKey, dayStatus);
      console.log(`Saved day status for ${yesterdayKey}`);
    } else {
      console.log(`Already saved day status for ${yesterdayKey}`);
    }
  };

  useEffect(() => {
    const handleAppOpen = async () => {
      const openedToday = await hasUserOpenedToday();
      if (!openedToday) {
        await logYesterdayStatus(); 
        const today = new Date().toISOString().split('T')[0]; 
        await save('lastOpenDate', today);
      }
    };

    handleAppOpen();
  }, [dayStatus]);
};

export default useTrackDayStatus;