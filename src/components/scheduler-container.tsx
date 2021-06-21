import { AgendaView,  MonthView, Scheduler } from "@progress/kendo-react-scheduler";
import React from "react";
import { SchedulerProps } from "src/models/props/scheduler-props";
const SchedulerContainer = React.memo((props:SchedulerProps) => (
    <Scheduler  data={props.data} defaultDate={props.startDate}>
    
    <MonthView />
    <AgendaView numberOfDays={props.numberOfDays}  />
    
  </Scheduler>
));

export default SchedulerContainer;
