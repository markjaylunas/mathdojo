const Text: React.FC<React.HTMLProps<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-4 text-gray-600 dark:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
