import React from "react";
import GoToButton from "../../components/layout/GoToButton";

const PUBLIC_URL = "to be changed with url of ld-reactor microservice";

export default function Navbar({}) {
    return (
        <div>
            <div id="navbar" className="ui fluid container">
                <nav
                    className={"ui menu inverted grid"}
                    style={{
                        backgroundColor: "rgba(0,0,0,.87)",
                    }}
                >
                    <a
                        className="brand item"
                        href={
                            process.env.HOME_ROUTE ||
                            `put here ld-reactor microservice link`
                        }
                    >
                        <GoToButton
                            style={{
                                // position: "absolute",
                                // top: 0,
                                // left: 0,
                                background: "#6c7ae0",
                            }}
                        />
                        {/* <img
                            style={{ height: 22, width: 22 }}
                            className="ui mini image"
                            src={process.env.APP_FAVICON || `Set a favicon url`}
                            alt="ld-reactor"
                        /> */}
                    </a>
                    <a className="item" href={`${PUBLIC_URL}/about`}>
                        About {process.env.APP_NAME || "set an APP name in env"}{" "}
                    </a>
                    <a className="item" href={`${PUBLIC_URL}/datasets`}>
                        Knowledge Graphs
                    </a>
                    <div className="right menu">
                        {/* <div
                            className="item link"
                            onClick={this.showHelpModal}
                        >
                            <i className="small help circle icon"></i>
                        </div> */}
                        <a
                            href="https://github.com/Christian-Nja/odp-reactor"
                            className="ui item link"
                        >
                            <i className="github circle icon"></i> Github
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}
