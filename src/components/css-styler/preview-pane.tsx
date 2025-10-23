"use client";

import React from 'react';
import { ControlPanel } from './control-panel';


export const PreviewPane = ({ cssText }: {
  cssText: string
}) => {
  return (
    <div className="h-full overflow-auto bg-muted p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <style>{`
.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #aaa, #888);
}

.DonateGoal_progress__progress {
  box-shadow: 0 0 10px #000;
}

.DonateGoal_progress__progress {
  height: 42px;
}

.DonateGoal_progress__progress {
  line-height: 42px;
}

.DonateGoal_progress__progress {
  position: relative;
}

.DonateGoal_progress__progress {
  width: 100%;
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #71e251, #509e39);
}

.DonateGoal_progress__done {
  border-right: 2px solid #444;
}

.DonateGoal_progress__done {
  height: 42px;
}

.DonateGoal_progress__done {
  left: 0;
}

.DonateGoal_progress__done {
  position: absolute;
}

.DonateGoal_progress__done {
  top: 0;
}

.DonateGoal_progress__done {
  width: 30%;
}

/* For preview */
.DonateGoal_progress__done {
  width: 30%;
}

.text {
  position: relative;
}

.DonateGoal_style__goal {
  color: #fff;
}

.DonateGoal_style__goal {
  font-size: 14pt;
}

.DonateGoal_style__goal {
  text-align: center;
}

.DonateGoal_style__goal {
  text-shadow: #000 0 0 20px;
}

.DonateGoal_style__name {
  margin-bottom: 10px;
}

.DonateGoal_style__legend {
  display: flex;
}

.DonateGoal_style__legend {
  flex-direction: row;
}

.DonateGoal_style__deadline {
  flex: 1;
}

.DonateGoal_style__end {
  flex: 1;
}

.DonateGoal_style__start {
  flex: 1;
}

.DonateGoal_style__start {
  text-align: left;
}

.DonateGoal_style__end {
  text-align: right;
}

.DonateGoal_style__deadline {
  text-align: center;
}
        `}</style>

        <style>{`
          ${cssText}
        `}</style>

        {/* Sample HTML Elements */}
        <div className="DonateGoal_style__goal">
          <div className="DonateGoal_style__name">Tip box</div>
          <div className="DonateGoal_progress__progress">
            <div className="DonateGoal_progress__done"></div>
            <div className="DonateGoal_progress__text">฿30 (30%)</div>
          </div>
          <div className="DonateGoal_style__legend">
            <div className="DonateGoal_style__start">฿0</div>
            <div className="DonateGoal_style__deadline"><time>4 สัปดาห์</time></div>
            <div className="DonateGoal_style__end">฿100</div>
          </div>
        </div>
      </div>
    </div>
  );
};