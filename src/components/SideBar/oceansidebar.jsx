import React, { useState } from "react";
import "./oceansidebar.css";
import { BiSolidThermometer } from "react-icons/bi";
import { GiFishEggs, GiDna2 } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { TbMapPin } from "react-icons/tb";
import { FaFish, FaGlobe, FaMapMarkedAlt } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";

const OceanSidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleSelect = (id) => {
    setActiveItem(id);
  };

  return (
    <aside className={`ocean-sidebar ${isOpen ? "open" : "closed"}`}>
      {isOpen && (
        <div>
          {/* Ocean Parameters */}
          <div className="section">
            <h3 className="section-title">
              <LuActivity /> Ocean Parameters
            </h3>
            <ul>
              <li>
                <button
                  className={activeItem === "param" ? "active" : ""}
                  onClick={() => handleSelect("param")}
                >
                  <div className="item-title">
                    <span className="icon-box"><BiSolidThermometer /></span>
                    Parameter Correlations
                  </div>
                  <div className="item-description">Temperature, salinity, pH</div>
                </button>
              </li>
              <li>
                <button
                  className={activeItem === "biodiversity" ? "active" : ""}
                  onClick={() => handleSelect("biodiversity")}
                >
                  <div className="item-title">
                    <span className="icon-box"><FaFish /></span>
                    Biodiversity Impact
                  </div>
                  <div className="item-description">Species distribution analysis</div>
                </button>
              </li>
            </ul>
          </div>

          {/* Species Analysis */}
          <div className="section">
            <h3 className="section-title">
              <GiFishEggs /> Species Analysis
            </h3>
            <ul>
              <li>
                <button
                  className={activeItem === "otolith" ? "active" : ""}
                  onClick={() => handleSelect("otolith")}
                >
                  <div className="item-title">
                    <span className="icon-box"><GiFishEggs /></span>
                    Otolith Analysis
                  </div>
                  <div className="item-description">Shape & morphometrics</div>
                </button>
              </li>
              <li>
                <button
                  className={activeItem === "taxonomy" ? "active" : ""}
                  onClick={() => handleSelect("taxonomy")}
                >
                  <div className="item-title">
                    <span className="icon-box"><MdOutlineCategory /></span>
                    Taxonomic Classification
                  </div>
                  <div className="item-description">Species identification</div>
                </button>
              </li>
            </ul>
          </div>

          {/* Molecular Data */}
          <div className="section">
            <h3 className="section-title">
              <GiDna2 /> Molecular Data
            </h3>
            <ul>
              <li>
                <button
                  className={activeItem === "edna" ? "active" : ""}
                  onClick={() => handleSelect("edna")}
                >
                  <div className="item-title">
                    <span className="icon-box"><GiDna2 /></span>
                    eDNA Analysis
                  </div>
                  <div className="item-description">Sequence matching</div>
                </button>
              </li>
              <li>
                <button
                  className={activeItem === "genetic" ? "active" : ""}
                  onClick={() => handleSelect("genetic")}
                >
                  <div className="item-title">
                    <span className="icon-box"><GiDna2 /></span>
                    Genetic Markers
                  </div>
                  <div className="item-description">Population genetics</div>
                </button>
              </li>
            </ul>
          </div>

          {/* Spatial Analysis */}
          <div className="section">
            <h3 className="section-title">
              <FaMapMarkedAlt /> Spatial Analysis
            </h3>
            <ul>
              <li>
                <button
                  className={activeItem === "distribution" ? "active" : ""}
                  onClick={() => handleSelect("distribution")}
                >
                  <div className="item-title">
                    <span className="icon-box"><FaGlobe /></span>
                    Species Distribution
                  </div>
                  <div className="item-description">Geospatial mapping</div>
                </button>
              </li>
              <li>
                <button
                  className={activeItem === "hotspots" ? "active" : ""}
                  onClick={() => handleSelect("hotspots")}
                >
                  <div className="item-title">
                    <span className="icon-box"><TbMapPin /></span>
                    Biodiversity Hotspots
                  </div>
                  <div className="item-description">Conservation priority areas</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

export default OceanSidebar;
