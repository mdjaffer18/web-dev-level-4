/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "watch cricket",
      dueDate: today,
      completed: true,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: "Play cricket",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overdueItems = overdue();
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    let yesterday = prev_date.toLocaleDateString("en-CA");
    add({
      title: "Reminder to lock shop",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(overdueItems.length + 1);
  });
  test("Due today tasks", () => {
    const todayItems = dueToday();
    add({
      title: "Complete works",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(todayItems.length + 1);
  });
  test("Due later tasks", () => {
    const duelaterItems = dueLater();
    var tomdate = new Date();
    tomdate.setDate(tomdate.getDate() + 1);
    let tomorrow = tomdate.toLocaleDateString("en-CA");
    add({
      title: "Do assignments",
      dueDate: tomorrow,
      completed: false,
    });
    expect(dueLater().length).toBe(duelaterItems.length + 1);
  });
});
