const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="mt-4 max-w-[520px]">{children}</div>
    </div>
  );
};

export default layout;
