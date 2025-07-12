import React from "react";
import "./style.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  XOutlined,
  DiscordOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <div className="footer-content-left-text">
              <img src="favicon.png" height={100} width={100} />
            </div>
          </div>
          <div className="footer-content-center">
            <div className="footer-content-center-text">
              <p>Copyright © 2025 Student Management System</p>
            </div>
          </div>
          <div className="footer-content-right">
            <div className="footer-content-right-text">
              <p>Follow us on</p>
              <div className="footer-content-right-text-icons">
                <div
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <a href="https://www.facebook.com/uzair.ahmed.100483" target="_blank">
                  <FacebookOutlined style={{ color: "blue" }} />
                  </a>
                </div>

                <div
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <a href="https://www.instagram.com/uzair_raees_ahmed/" target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined style={{ color: "red" }} />
                  </a>
                </div>

                <div
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <a href="https://x.com/UzairRaeesAhmed" target="_blank" rel="noopener noreferrer">
                  <XOutlined style={{ color: "black" }} />
                  </a>
                </div>

                <div
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <a href="https://discord.com/channels/@me" target="_blank" rel="noopener noreferrer">
                  <DiscordOutlined style={{ color: "#7299ee" }} />
                  </a>
                </div>

                <div
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  <a href="https://github.com/UzairAhmed250" target="_blank" rel="noopener noreferrer">
                  <GithubOutlined
                    style={{ fontSize: "24px", color: "black" }}
                    />
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
