"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question_bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge_progress";
import { toast } from "sonner";

type Props = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any; // TODO: Replace with subscription DB type
};

export function Quiz({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed,
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">(
    "none",
  );

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions || [];
  const title =
    currentChallenge.type === "ASSIST"
      ? "Select the correct meaning"
      : currentChallenge.question;

  function onSelect(id: number) {
    if (status !== "none") return;

    setSelectedOption(id);
  }

  function onNext() {
    setActiveIndex(current => current + 1);
  }

  function onContinue() {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find(option => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(currentChallenge.id)
          .then(res => {
            if (res?.error === "hearts") {
              // TODO: Show a modal for this situation
              console.error("Missing hearts");
              return;
            }

            setStatus("correct");
            setPercentage(prev => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts(prev => Math.min(prev + 1, 5));
            }
          })
          .catch(() =>
            toast.error("Something went wrong. Please try again"),
          );
      });
    } else {
      console.error("Incorrect option!");
    }
  }

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={Boolean(userSubscription?.isActive)}
      />

      <div className="flex-1 h-full flex items-center justify-center">
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
          <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 ">
            {title}
          </h1>

          <div>
            {currentChallenge.type === "ASSIST" && (
              <QuestionBubble question={currentChallenge.question} />
            )}
            <Challenge
              options={options}
              onSelect={onSelect}
              status={status}
              selectedOption={selectedOption}
              disabled={isPending}
              type={currentChallenge.type}
            />
          </div>
        </div>
      </div>

      <Footer
        disabled={isPending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
}
