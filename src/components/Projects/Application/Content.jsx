import React, { useState } from "react";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaLaravel,
  FaNodeJs,
  FaBootstrap,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNuxtdotjs,
  SiNestjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiSpring,
  SiFastapi,
  SiSvelte,
  SiRemix,
  SiRubyonrails,
  SiMeteor,
  SiQuasar,
  SiDotnet,
  SiAdonisjs,
  SiEmberdotjs,
  SiRedux,
  SiTailwindcss,
  SiStyledcomponents,
} from "react-icons/si";
import { FloatingBoxApp } from "../../FloatingBox";

const frameworks = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Vue.js", icon: <FaVuejs /> },
  { name: "Nuxt.js", icon: <SiNuxtdotjs /> },
  { name: "Angular", icon: <FaAngular /> },
  { name: "Ember.js", icon: <SiEmberdotjs /> },

  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "NestJS", icon: <SiNestjs /> },
  { name: "AdonisJS", icon: <SiAdonisjs /> },

  { name: "Laravel", icon: <FaLaravel /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "Ruby on Rails", icon: <SiRubyonrails /> },
  { name: "Spring", icon: <SiSpring /> },
  { name: ".NET", icon: <SiDotnet /> },

  { name: "Redux", icon: <SiRedux /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Bootstrap", icon: <FaBootstrap /> },
  { name: "Styled Components", icon: <SiStyledcomponents /> },
];

export const ProjectContent = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <FloatingBoxApp setShowHeatmap={setShowHeatmap}>
      <div className="d-flex flex-column gap-1 overflow-auto mh-100 p-1 text-white">
        {frameworks.map((fw) => (
          <div key={fw.name}>
            <div className="d-flex align-items-center bg-dark bg-opacity-50 gap-1 p-1 rounded hover-shadow">
              <span className="fs-5 d-flex align-items-center">{fw.icon}</span>
              <span className="" style={{ fontSize: "9px" }}>
                {fw.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </FloatingBoxApp>
  );
};
