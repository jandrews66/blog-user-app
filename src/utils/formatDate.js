import { format } from 'date-fns';

export function formatDate(dateString) {
    if (!dateString) {
        return 'Invalid date';
    }
    const date = new Date(dateString);
    if (isNaN(date)) {
        return 'Invalid date';
    }
    return format(date, 'MMM dd, yyyy');
}