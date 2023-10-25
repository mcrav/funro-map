import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { LocalStorageKeys } from "~/constants";
import { firebaseApp } from "~/utils/firebase";
import { Button } from "./button";
import { A, P } from "./typography";

export const CookiePopup = () => {
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem(
      LocalStorageKeys.COOKIE_POPUP_ACCEPTED
    );

    // No value, show dialog
    if (!accepted) {
      setSeen(false);
    }

    // User has accepted cookies, enabled analytics
    if (accepted === "true") {
      firebaseApp.automaticDataCollectionEnabled = true;
      getAnalytics(firebaseApp);
      return;
    }

    firebaseApp.automaticDataCollectionEnabled = false;
  }, []);

  if (seen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mb-3 flex w-full justify-center">
      <div className="mx-5 max-w-3xl rounded-lg bg-slate-100 p-5 text-center shadow-lg">
        <P>
          We use cookies to understand how many people visit the site. No weird
          stuff.{" "}
          <A href="/privacy" target="_blank">
            Privacy Policy
          </A>
        </P>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Button
            color="secondary"
            onClick={() => {
              localStorage.setItem(
                LocalStorageKeys.COOKIE_POPUP_ACCEPTED,
                "false"
              );
              setSeen(true);
              firebaseApp.automaticDataCollectionEnabled = false;
            }}
          >
            Reject
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem(
                LocalStorageKeys.COOKIE_POPUP_ACCEPTED,
                "true"
              );
              firebaseApp.automaticDataCollectionEnabled = true;
              setSeen(true);
              getAnalytics(firebaseApp);
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
