import React from "react";

function Contact() {
  return (
    <section>
      <h1 className="text-center">Kontakt oss</h1>
      <br />
      <form className="grid max-w-[620px] mx-auto">
        <input type="text" id="name" placeholder="Navn" required />
        <input type="email" id="email" placeholder="E-post" required />
        <input type="tlf" id="email" placeholder="Telefon" />
        <textarea
          id="message"
          placeholder="Melding"
          className="h-48"
          required
        />
        <div className="flex justify-center">
          <button type="submit" className="btn1">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
