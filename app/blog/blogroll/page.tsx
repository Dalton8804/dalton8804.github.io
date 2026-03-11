import PageShell from "@/components/PageShell";
import Link from "next/link";

export default function BlogRoll() {
    return (
        <PageShell title="blogroll">
            <h4><Link href="/blog">&lt; back to blog</Link></h4>

            <h3><Link href="https://notes.eatonphil.com/">Phil Eaton</Link></h3>
            <h3><Link href="https://www.seangoedecke.com/">Sean Goedecke</Link></h3>
            <h3><Link href="https://austinhenley.com/blog.html">Austin Henley</Link></h3>
            <h3><Link href="https://alexwennerberg.com/index.html">Alex Wennerberg</Link></h3>
            <h3><Link href="https://lethain.com/">Will Larson</Link></h3>
            <h3><Link href="https://luminousmen.com/">Kirill Bobrov</Link></h3>
            <h3><Link href="https://lalitm.com/">Lalit Maganti</Link></h3>
            <h3><Link href="https://addyosmani.com/blog/">Addy Osmani</Link></h3>
            <h3><Link href="https://taylor.town/">Taylor Troesh</Link></h3>
            <h3><Link href="https://kevinlynagh.com/">Kevin Lynagh</Link></h3>
            <h3><Link href="https://www.scattered-thoughts.net/">Jamie Brandon</Link></h3>

            <br />
            <br />
            <h3><Link href="https://increment.com/">Increment - Stripe</Link></h3>
            <h3><Link href="https://www.theengineeringmanager.com/">The Engineering Manager - James Stanier</Link></h3>
            <h3><Link href="https://writethat.blog/">Write That Blog</Link></h3>
        </PageShell>
    );
}
