import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-8 text-center"
      >
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">Página no encontrada</p>
        <p className="text-gray-500">La página que buscas no existe o ha sido movida.</p>
        <Link 
          to="/" 
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}
