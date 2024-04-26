export default function EmptyList({
  message = "Empty List",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-slate-300 dark:text-gray-700 ">message</p>
    </div>
  );
}
