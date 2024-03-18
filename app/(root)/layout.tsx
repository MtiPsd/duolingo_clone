type Props = {
  children: React.ReactNode;
};

function MarketingLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1">
        {children}
      </main>
    </div>
  );
}

export default MarketingLayout;
