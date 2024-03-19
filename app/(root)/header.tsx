import Image from "next/image";

export function Header() {
  return (
    <header className="w-full h-20 px-4 border-b-2 border-slate-200">
      <div className="flex items-center justify-between h-full mx-auto lg:max-w-screen-lg">
        <div className="flex items-center pt-8 pl-7 pb-7 gap-x-3">
          <Image
            src="/mascot.svg"
            height={40}
            width={40}
            alt="Mascot"
          />
          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            Lingo
          </h1>
        </div>
      </div>
    </header>
  );
}
