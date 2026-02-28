import { notFound } from "next/navigation";
import { blogPosts } from "../../page";
import PageShell from "@/components/PageShell";
import Link from "next/link";

export default async function BlogPost({
    params,
}: {
    params: Promise<{ year: string; slug: string }>;
}) {
    const { year, slug } = await params;
    const post = blogPosts.find((p) => p.year === year && p.slug === slug);

    if (!post) return notFound();

    return (
        <PageShell title={post.title}>
            <p style={{ opacity: 0.6, fontSize: "0.8rem" }}>{post.date}</p>
            <div>{post.content}</div>
            <p style={{ marginTop: "2rem" }}>
                <Link href="/blog">← back to blog</Link>
            </p>
        </PageShell>
    );
}
