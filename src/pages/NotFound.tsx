import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-xl text-muted-foreground">Oops! This elephant wandered off</p>
          <p className="text-muted-foreground">The page you're looking for doesn't exist</p>
        </div>
        <a 
          href="/" 
          className="inline-block btn-safari px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform"
        >
          Return to Safari
        </a>
      </div>
    </div>
  );
};

export default NotFound;
