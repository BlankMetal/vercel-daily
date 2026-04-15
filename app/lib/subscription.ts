"use server";

import { cookies } from "next/headers";
import { fetchFromAPI } from "./api";
import type { SubscriptionResponse } from "./models";

const COOKIE_NAME = "subscription-token";

export async function createAndActivateSubscription(): Promise<SubscriptionResponse> {
  const createResponse: SubscriptionResponse = await fetchFromAPI(
    "/subscription/create",
    { method: "POST" }
  );

  if (!createResponse.success) {
    return createResponse;
  }

  const token = createResponse.data.token;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  const activateResponse: SubscriptionResponse = await fetchFromAPI(
    "/subscription",
    {
      method: "POST",
      headers: { "x-subscription-token": token },
    }
  );

  return activateResponse;
}

export async function getSubscription(): Promise<SubscriptionResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const response: SubscriptionResponse = await fetchFromAPI("/subscription", {
    method: "GET",
    headers: { "x-subscription-token": token },
  });

  return response;
}

export async function deactivateSubscription(): Promise<SubscriptionResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return { success: false, data: null as unknown as SubscriptionResponse["data"] };
  }

  const response: SubscriptionResponse = await fetchFromAPI("/subscription", {
    method: "DELETE",
    headers: { "x-subscription-token": token },
  });

  if (response.success) {
    cookieStore.delete(COOKIE_NAME);
  }

  return response;
}
