"use client";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

function LessonButton({
  id,
  index,
  percentage,
  totalCount,
  current,
  locked,
}: Props) {
  return <div>{id}</div>;
}

export default LessonButton;
