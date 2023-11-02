import { Colors } from "~/constants/colors";
import { Button } from "./button";
import { H1, P } from "./typography";
import { TestIds } from "~/constants/test";

export const InfoModal = ({
  onContinue,
  show,
}: {
  onContinue: () => void;
  show: boolean;
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="z-50 m-4 rounded-lg bg-white p-5 text-center drop-shadow-lg">
        <H1>The Funros</H1>
        <P>
          Munro bagging is great, but sometimes big mountains are really boring.
        </P>
        <P>
          This map shows the <b>210 best rated</b> mountains in Scotland, as
          decided by users on walkhighlands.co.uk
        </P>
        <div className="flex justify-center">
          <div className="text-start">
            <P>
              <span
                style={{
                  backgroundColor: Colors.GOLD,
                }}
                className="mr-2 inline-block h-3 w-3 rounded-full border border-black"
              />
              The Best
            </P>
            <P>
              <span
                style={{
                  backgroundColor: Colors.SILVER,
                }}
                className="mr-2 inline-block h-3 w-3 rounded-full border border-black"
              />
              Very Good
            </P>
            <P>
              <span
                style={{
                  backgroundColor: Colors.BRONZE,
                }}
                className="mr-2 inline-block h-3 w-3 rounded-full border border-black"
              />
              Decent
            </P>
          </div>
        </div>
        <P className="mb-3">{"Size isn't everything..."}</P>
        <Button onClick={onContinue} testId={TestIds.INFO_MODAL_EXPLORE_BUTTON}>
          Explore
        </Button>
      </div>
    </div>
  );
};
