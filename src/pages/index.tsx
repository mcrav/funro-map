import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { InfoModal } from "~/components/info-modal";
import { Map } from "~/components/map/map";
import { Navbar } from "~/components/navbar";
import { A } from "~/components/typography";
import { LocalStorageKeys } from "~/constants";

const Home: NextPage = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    const infoModalSeen = localStorage.getItem(
      LocalStorageKeys.INFO_MODAL_SEEN
    );
    if (!infoModalSeen) {
      setShowInfoModal(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {"Funro Map - The 210 best mountains in Scotland by rating, not size"}
        </title>
        <meta
          name="description"
          content="Munro bagging is great, but sometimes big mountains are boring, and small are stunning. This map shows the 210 best rated mountains in Scotland, regardless of size."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Funro Map - The 210 best mountains in Scotland by rating, not size"
        />
        <meta
          property="og:description"
          content="Munro bagging is great, but sometimes big mountains are boring, and small are stunning. This map shows the 210 best rated mountains in Scotland, regardless of size."
        />
        <meta
          property="og:image"
          content="https://funromap.web.app/cover-image.webp"
        />
        <meta property="og:url" content="https://funromap.web.app" />
      </Head>
      <main className="">
        <Navbar />
        <Map />
        <InfoModal
          show={showInfoModal}
          onContinue={() => {
            localStorage.setItem(LocalStorageKeys.INFO_MODAL_SEEN, "true");
            setShowInfoModal(false);
          }}
        />
      </main>
      <footer className="my-5 p-5 text-center">
        <ul>
          <li>
            <A href="/privacy">Privacy Policy</A>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
