import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="my-5 flex h-full w-full items-center justify-center">
    <Link href={"/todos"} className=" outline-1 outline rounded-md px-2 bg-slate-400 py-1 text-gray-100 shadow-md hover:bg-slate-500 hover:text-white">Go to Todos</Link>
    </div>
    </>
  );
}
