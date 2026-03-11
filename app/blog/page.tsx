import PageShell from "@/components/PageShell";
import Link from "next/link";

// Add blog posts here. Each entry becomes a page at /blog/{year}/{slug}
export const blogPosts = [
    {
        year: "2025",
        slug: "hello-world",
        title: "Hello World",
        date: "2026-02-27",
        summary: "Hello world - my first blog post",
        content: (
            <>
                <p>
                    Please go play with the <Link href={`/fish`}>fish</Link>, they get lonely.
                </p>
            </>
        ),
    },
];

export default function Blog() {
    // Group posts by year, sorted descending
    const postsByYear: Record<string, typeof blogPosts> = {};
    blogPosts.forEach((post) => {
        if (!postsByYear[post.year]) postsByYear[post.year] = [];
        postsByYear[post.year].push(post);
    });
    const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

    return (
        <PageShell title="blog">
            <blockquote><Link href="/blog/blogroll">blogs I am reading &gt;</Link></blockquote>
            {years.length === 0 ? (
                <blockquote>first post coming soon</blockquote>
            ) : (
                years.map((year) => (
                    <div key={year}>
                        <h2>{year}</h2>
                        {postsByYear[year].map((post) => (
                            <div key={post.slug} style={{ marginBottom: "1rem" }}>
                                <h3>
                                    <Link href={`/blog/${post.year}/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p style={{ opacity: 0.6, fontSize: "0.8rem", margin: "0.25rem 0" }}>
                                    {post.date}
                                </p>
                                {post.summary && <p>{post.summary}</p>}
                            </div>
                        ))}
                    </div>
                ))
            )}
        </PageShell>
    );
}
