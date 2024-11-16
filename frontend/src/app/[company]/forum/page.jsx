'use client';

import CreatePost from "./CreatePost";
import PostFeed from "./PostFeed";

export default function Page() {
  return (
    <div className="flex p-8 pt-0 gap-3">
      <div className="basis-4/12">
        <CreatePost />
      </div>
      <div className="basis-8/12">
        <PostFeed />
      </div>
    </div>
  );
}