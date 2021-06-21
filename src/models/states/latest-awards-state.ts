import { Award } from "../award";
export interface LatestAwardsState {
    awards: Award[],
    inLastDays:number
  }