const Heading: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={`scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Heading;
