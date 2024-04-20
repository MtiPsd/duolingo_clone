type Props = {
  title: string;
  description: string;
};

function UnitBanner({ description, title }: Props) {
  return (
    <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UnitBanner;
