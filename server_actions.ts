"use server";

import { revalidatePath } from "next/cache";





export async function revalidatePage (path:string) {
  revalidatePath(path)
} 



export async function modifySearchParams(currentUrl: string, action: string, key: string, value?: string) {
  const url = new URL(currentUrl);
  const searchParams = url.searchParams;

  // Perform the action
  switch (action) {
    case "add":
    case "update":
      searchParams.set(key, value || "");
      break;
    case "delete":
      searchParams.delete(key);
      break;
    default:
      throw new Error(`Invalid action: ${action}`);
  }
  const updatedUrl = `${url.origin}${url.pathname}?${searchParams.toString()}`;


  return { redirect: updatedUrl };
}


import { headers } from "next/headers"



export async function getFullUrl(searchParams: URLSearchParams): Promise<string> {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = headersList.get("x-forwarded-proto") || "http"

  // Get the path from x-invoke-path header
  const path = headersList.get("x-invoke-path") || ""

  // Construct the full URL
  const fullUrl = `${protocol}://${host}${path}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

  return fullUrl
}
