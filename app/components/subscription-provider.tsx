"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Subscription } from "../lib/models";
import {
  createAndActivateSubscription,
  deactivateSubscription,
  getSubscription,
} from "../lib/subscription";

interface SubscriptionContextValue {
  subscription: Subscription | null;
  isLoading: boolean;
  pending: "subscribe" | "unsubscribe" | null;
  subscribe: () => Promise<void>;
  deactivate: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}

export default function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState<"subscribe" | "unsubscribe" | null>(
    null
  );

  useEffect(() => {
    getSubscription().then((result) => {
      setSubscription(result?.success ? result.data : null);
      setIsLoading(false);
    });
  }, []);

  const subscribe = useCallback(async () => {
    setPending("subscribe");
    const result = await createAndActivateSubscription();
    if (result.success) {
      setSubscription(result.data);
    }
    setPending(null);
  }, []);

  const deactivate = useCallback(async () => {
    setPending("unsubscribe");
    const result = await deactivateSubscription();
    if (result.success) {
      setSubscription(null);
    }
    setPending(null);
  }, []);

  return (
    <SubscriptionContext
      value={{
        subscription,
        isLoading,
        pending,
        subscribe,
        deactivate,
      }}
    >
      {children}
    </SubscriptionContext>
  );
}
