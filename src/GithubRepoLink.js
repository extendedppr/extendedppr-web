import React from "react";

const GithubRepoLink = ({
  repoUrl,
  position = "absolute",
  top = 0,
  right = 0,
}) => {
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "1%",
        right: "100px",
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: 1000,
      }}
    >
      <img
        src="https://github.githubassets.com/favicons/favicon.svg"
        alt="GitHub Logo"
        style={{ width: "24px", height: "24px", marginRight: "8px" }}
      />
      Github Repo
    </a>
  );
};

export default GithubRepoLink;
