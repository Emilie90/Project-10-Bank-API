import React from "react";
import Feature from "./Feature";
import iconChat from "../img/icon-chat.png";
import iconMoney from "../img/icon-money.png";
import iconSecurity from "../img/icon-security.png";
import "../css/main.css";

const Features: React.FC = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        imgSrc={iconChat}
        imgAlt="Chat Icon"
        title="You are our #1 priority"
      >
        Need to talk to a representative? You can get in touch through our 24/7
        chat or through a phone call in less than 5 minutes.
      </Feature>
      <Feature
        imgSrc={iconMoney}
        imgAlt="Money Icon"
        title="More savings means higher rates"
      >
        The more you save with us, the higher your interest rate will be!
      </Feature>
      <Feature
        imgSrc={iconSecurity}
        imgAlt="Security Icon"
        title="Security you can trust"
      >
        We use top of the line encryption to make sure your data and money is
        always safe.
      </Feature>
    </section>
  );
};

export default Features;
