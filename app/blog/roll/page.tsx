import PageShell from "@/components/PageShell";
import Link from "next/link";

export default function BlogRoll() {
    return (
        <PageShell title="blogroll">
            <h4><Link href="/blog">&lt; back to blog</Link></h4>

            <h3><Link href="https://notes.eatonphil.com/" target="_blank">Phil Eaton</Link></h3>
            <h3><Link href="https://www.seangoedecke.com/" target="_blank">Sean Goedecke</Link></h3>
            <h3><Link href="https://austinhenley.com/blog.html" target="_blank">Austin Henley</Link></h3>
            <h3><Link href="https://alexwennerberg.com/index.html" target="_blank">Alex Wennerberg</Link></h3>
            <h3><Link href="https://lethain.com/" target="_blank">Will Larson</Link></h3>
            <h3><Link href="https://luminousmen.com/" target="_blank">Kirill Bobrov</Link></h3>
            <h3><Link href="https://lalitm.com/" target="_blank">Lalit Maganti</Link></h3>
            <h3><Link href="https://addyosmani.com/blog/" target="_blank">Addy Osmani</Link></h3>
            <h3><Link href="https://taylor.town/" target="_blank">Taylor Troesh</Link></h3>
            <h3><Link href="https://kevinlynagh.com/" target="_blank">Kevin Lynagh</Link></h3>
            <h3><Link href="https://www.scattered-thoughts.net/" target="_blank">Jamie Brandon</Link></h3>

            <br />
            <br />
            <h3><Link href="https://increment.com/" target="_blank">Increment - Stripe</Link></h3>
            <h3><Link href="https://www.theengineeringmanager.com/" target="_blank">The Engineering Manager - James Stanier</Link></h3>
            <h3><Link href="https://writethat.blog/" target="_blank">Write That Blog</Link></h3>
        </PageShell>
    );
}
