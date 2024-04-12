import Head from "next/head";
import HeroSection from "~/components/landing-page/HeroSection";
import Header from "~/components/Header";

export default function Home() {
    return (
        <>
            <Head>
                <title>EventSync</title>
                <meta name="description" content="Landing Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header></Header>
                <HeroSection></HeroSection>
            </main>
        </>
    );
}
