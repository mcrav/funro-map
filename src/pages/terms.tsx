import { type NextPage } from "next";
import Head from "next/head";
import { H1, P } from "~/components/typography";

const TermsAndConditions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Funro Map - Terms & Conditions</title>
        <meta name="description" content="Terms & Conditions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <H1>Terms & Conditions</H1>
        <P>
          {`Hillwalking can be a dangerous activity and all walks are undertaken entirely at your own risk.
            Many mountains listed here require extensive training and equipment to climb safely, and even
            then they are not without risk.
            All information provided here is given for interest only and we do not guarantee that
            this information will be accurate.
            To the extent permitted by law, we exclude all liability in contract,
            tort (including negligence) breach of statutory duty or otherwise for any costs,
            losses, claims, damages, expenses or proceedings (including special, incidental or
            consequential loss or damage, loss of profits or wasted time)
            incurred or suffered by you arising directly or indirectly in connection with this
            website and its content including any loss, damage or expense arising from, but not limited
            to, any defect, error, imperfection, fault, mistake or inaccuracy with our website,
             or other content or associated services or due to any unavailability of part or all
             of the website or any content or associated services.`}
        </P>
      </main>
    </>
  );
};

export default TermsAndConditions;
