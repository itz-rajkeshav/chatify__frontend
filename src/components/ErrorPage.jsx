import { AlertCircle, RefreshCw, Home, Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/login");
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = "mailto:itsrajkeshav@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-lg text-gray-600 mb-8">Something went wrong</p>
        </div>

        <Alert variant="destructive" className="mb-6 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Error Occurred</AlertTitle>
          <AlertDescription>
            {"We encountered an unexpected issue"}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-4">
          <Button
            onClick={handleRefresh}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh Page
          </Button>

          <Button
            variant="outline"
            onClick={handleGoHome}
            className="w-full border-gray-300 hover:bg-gray-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Back Home
          </Button>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact support
          </p>
          <Button
            variant="link"
            onClick={handleEmailClick}
            className="text-blue-600 hover:text-blue-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            itsrajkeshav@gmail.com
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
