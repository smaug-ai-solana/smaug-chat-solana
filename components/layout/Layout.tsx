import React from "react";
import { useLogin, usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout, authenticated, ready } = usePrivy();
  const { wallets: solanaWallets } = useSolanaWallets();
  const navigate = useNavigate();
  const { login } = useLogin({
    onComplete: async (user) => {
      if (user.id) {
        try {
          await api.post("/auth/login", {
            walletAddress: user.id,
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to authenticate with backend",
          });
        }
      }
    },
  });

  const handleLogin = async () => {
    try {
      login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur-sm z-50">
        <div className="container flex h-16 items-center px-4 ">
          <div className="flex items-center justify-center space-x-4">
            {authenticated ? (
              <>
                <Button variant="outline" onClick={() => logout()}>
                  {solanaWallets.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {`${solanaWallets[0]?.address?.slice(
                        0,
                        6
                      )}...${solanaWallets[0]?.address?.slice(-4)}`}
                    </span>
                  )}
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={handleLogin} disabled={!ready}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="pt-16">{children}</main>
    </div>
  );
}
