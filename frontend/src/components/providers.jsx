

// Stubbed next-auth for Vite rewrite
const useSession = () => ({ data: { user: { name: 'Admin User', role: 'ADMIN' } }, status: 'authenticated' });
const signOut = async () => {};
const SessionProvider = ({ children }) => <>{children}</>;
    
import { ThemeProvider } from "./theme-provider";import { jsx as _jsx } from "react/jsx-runtime";

export function Providers({ children, session }) {
  return (/*#__PURE__*/
    _jsx(SessionProvider, { session: session, children: /*#__PURE__*/
      _jsx(ThemeProvider, { attribute: "class", defaultTheme: "dark", enableSystem: true, children:
        children }
      ) }
    ));

}