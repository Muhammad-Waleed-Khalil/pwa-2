import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';

export async function handleMobileOAuth() {
  const info = await Device.getInfo();
  const isMobile = info.platform === 'android' || info.platform === 'ios';

  if (!isMobile) {
    return false;
  }

  // Custom browser handler for Google OAuth
  const openBrowser = async (url: string) => {
    await Browser.open({ url });
    return new Promise<void>((resolve) => {
      Browser.addListener('browserFinished', async () => {
        await Browser.close();
        resolve();
      });
    });
  };

  // Handle the mobile OAuth flow
  try {
    // Use Clerk's OAuth endpoint for mobile
    const redirectUrl = 'aimockinterview://oauth-callback';
    const oauthUrl = `https://${import.meta.env.VITE_CLERK_FRONTEND_API}/oauth/google?redirect_url=${encodeURIComponent(redirectUrl)}&platform=mobile`;
    
    await openBrowser(oauthUrl);
    return true;
  } catch (error) {
    console.error('Mobile OAuth error:', error);
    return false;
  }
}

// Function to close browser after successful OAuth
export async function closeMobileBrowser() {
  try {
    await Browser.close();
  } catch (error) {
    console.error('Error closing browser:', error);
  }
}
