import React from "react";

export default function Login(props) {
    return (
        <div>
            <div className="component">
                <div className="cn-wrapper opened-nav" id="cn-wrapper">
                    <ul id="keys" className="major">
                        <li className="key"><span><button>F</button><button>Dm</button></span></li>
                        <li className="key active"><span><button>C</button><button>Am</button></span></li>
                        <li className="key"><span><button>G</button><button>Em</button></span></li>
                        <li className="key"><span><button>D</button><button>Bm</button></span></li>
                        <li className="key"><span><button>A</button><button>F#m</button></span></li>
                        <li className="key"><span><button>E</button><button>C#m</button></span></li>
                        <li className="key"><span><button>B</button><button>G#m</button></span></li>
                        <li className="key sharp"><span><button>F</button><button>Ebm</button></span></li>
                        <li className="key flat"><span><button>D</button><button>Bbm</button></span></li>
                        <li className="key flat"><span><button>A</button><button>Fm</button></span></li>
                        <li className="key flat"><span><button>E</button><button>Cm</button></span></li>
                        <li className="key flat"><span><button>B</button><button>Gm</button></span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}