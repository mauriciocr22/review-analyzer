import type { EmptyStateProps } from '../types';

export default function EmptyState({
  message = 'Nenhum dado encontrado',
  icon = '📭',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <span className="text-6xl mb-4">{icon}</span>
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
}
