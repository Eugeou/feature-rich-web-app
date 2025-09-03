import { FacebookIcon, GoogleIcon, TwitterIcon } from "@/components/auth/OAuthIcons";

export const renderOAuthIcon = (providerKey: string) => {
    switch (providerKey) {
      case "google":
        return <GoogleIcon />;
      case "facebook":
        return <FacebookIcon />;
      case "twitter":
        return <TwitterIcon />;
      default:
        return null;
    }
  };