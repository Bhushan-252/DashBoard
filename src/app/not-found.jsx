import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <p className="mt-2 text-gray-500">It might have been moved or deleted.</p>

        <div className="mt-6">
          <Link href="/dashboard/users">              Go Back Home
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
