import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit_banner";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect)[];
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
    </>
  );
}

export default Unit;
