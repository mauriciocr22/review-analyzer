import type { ReviewItemProps, SentimentType } from '../types';

export default function ReviewItem({ review }: ReviewItemProps) {
  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '👍';
      case 'negative':
        return '👎';
      default:
        return '👌';
    }
  };

  return (
    <div
      className={`rounded-lg p-4 border ${getSentimentColor(review.sentiment)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-gray-700 flex-1 leading-relaxed">{review.content}</p>
        <span className="text-2xl flex-shrink-0">
          {getSentimentIcon(review.sentiment)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium capitalize">{review.sentiment}</span>
        <span className="text-gray-500">Score: {review.score.toFixed(2)}</span>
      </div>
    </div>
  );
}
