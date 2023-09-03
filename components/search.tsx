'use client';

import { ChangeEvent, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Search({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (e.target.value) {
      searchParams.set('title', e.target.value);
    } else {
      searchParams.delete('title');
    }

    searchParams.delete('page');

    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`);
    });
  };

  return (
    <div className="flex gap-x-4 px-12">
      <input
        type="text"
        className="border border-black rounded px-2 flex-1"
        onChange={onChange}
        placeholder="Search by title"
        defaultValue={defaultValue}
      />
      {isPending && <div className={'animate-spin'}>🔄</div>}
    </div>
  );
}
//
