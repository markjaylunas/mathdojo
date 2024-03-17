const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[520px] mt-4">{children}</div>
    </div>
  );
};

export default layout;
