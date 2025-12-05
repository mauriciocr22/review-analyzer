import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnalysisResult from '../components/AnalysisResult';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import apiService from '../services/api';
import type { Analysis as AnalysisType } from '../types';

export default function Analysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadAnalysis(id);
    }
  }, [id]);

  const loadAnalysis = async (analysisId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiService.getAnalysis(analysisId);

      if (!result.success) {
        throw new Error(result.error || 'Erro ao carregar análise');
      }

      if (result.data) {
        setAnalysis(result.data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Navigation */}
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              ← Voltar
            </button>
            <span className="text-gray-400">|</span>
            <Link to="/history" className="text-gray-600 hover:text-gray-800">
              Histórico
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Nova Análise
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <LoadingSpinner message="Carregando análise..." />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <ErrorMessage
              message={error}
              onRetry={() => id && loadAnalysis(id)}
            />
          )}

          {/* Analysis Result */}
          {analysis && !isLoading && !error && (
            <AnalysisResult analysis={analysis} />
          )}
        </div>
      </main>
    </div>
  );
}
