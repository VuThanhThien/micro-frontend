declare module "remoteComponents/components" {
  import React from "react";

  const Wave: React.FC;

  interface ITitleProps extends React.ComponentProps<"h2"> {
    children?: React.ReactNode;
    size?: "xl" | "lg" | "base";
  }

  const Title: React.FC<ITitleProps>;

  const Footer: React.FC;
}

declare module "remoteComponents/pages" {
  import React from "react";

  const Forbidden: React.FC;
  const NotFound: React.FC;
  const UnderConstructions: React.FC;
}

declare module "remoteComponents/contexts" {
  import React from "react";

  interface SnackbarContextInterface {
    error: (newMessage: string) => void;
    success: (newMessage: string) => void;
  }

  const SnackbarContext: React.Context<SnackbarContextInterface>;

  type SnackbarProviderProps = {
    children: React.ReactNode;
  };

  const SnackbarProvider: ({ children }: SnackbarProviderProps) => JSX.Element;

  function useSnackbar(): SnackbarContextInterface;
}

// MF auth
declare module "remoteAuth/pages" {
  const Register: () => JSX.Element;
  const ForgotPassword: () => JSX.Element;
  const Login: () => JSX.Element;
  const ForgotPasswordSubmit: () => JSX.Element;
}

declare module "remoteAuth/contexts" {
  import React from "react";

  interface AuthContextInterface {
    hasRole: (roles?: string[]) => {};
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    userInfo?: UserInfo;
  }

  const AuthContext: React.Context<AuthContextInterface>;

  type AuthProviderProps = {
    children?: React.ReactNode;
  };

  const AuthProvider: ({ children }: AuthProviderProps) => JSX.Element;

  function useAuth(): AuthContextInterface;
}

declare module "remoteVue/pages" {
  const mount: (el: HTMLElement) => {
    unmount: () => void;
  };
}

interface UserInfo {
  id: string;
  avatar?: string;
  email: string;
  firstName: string;
  job: string;
  lastName: string;
  progress: number;
  role: string;
}
