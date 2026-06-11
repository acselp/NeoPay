import type { Connection, Meter, Reading, Utility } from '../types';

export type ReadingWarningType = 'error' | 'warning';

export interface ReadingWarning {
  type: ReadingWarningType;
  message: string;
}

export interface AddReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection: Connection;
  meter?: Meter | null;
  utility?: Utility | null;
  latestReading?: Reading | null;
}
