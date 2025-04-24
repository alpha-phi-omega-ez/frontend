export type Course = {
  id: string;
  name: string;
};

export type Backtest = {
  type: string;
  tests: string[];
};

export type BacktestState = {
  view: "codes" | "courses" | "backtests" | "error";
  currentCourseCode: string | null;
  currentCourse: Course | null;
  courses: Course[] | null;
  backtests: Backtest[] | null;
};

export type ReducerActions =
  | { type: "TO_COURSES" }
  | { type: "TO_CODES" }
  | {
      type: "SET_COURSES";
      payload: { courses: Course[]; currentCourseCode: string };
    }
  | {
      type: "SET_BACKTESTS";
      payload: { backtests: Backtest[]; currentCourse: Course };
    }
  | { type: "ERROR" };
