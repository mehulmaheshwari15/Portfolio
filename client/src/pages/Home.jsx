import Home from "../components/Home";
import About from "../components/About";
import EducationExperience from "../components/EducationExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";

export default function HomePage() {
  return (
    <>
      <Home />
      <About />
      <EducationExperience />
      <Skills />
      <Projects />
      <ContactForm />
    </>
  );
}