import PageShell from "@/components/PageShell";
import Link from "next/link";

// Add blog posts here. Each entry becomes a page at /blog/{year}/{slug}
export const blogPosts = [
    {
        year: "2025",
        slug: "hello-world",
        title: "Hello World",
        date: "2025-01-15",
        summary: "A first blog post to kick things off.",
        content: (
            <>
                <p>
                    This is a sample blog post. When porting over posts from another site,
                    create a new entry in the <code>blogPosts</code> array in{" "}
                    <code>app/blog/page.tsx</code> with the content as JSX, or create
                    individual page files under <code>app/blog/[year]/[slug]/page.tsx</code>.
                </p>
                <p>
                    Each post lives at its own URL like <code>/blog/2025/hello-world</code>.
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
