
export class SchedulerProps 
{
    data:TaskData[];
    startDate:Date;
    numberOfDays:number;
}

export class TaskData {
    id:number;
    title: string;
    start: Date;
    end: Date;
    isAllDay: boolean
}

