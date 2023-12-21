"use client";

import Forms from '@/components/shared/forms'
import Header from '@/components/shared/header'
import PostItem from '@/components/shared/post-item';
import usePosts from '@/hooks/usePosts';
import { IPost } from '@/types';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const { data: session, status }: any = useSession();  
  const { data, isLoading } = usePosts();
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);
  
  return (
    <>
      <Header label="Home"  />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Forms
            placeholder="What's on your mind?"
            setPosts={setPosts}
            user={JSON.parse(JSON.stringify(session.currentuser))}
          />
          {posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              user={JSON.parse(JSON.stringify(session.currentuser))}
              setPosts={setPosts}
            />
          ))}
        </>
      )}
    </>
  )
}
