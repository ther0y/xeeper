import "dotenv/config";
import { Button, FrameContext, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { LinkletWelcomeFrame } from "./linklet-wlecome.js";
import {
  BoggleAnswer,
  GenerateBoggle,
  SolveBoggle,
} from "../../../utils/boggle-generator.js";
import { getFarcasterUserDetails } from "@airstack/frames";
import { LinkletState } from "../../../types.js";

export const LinkletGameFrame = async (
  c: FrameContext<
    { State: LinkletState },
    "/frames/linklet",
    BlankInput,
    LinkletState
  >
) => {
  const { previousButtonValues, buttonValue, inputText, deriveState } = c;

  if (
    !previousButtonValues?.includes("start-game") &&
    !["submit", "reset-game"].includes(buttonValue!)
  ) {
    return LinkletWelcomeFrame(c);
  }

  const fid = c.frameData?.fid;

  const state = await deriveState(async (previousState) => {
    if (buttonValue === "reset-game") {
      previousState.userAnswers = [];
      previousState.board = GenerateBoggle().board;
    }

    if (previousButtonValues?.includes("start-game")) {
      previousState.userAnswers = [];
      previousState.board = GenerateBoggle().board;
    }

    if (!previousState.username && !previousState.userPhotoUrl) {
      const userDetails = await getFarcasterUserDetails({ fid: fid! });
      previousState.username = userDetails.data?.profileName!;
      previousState.userPhotoUrl = userDetails.data?.profileImage?.original!;
    }
  });

  const userAnswers = state.userAnswers || [];
  let userAnswer = null;
  let isAnswerShort = false;
  let isAnswerInvalid = false;

  let userPhotoUrl = state.userPhotoUrl;
  let username = state.username;

  const userAnswerLength = inputText?.trim().length;

  if (userAnswerLength! > 2) {
    userAnswer = inputText;
  } else if (userAnswerLength! === 0) {
    userAnswer = null;
  } else if (userAnswerLength! <= 2) {
    if (inputText?.trim().length! > 0) {
      isAnswerShort = true;
    }
  }

  const board = state.board;

  const boardWords = SolveBoggle(board);

  let found: null | BoggleAnswer = null;
  let alreadyFound = userAnswers.find(
    (answer) => answer.toLowerCase() === userAnswer?.toLocaleLowerCase()
  );

  if (!isAnswerShort && !alreadyFound && userAnswer) {
    const matchingAnswer = boardWords.find(
      (answer) => answer.word.toLowerCase() === userAnswer.toLowerCase()
    );

    if (matchingAnswer) {
      found = matchingAnswer;
    } else {
      isAnswerInvalid = true;
    }
  }

  if (found) {
    userAnswers.push(found.word);
  }

  const board2d = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      row.push(board[i * 4 + j]);
    }
    board2d.push(row);
  }

  const finished = userAnswers.length === 5;

  let score = 0;

  if (finished) {
    score = userAnswers.reduce((acc, answer) => {
      acc += answer.length;
      return acc;
    }, 0);
  }

  const Tips = (
    <div tw="flex text-4xl">
      <span tw="pr-4">ℹ️</span>
      <span>Enter one word at a time, find 5 words to win!</span>
    </div>
  );

  const finishedButtons = [
    <Button value="reset-game">Play again 🔄</Button>,
    <Button.Link href="https://warpcast.com/masooda">@masooda 👨🏻‍💻</Button.Link>,
  ];

  const notFinishedButtons = [<Button value="submit">Submit ✊</Button>];

  return c.res({
    image: (
      <div tw="flex flex-col w-full h-full p-4 justify-center items-center bg-amber-100">
        <div
          tw="flex flex-row w-full pt-13 flex-grow justify-center"
          className="flex flex-col w-full justify-center gap-4 "
        >
          <div tw="flex flex-col pr-24">
            <div tw="flex flex-col text-4xl">
              <div
                tw={`flex justify-center items-center h-18 text-white rounded-md m-2
               ${
                 found
                   ? "bg-green-400 text-black"
                   : alreadyFound || isAnswerShort || isAnswerInvalid
                   ? "bg-red-400"
                   : "bg-blue-500"
               }`}
              >
                {found
                  ? found.word + "!"
                  : alreadyFound
                  ? "Already found!"
                  : isAnswerShort
                  ? "Too short!"
                  : isAnswerInvalid
                  ? "Word Not found!"
                  : "Enter a word!"}
              </div>
              <div tw="flex">
                {board2d.map((row, index) => (
                  <div tw="flex flex-col" key={index}>
                    {row.map((letter, index2) => (
                      <div
                        tw={`flex w-16 h-16 relative justify-center items-center content-center bg-amber-400 border border-gray-300 m-2 rounded-md font-bold 
                      ${
                        found?.sequence.includes(index * 4 + index2)
                          ? " bg-green-400 scale-125 drop-shadow-xl"
                          : "bg-amber-400"
                      }`}
                        className="justify-center content-center"
                        key={letter! + index}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div tw="flex flex-col">
            <div tw="flex flex-col text-4xl">
              <div tw="flex justify-center items-center h-18 text-white rounded-md m-2 px-4 bg-blue-500">
                {userPhotoUrl && (
                  <div tw="flex flex-row items-center justify-center">
                    <div tw="flex flex-col items-center justify-center">
                      <img
                        src={userPhotoUrl}
                        alt="user image"
                        width={50}
                        height={50}
                        tw="rounded-full border-4 border-white mr-2"
                      ></img>
                    </div>
                    {username ? `@${username}` : "Found words:"}
                  </div>
                )}

                {!userPhotoUrl && "Found words:"}
              </div>
              <div tw="flex flex-col">
                <div tw="flex flex-col" className="gap-8">
                  <div tw="flex mt-4">
                    1. {userAnswers[0] ? userAnswers[0] : "____________"}
                  </div>
                  <div tw="flex mt-4">
                    2. {userAnswers[1] ? userAnswers[1] : "____________"}
                  </div>
                  <div tw="flex mt-4">
                    3. {userAnswers[2] ? userAnswers[2] : "____________"}
                  </div>
                  <div tw="flex mt-4">
                    4. {userAnswers[3] ? userAnswers[3] : "____________"}
                  </div>
                  <div tw="flex mt-4">
                    5. {userAnswers[4] ? userAnswers[4] : "____________"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div tw="flex text-amber-900 items-center justify-center gap-4 text-4xl">
          {!finished && Tips}
          {finished && (
            <div tw="flex text-6xl mb-6">
              <div tw="relative bottom-2 right-4">🎉</div> You Won! score:{" "}
              {score}
            </div>
          )}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Did you found a word?" />,
      ...(finished ? finishedButtons : notFinishedButtons),
    ],
    browserLocation: "/linklet",
  });
};
