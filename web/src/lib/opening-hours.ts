export const openingHours = {
  weekDays: {
    open: 10,
    close: 22,
  },
  weekend: {
    open: 10,
    close: 19,
  },
  slots(date: Date | undefined) {
    if (!date) return [];

    const { open, close } = [0, 6].includes(date.getDay())
      ? this.weekend
      : this.weekDays;

    const slots = [];

    for (let i = open; i < close; i++) {
      slots.push(`${i}:00`, `${i}:30`);
    }

    return slots;
  },
};
