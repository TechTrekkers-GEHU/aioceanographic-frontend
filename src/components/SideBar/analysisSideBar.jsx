import React from "react";
import "./oceansidebar.css";
import { BiSolidThermometer } from "react-icons/bi";
import { GiFishEggs, GiDna2 } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { TbMapPin } from "react-icons/tb";
import { FaFish, FaGlobe, FaMapMarkedAlt } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";


const OceanSidebar = ({ activeItem, onSelect }) => {
  

  return (
    <div className="ocean-sidebar open">
      <div>
        <div className="section">
          <h3 className="section-title">
            <LuActivity /> Correlational Analysis
          </h3>
          <ul>
            <li>
              <button
                className={activeItem === "multivarentCrossDomain" ? "active" : ""}
                onClick={() => onSelect("multivarentCrossDomain")}
              >
                <div className="item-title">
                  <span className="icon-box"><BiSolidThermometer /></span>
                  Multivarent Cross Domain
                </div>
                <div className="item-description">CCA, RDA etc</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OceanSidebar;