const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center px-8">
      <div className="mt-4 max-w-[520px] md:mt-8">{children}</div>
    </div>
  );
};

export default layout;
