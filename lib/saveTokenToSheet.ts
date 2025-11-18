const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxnF-UH4IuoU39cmDxUTXZ8ZiDdXDqidRR8Lo4RAzo2_suR-hMcXOvL-5B7zwNQx3nn/exec";

export async function saveTokenToGoogleSheet(
  token: string,
  deviceInfo?: {
    platform?: string;
    model?: string;
    osVersion?: string;
    deviceId?: string;
  }
) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        deviceId: deviceInfo?.deviceId,
        platform: deviceInfo?.platform,
        model: deviceInfo?.model,
        osVersion: deviceInfo?.osVersion,
      }),
    });

    const result = await response.json();

    if (result.status === "success") {
      console.log("✅ Token saved to Google Sheets");
      return true;
    } else {
      console.error("❌ Failed to save token:", result);
      return false;
    }
  } catch (error) {
    console.error("❌ Error saving to Google Sheets:", error);
    return false;
  }
}
