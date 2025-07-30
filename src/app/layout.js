import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandel from '../components/ErrorHandel'
import ThemeWrapper from "../components/ThemeWrapper";
export const metadata = {
  title: "DashBoard",
  description: "DashBoard Using nextjs for user and watch there post",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary fallback={<ErrorHandel/>}>
          <AppRouterCacheProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </AppRouterCacheProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};
