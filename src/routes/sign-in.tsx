import { SignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Device } from '@capacitor/device';
import { MobileSignIn } from "@/components/mobile-sign-in";

export const SignInPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPlatform = async () => {
      try {
        const info = await Device.getInfo();
        setIsMobile(info.platform === 'android' || info.platform === 'ios');
      } catch (error) {
        console.error('Error checking platform:', error);
      } finally {
        setLoading(false);
      }
    };
    checkPlatform();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isMobile) {
    return <MobileSignIn />;
  }

  return <SignIn path="/signin" />;
};
