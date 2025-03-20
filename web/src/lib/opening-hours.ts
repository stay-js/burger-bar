const timeSlots = (start: number, end: number) => {
  const slots = [];

  for (let i = start; i < end; i++) {
    slots.push(`${i}:00`);
    slots.push(`${i}:30`);
  }

  return slots;
};

export const openingHours = {
  weekDays: {
    open: 10,
    close: 22,
    slots: timeSlots(10, 22),
  },
  weekend: {
    open: 10,
    close: 19,
    slots: timeSlots(10, 19),
  },
};
