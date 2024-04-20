import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit_banner";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

function Unit({
  id,
  order,
  title,
  description,
  activeLessonPercentage,
  activeLesson,
  lessons,
}: Props) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return <LessonButton />;
        })}
      </div>
    </>
  );
}

export default Unit;
