import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex-row">
        <article className="cell">
          <h2></h2>
          <p>
            The HyperText Markup Language or HTML is the standard markup
            language for documents designed to be displayed in a web browser. It
            can be assisted by technologies such as Cascading Style Sheets and
            scripting languages such as JavaScript.
          </p>
        </article>
        <div className="cell space">
          <div className="filler"></div>
          <article>
            <h2></h2>
            <p>
              The HyperText Markup Language or HTML is the standard markup
              language for documents designed to be displayed in a web browser.
              It can be assisted by technologies such as Cascading Style Sheets
              and scripting languages such as JavaScript.
            </p>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}
