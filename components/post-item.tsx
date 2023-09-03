import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types";

export default function Post({ title, slug, imageUrl }: Post) {
  return (
    <Link
      href={`/${slug}`}
      className="bg-white/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition ease-in-out delay-150 duration-200 aspect-4/5"
    >
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        className="w-full h-auto"
      />
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
}
