import React from "react";
import Row from "../components/Row";
import requests from "../requests";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>

      <Nav />
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={"toprated"} isLargeRow />
      <Row title="Comedy" fetchUrl={"comedy"} isLargeRow />
      <Row title="Horror Movies" fetchUrl={"horror"} isLargeRow />
      <Row title="Romantic Touch" fetchUrl={"romance"} isLargeRow/>
      <Row title="Thriller" fetchUrl={"thriller"}isLargeRow />
      <Row title="Drama" fetchUrl={"drama"} isLargeRow/>
      <Row title="Mystery" fetchUrl={"mystery"} isLargeRow/>
      <Footer />
      
    </div>
  );
}

export default Home;
