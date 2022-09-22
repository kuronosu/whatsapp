
type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyContainer({title, subtitle}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
      <h1 className="text-2xl font-bold text-zinc-300">{title}</h1>
      <p className="text-zinc-300">{subtitle}</p>
    </div>
  );
}
