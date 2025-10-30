import { Template } from './template-selector';

export const templates: Template[] = [
  {
    id: 'default',
    name: 'Default',
    featured: false,
    background: 'radial-gradient(circle, #71e251, #888888)',
    css: `.DonateGoal_progress__text {
  color: #ffffff;
}

.DonateGoal_style__goal {
  color: #ffffff;
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: 0px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #aaaaaa, #888888);
  border-radius: 0px;
  border: 0px solid #ffffff;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #71e251, #509e39);
  border-right: 2px solid #444444;
  border-radius: 0px;
  height: 100% !important;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}
`
  },
  {
    id: 'kawaii',
    name: 'Kawaii',
    featured: false,
    background: 'radial-gradient(circle, #ff69b4, #ffb6c1)',
    css: `.DonateGoal_progress__text {
  color: #ff69b4;
}

.DonateGoal_style__goal {
  color: #ff69b4;
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: -16px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #ffc0cb, #ffb6c1);
  border-radius: 25px;
  border: 2px solid #ff69b4;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #ff69b4, #ff1493);
  border-right: 2px solid #ff1493;
  border-radius: 25px;
  height: 100% !important;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}`
  },
  {
    id: 'neon',
    name: 'Neon',
    featured: false,
    background: 'radial-gradient(circle, #00ffff, #16213e)',
    css: `.DonateGoal_progress__text {
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff;
}

.DonateGoal_style__goal {
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff;
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: -16px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #1a1a2e, #16213e);
  border-radius: 16px;
  border: 2px solid #00ffff;
  box-shadow: 0 0 15px #00ffff;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #00ffff, #0099cc);
  border-right: 2px solid #00ffff;
  border-radius: 10px;
  height: 100% !important;
  box-shadow: 0 0 15px #00ffff;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}`
  },
  {
    id: 'nature',
    name: 'Nature',
    featured: false,
    background: 'radial-gradient(circle, #8b7355, #6b5d4f)',
    css: `.DonateGoal_progress__text {
  color: #ffffff;
}

.DonateGoal_style__goal {
  color: #ffffff;
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: -16px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #8b7355, #6b5d4f);
  border-radius: 15px;
  border: 2px solid #4a7c59;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #4a7c59, #2d5a3d);
  border-right: 2px solid #2d5a3d;
  border-radius: 15px;
  height: 100% !important;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}`
  },
  {
    id: 'ocean',
    name: 'Ocean',
    featured: false,
    background: 'radial-gradient(circle, #00bfff, #1e90ff)',
    css: `.DonateGoal_progress__text {
  color: #ffffff;
}

.DonateGoal_style__goal {
  color: #ffffff;
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: -16px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #4682b4, #1e90ff);
  border-radius: 20px;
  border: 2px solid #006994;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #00bfff, #0080ff);
  border-right: 2px solid #006994;
  border-radius: 20px;
  height: 100% !important;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}`
  },
  {
    id: 'halloween',
    name: 'Halloween',
    featured: true,
    background: 'radial-gradient(circle, #ff8c00, #ff4500)',
    css: `.DonateGoal_progress__text {
  color: #8b4513;
}

.DonateGoal_style__goal {
  color: #ff8c00;
}

.DonateGoal_progress__done::after {
  content: "🎃";
  float: right;
  margin-right: -16px;
  font-size: 38pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #ffd700, #ff8c00);
  border-radius: 20px;
  border: 2px solid #8b4513;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #ff8c00, #d73800);
  border-right: 2px solid #8b4513;
  border-radius: 20px;
  height: 100% !important;
}

/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}`
  }
];