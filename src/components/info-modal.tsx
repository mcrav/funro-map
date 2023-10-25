import { Button } from "./button";
import { H1, P } from "./typography";

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
        <H1>Funro Map</H1>
        <P>
          Munro bagging is great, but sometimes big mountains are really boring.
        </P>
        <P>
          This map shows the <b>210 best rated</b> mountains in Scotland.
        </P>
        <div className="flex justify-center">
          <div className="text-start">
            <P>
              <span className="mr-2 inline-block h-3 w-3 rounded-full border border-black bg-yellow-300" />
              The Best
            </P>
            <P>
              <span className="mr-2 inline-block h-3 w-3 rounded-full border border-black bg-gray-300" />
              Very Good
            </P>
            <P>
              <span className="mr-2 inline-block h-3 w-3 rounded-full border border-black bg-amber-500" />
              Decent
            </P>
          </div>
        </div>
        <P className="mb-3">{"Size isn't everything..."}</P>
        <Button onClick={onContinue}>Explore</Button>
      </div>
    </div>
  );
};
