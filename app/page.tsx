import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PersonalDetails } from "@/components/PersonalDetails";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Notes } from "@/components/Notes";
import { Achievements } from "@/components/Achievements";
//import { Hobbies } from "@/components/Hobbies";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="about" className="container-page grid grid-cols-1 gap-12 pb-20 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <About />
          <PersonalDetails />
        </section>

        <section className="container-page grid grid-cols-1 gap-12 pb-20 sm:pb-24 lg:grid-cols-2 lg:gap-16">
          <Education />
          <Skills />
        </section>

        <section className="container-page pb-20 sm:pb-24">
        </section>

        <Projects />
        <Notes />
        <Achievements />
      </main>
      <Footer />
    </>
  );
}