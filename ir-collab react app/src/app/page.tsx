import HomeFeeds from "./feeds/page";
import { PresentationFlowTest } from "../components/test/PresentationFlowTest";

export default function HomePage() {
  // Configuration for showing different modes
  const showTestMode = false; // Set to true to show presentation flow test
  const showDevMode = process.env.NODE_ENV === "development" && showTestMode;

  // Show test component when enabled
  if (showDevMode) {
    return <PresentationFlowTest />;
  }

  // Show complete home feeds page (production mode)
  return <HomeFeeds />;
}
