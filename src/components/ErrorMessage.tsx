import type { ErrorMessageProps } from '../types';

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <span className="text-3xl">❌</span>
        <div className="flex-1">
          <h3 className="text-red-800 font-semibold mb-2">Erro</h3>
          <p className="text-red-600">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
