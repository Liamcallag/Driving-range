import { Range } from './types';

interface OpenStatus {
  isOpen: boolean;
  todayHours: string;
  status: string;
}

function parseTimeToMinutes(timeStr: string): number | null {
  // Handle formats like "7:30AM", "9PM", "11:30AM", "5PM"
  const match = timeStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3].toUpperCase();
  if (period === 'AM') {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }
  return hours * 60 + minutes;
}

function parseHoursRange(hoursStr: string): { open: number; close: number } | null {
  if (!hoursStr || hoursStr.toLowerCase() === 'closed') return null;

  // Format: "7:30AM-4:30PM" or "7AM-9:30PM" or "Open 24 hours"
  if (hoursStr.toLowerCase().includes('open 24')) {
    return { open: 0, close: 24 * 60 };
  }

  // Split on dash but be careful — times can look like "7AM-9PM"
  // We need to split on the dash between close and open times
  // Strategy: find the dash that separates two time tokens
  const dashMatch = hoursStr.match(/^(.+?[AaPp][Mm])-(.+[AaPp][Mm])$/);
  if (dashMatch) {
    const openMins = parseTimeToMinutes(dashMatch[1]);
    const closeMins = parseTimeToMinutes(dashMatch[2]);
    if (openMins !== null && closeMins !== null) {
      return { open: openMins, close: closeMins };
    }
  }

  return null;
}

export function getOpenStatus(workingHoursJson: string): OpenStatus {
  if (!workingHoursJson) {
    return { isOpen: false, todayHours: 'Hours unavailable', status: 'Hours unavailable' };
  }

  let hours: Record<string, string[]>;
  try {
    hours = JSON.parse(workingHoursJson);
  } catch {
    return { isOpen: false, todayHours: 'Hours unavailable', status: 'Hours unavailable' };
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const todayIndex = now.getDay();
  const todayName = days[todayIndex];

  const todayHoursArr = hours[todayName];
  const todayHoursStr = todayHoursArr ? todayHoursArr[0] : 'Closed';

  if (!todayHoursStr || todayHoursStr.toLowerCase() === 'closed') {
    // Find next open day
    let nextOpenDay = '';
    let nextOpenHours = '';
    for (let i = 1; i <= 7; i++) {
      const checkDay = days[(todayIndex + i) % 7];
      const checkHours = hours[checkDay];
      if (checkHours && checkHours[0] && checkHours[0].toLowerCase() !== 'closed') {
        nextOpenDay = i === 1 ? 'tomorrow' : checkDay;
        nextOpenHours = checkHours[0].split('-')[0];
        break;
      }
    }
    const nextInfo = nextOpenDay ? ` · Opens ${nextOpenDay} ${nextOpenHours}` : '';
    return {
      isOpen: false,
      todayHours: 'Closed today',
      status: `Closed${nextInfo}`,
    };
  }

  const range = parseHoursRange(todayHoursStr);
  if (!range) {
    return {
      isOpen: false,
      todayHours: todayHoursStr,
      status: 'See hours',
    };
  }

  const currentMins = now.getHours() * 60 + now.getMinutes();
  const isOpen = currentMins >= range.open && currentMins < range.close;

  // Format close time for display
  const closeHour = Math.floor(range.close / 60);
  const closeMin = range.close % 60;
  const closePeriod = closeHour >= 12 ? 'PM' : 'AM';
  const displayCloseHour = closeHour > 12 ? closeHour - 12 : closeHour === 0 ? 12 : closeHour;
  const closeTimeStr = closeMin > 0
    ? `${displayCloseHour}:${closeMin.toString().padStart(2, '0')}${closePeriod}`
    : `${displayCloseHour}${closePeriod}`;

  if (isOpen) {
    return {
      isOpen: true,
      todayHours: todayHoursStr,
      status: `Open until ${closeTimeStr}`,
    };
  } else {
    // Find next open time (could be later today if before opening, or next day)
    const openHour = Math.floor(range.open / 60);
    const openMin = range.open % 60;
    const openPeriod = openHour >= 12 ? 'PM' : 'AM';
    const displayOpenHour = openHour > 12 ? openHour - 12 : openHour === 0 ? 12 : openHour;
    const openTimeStr = openMin > 0
      ? `${displayOpenHour}:${openMin.toString().padStart(2, '0')}${openPeriod}`
      : `${displayOpenHour}${openPeriod}`;

    if (currentMins < range.open) {
      return {
        isOpen: false,
        todayHours: todayHoursStr,
        status: `Closed · Opens today ${openTimeStr}`,
      };
    }

    // Past closing — find next open day
    let nextOpenDay = '';
    let nextOpenHours = '';
    for (let i = 1; i <= 7; i++) {
      const checkDay = days[(todayIndex + i) % 7];
      const checkHours = hours[checkDay];
      if (checkHours && checkHours[0] && checkHours[0].toLowerCase() !== 'closed') {
        nextOpenDay = i === 1 ? 'tomorrow' : checkDay;
        nextOpenHours = checkHours[0].split('-')[0];
        break;
      }
    }
    const nextInfo = nextOpenDay ? ` · Opens ${nextOpenDay} ${nextOpenHours}` : '';
    return {
      isOpen: false,
      todayHours: todayHoursStr,
      status: `Closed${nextInfo}`,
    };
  }
}

export function getCities(ranges: Range[]): string[] {
  const citySet = new Set<string>();
  ranges.forEach((r) => {
    if (r.city) citySet.add(r.city);
  });
  return Array.from(citySet).sort();
}
