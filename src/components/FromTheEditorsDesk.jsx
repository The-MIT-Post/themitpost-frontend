// components/FromTheEditorsDesk.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RotatingCircle from "./RotatingCircle";
import BackButton from "./BackButton";
import "./FromTheEditorsDesk.css";

const FromTheEditorsDesk = () => {
  return (
    <>
      <RotatingCircle />
      <Navbar />

      <div className="app-container editors-desk-container">
        <h2>From the Editors Desk</h2>
        <article>
          <p>
            In our daily lives, we often speak of equality and the importance of
            free will, yet rarely do we see something out of the ordinary,
            people trying to be different or accepting their sense of
            individuality. What is holding them back? Is it the fear of standing
            out, or is it the fear of being strange in the eyes of the masses?
            Since medieval times, humans have always found comfort in numbers,
            and the fear of being alone and away from the herd has likely
            influenced our conformity.
          </p>
          <img src="/from-the-editors-desk/image3.webp" alt="image3" />
          <p>
            Like parrots, we learn the ability to speak but rarely have a voice
            of our own. We accept things as they are without question and parrot
            them back, spreading misinformation and chaos. In the past, when the
            word of the ruler was final, this lack of assertiveness was
            survival; however, now, knowing the changing times of democracy and
            free will, the intrinsic ability to choose and voice our opinions is
            what holds society together and accountable.
          </p>
          <img src="/from-the-editors-desk/image1.webp" alt="image1" />
          <p>
            Like iguanas, we blend into our surroundings to protect our true
            selves from the harsh and judgmental eyes of society. Escaping this
            moment of embarrassment eases us into a false sense of security, yet
            it ultimately curtails our freedom.
          </p>
          <img src="/from-the-editors-desk/image2.webp" alt="image2" />
          <p>
            People are creatures of habit, so used to things that they seldom
            want to change. In this society, to break from the pattern is to be
            like an owl awake in the solitary shadows of the night, avoiding the
            gaze of the masses. Throughout history, all major changes and breaks
            from the “normal”, whether the discovery of fire or the rise of AI,
            were perceived with deep hesitation and apprehension. But in the
            current age, unless we become the change and discard the norm, we
            will be unwitting passengers as our lives are steered in a direction
            away from our desired destinations.
          </p>
          <p>
            Passions, goals, and the power to decide for oneself are what set us
            apart from primitive beings. Unless we embrace our individuality, we
            will always be caged, with freedom bound by our choices yet
            endlessly longing to fly.
          </p>
        </article>
      </div>
      <BackButton />
      <Footer />
    </>
  );
};

export default FromTheEditorsDesk;
