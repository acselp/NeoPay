/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date and time for display
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Format a meter reading with leading zeros based on digit count
 */
export function formatMeterReading(value: number, digits: number): string {
  return value.toString().padStart(digits, '0');
}

/**
 * Format consumption with units
 */
export function formatConsumption(value: number, utilityName: string): string {
  const unit = getUtilityUnit(utilityName);
  return `${formatNumber(Math.round(value * 100) / 100)} ${unit}`;
}

/**
 * Get the unit for a utility type
 */
export function getUtilityUnit(utilityName: string): string {
  const name = utilityName.toLowerCase();
  if (name.includes('electric')) return 'kWh';
  if (name.includes('gas')) return 'm³';
  if (name.includes('water')) return 'gallons';
  return 'units';
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
