import { getAnalytics } from "firebase/analytics";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { H1, H2, P } from "~/components/typography";
import { LocalStorageKeys } from "~/constants";
import { firebaseApp } from "~/utils/firebase";

const Privacy: NextPage = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(
      LocalStorageKeys.COOKIE_POPUP_ACCEPTED
    );

    setCookiesAllowed(!!accepted);
  }, []);

  const onAllowCookies = () => {
    setCookiesAllowed(true);
    firebaseApp.automaticDataCollectionEnabled = true;
    getAnalytics(firebaseApp);
  };

  const onRejectCookies = () => {
    setCookiesAllowed(false);
    firebaseApp.automaticDataCollectionEnabled = false;
  };

  return (
    <>
      <Head>
        <title>Funro Map - Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <H1>Privacy Policy</H1>
        <P>
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you visit our website.{" "}
        </P>
        <H2>Information Collection and Use</H2>
        <P>
          {" "}
          We do not collect or store any personal information about our website
          visitors. We respect your privacy and are committed to ensuring that
          your personal information is protected. However, we use Firebase
          Analytics to collect and analyze non-personal, aggregated data about
          user interactions with our website. Firebase Analytics helps us
          understand user behavior and improve the user experience. The data
          collected includes: - Information about your device, such as device
          type, operating system, and browser - Your IP address (anonymized) -
          User interactions with the website, such as pageviews and clicks -
          Other technical data related to website usage. We do not attempt to
          identify individual users through Firebase Analytics, and we do not
          link this data to any personally identifiable information.{" "}
        </P>
        <H2>Cookies</H2>
        <P>
          {" "}
          Firebase analytics uses cookies to identify unique site users. You can
          choose to accept or decline Firebase analytics cookies here.
        </P>
        <fieldset className="flex flex-col">
          <div className="flex">
            <input
              id="allow"
              name="allow"
              type="radio"
              onClick={onAllowCookies}
              checked={cookiesAllowed}
            />
            <label htmlFor="allow">Allow Cookies</label>
          </div>
          <div className="flex">
            <input
              id="reject"
              name="reject"
              type="radio"
              onClick={onRejectCookies}
              checked={!cookiesAllowed}
            />
            <label htmlFor="reject">Reject Cookies</label>
          </div>
        </fieldset>
        <H2>Third-Party Websites</H2>
        <P>
          {" "}
          Our website may contain links to external websites or services that
          are not operated by us. We are not responsible for the privacy
          practices or content of these external websites. We encourage you to
          review the privacy policies of those websites.{" "}
        </P>
        <H2>{"Children's Privacy"}</H2>
        <P>
          {" "}
          Our website does not knowingly collect or store personal information
          from anyone, including individuals under the age of 13. If you believe
          that a child has provided us with personal information, please contact
          us, and we will take appropriate action to remove such information.{" "}
        </P>
        <H2>Changes to this Privacy Policy</H2>
        <P>
          {" "}
          We may update this Privacy Policy to reflect changes to our practices
          or for legal or regulatory reasons. We encourage you to check this
          page periodically for any updates. Your continued use of our website
          constitutes your acceptance of any revised Privacy Policy.{" "}
        </P>
        <H2>Contact Us</H2>
        <P>
          {" "}
          If you have any questions or concerns about our Privacy Policy or the
          use of Firebase Analytics on our website, please contact us at
          [email_here]. This Privacy Policy was last updated on 01/11/2023.
        </P>
      </main>
    </>
  );
};

export default Privacy;
