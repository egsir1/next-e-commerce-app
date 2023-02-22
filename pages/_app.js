import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { isFallback, events } = useRouter();

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const id = "google-translate-script";

    const addScript = () => {
      const s = document.createElement("script");
      s.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      s.setAttribute("id", id);
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const q = document.getElementById(id);
      if (q) q.remove();
      const w = document.getElementById("google_translate_element");
      if (w) w.innerHTML = "";
    };

    isFallback || addScript();

    events.on("routeChangeStart", removeScript);
    events.on("routeChangeComplete", addScript);

    return () => {
      events.off("routeChangeStart", removeScript);
      events.off("routeChangeComplete", addScript);
    };
  }, [events, isFallback]);

  {
    return (
      <SessionProvider session={session}>
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </PayPalScriptProvider>
        </StoreProvider>
      </SessionProvider>
    );
  }

  function Auth({ children }) {
    const router = useRouter();
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/unauthorized?message=login required");
      },
    });
    if (status === "loading") {
      return <div>Loading...</div>;
    }
    return children;
  }
}
