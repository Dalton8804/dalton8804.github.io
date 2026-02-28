"use client";

import PageShell from "@/components/PageShell";
import { useFishPlay } from "@/components/FishBase";

export default function FishPage() {
    const { setPlaying } = useFishPlay();

    return (
        <PageShell title="fish">
            <p>fish are procedurally animated on html canvas</p>
            <p>
                source found{" "}
                <a href="https://github.com/Dalton8804/dalton8804.github.io/tree/v2" target="_blank" rel="noopener noreferrer">
                    here
                </a>
            </p>
            <p>
                inspiration from{" "}
                <a href="https://www.youtube.com/@argonautcode" target="_blank" rel="noopener noreferrer">
                    argonaut
                </a>
            </p>
            <p
                style={{ textDecoration: "underline", cursor: "pointer", marginTop: "1.5rem" }}
                onClick={() => setPlaying(true)}
            >
                play with fish
            </p>
        </PageShell>
    );
}
