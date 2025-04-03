import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 text-center dark:bg-slate-800/50">
        <h1 className="text-6xl font-bold mb-4 dark:text-white">404</h1>
        <p className="text-xl text-muted-foreground dark:text-slate-300 mb-6">
          Oops! Page not found
        </p>
        <Link to="/">
          <ButtonCustom variant="outline" className="dark:bg-slate-800/50">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
