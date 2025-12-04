import type { AnalysisResultProps, SentimentType } from '../types';

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentEmoji = (sentiment: SentimentType) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const getScorePercentage = (score: number) => {
    return ((score + 1) / 2) * 10;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      {/* Header do Resultado */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>{getSentimentEmoji(analysis.sentiment)}</span>
          Resultado da Análise
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(analysis.createdAt).toLocaleString('pt-BR')}
        </p>
      </div>

      {/* URL Analisada */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          URL Analisada
        </label>
        <div className="bg-gray50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-600 break-all">{analysis.url}</p>
        </div>
      </div>

      {/* Nome do Produto (se existir) */}
      {analysis.productName && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Produto
          </label>
          <p className="text-lg text-gray-800">{analysis.productName}</p>
        </div>
      )}

      {/* Score Visual */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Score de Sentimento
        </label>
        <div className="space-y-2">
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                analysis.sentiment === 'positive'
                  ? 'bg-green-500'
                  : analysis.sentiment === 'negative'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
              }`}
              style={{ width: `${getScorePercentage(analysis.score)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Negativo</span>
            <span className="font-semibold text-gray-700">
              {analysis.score.toFixed(2)}
            </span>
            <span>Positivo</span>
          </div>
        </div>
      </div>

      {/* Sentimento Geral */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sentimento Geral
        </label>
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getSentimentColor(
            analysis.sentiment
          )}`}
        >
          <span>{getSentimentEmoji(analysis.sentiment)}</span>
          <span className="capitalize">{analysis.sentiment}</span>
        </span>
      </div>

      {/* Resumo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Resumo da Análise
        </label>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">
            {analysis.reviewCount}
          </p>
          <p className="text-sm text-gray-600">Reviews Analisados</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600">
            {getScorePercentage(analysis.score).toFixed(0)}%
          </p>
          <p className="text-sm text-gray-600">Score Positivo</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-600">
            {analysis.reviews.length}
          </p>
          <p className="text-sm text-gray-600">Reviews Detalhados</p>
        </div>
      </div>

      {/* Lista de Reviews (se existir) */}
      {analysis.reviews && analysis.reviews.length > 0 && (
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Reviews Individuais ({analysis.reviews.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {analysis.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1">{review.content}</p>
                  <span
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                      review.sentiment
                    )}`}
                  >
                    {review.sentiment}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Score: {review.score.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Ação */}
      <div className="pt-4 border-t">
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nova Análise
        </button>
      </div>
    </div>
  );
}
