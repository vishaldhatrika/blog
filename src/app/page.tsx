import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import PostCard from "@/components/post-card";

async function getPosts(): Promise<Post[]> {
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id))
  );
  return allPosts.filter((post): post is Post => post !== null);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <div className="max-w-2xl mx-auto text-center mb-12">
        {/* <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Canvas and Console
        </h1> */}
        <p className="text-lg mt-12 text-muted-foreground">
          My blog at the intersection of art and tech
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
