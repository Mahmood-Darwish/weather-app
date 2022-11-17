import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex-row">
        <article className="cell">
          <h3>Welcome!</h3>
          <p>
            Welcome to Weather_app. Your destination for all things
            weather related. Use this website to get news about the
            weather in all the cities you're intrested in. It's as
            simple as creating an account and adding the cities to
            your cities page. That's it! 
          </p>
        </article>
        <div className="cell space">
          <div className="filler"></div>
          <article>
            <h3>Usage</h3>
            <p>
              After you login you'll get access to your "My Cities" page.
              Go there and add cities to be monitored. The website will fetch
              your data and then show you all the relevent inforamtion about
              your selected cities. You'll also get a figure to show you the
              temperature in all the cities you're monitoring, sorted by latitude.
              This will help you see the temperature increase as you get closer to
              the equator!
            </p>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}
