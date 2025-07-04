import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import "@/app/styles/global.scss"
import { Footer } from "@/components/Footer";



export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white min-h-screen og_body">
<svg width="0" height="0" style={{ position: "absolute" }}>
  <clipPath id="shape" clipPathUnits="objectBoundingBox"><path d="M0.359,1 c-0.225,-0.019,-0.337,-0.155,-0.355,-0.428 c-0.008,-0.118,0.004,-0.237,0.031,-0.322 c0.047,-0.144,0.134,-0.218,0.288,-0.244 c0.037,-0.006,0.319,-0.006,0.357,0 c0.133,0.022,0.215,0.08,0.267,0.19 c0.042,0.089,0.062,0.226,0.053,0.374 c-0.014,0.229,-0.095,0.362,-0.25,0.41 c-0.059,0.018,-0.076,0.02,-0.232,0.021 c-0.079,0,-0.15,0,-0.158,-0.001"></path></clipPath>
</svg>
      <Header />
      {children}

      <Footer></Footer>
      <SanityLive />
      {draftMode().isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </section>
  );
}