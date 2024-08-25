import { ScheduleFormProvider } from './hooks/useScheduleFormContext';
import { ScheduleFormService } from './schedule-form-service';
import { ScheduleFormTime } from './schedule-form-time';

export function ScheduleForm() {
  return (
    <ScheduleFormProvider>
      <ScheduleFormService />
      <ScheduleFormTime />
    </ScheduleFormProvider>
  );
}
