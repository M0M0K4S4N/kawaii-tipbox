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
.progress {
  background: linear-gradient(180deg, #aaa, #888);
}

.progress {
  box-shadow: 0 0 10px #000;
}

.progress {
  height: 42px;
}

.progress {
  line-height: 42px;
}

.progress {
  position: relative;
}

.progress {
  width: 100%;
}

.done {
  background: linear-gradient(180deg, #71e251, #509e39);
}

.done {
  border-right: 2px solid #444;
}

.done {
  height: 42px;
}

.done {
  left: 0;
}

.done {
  position: absolute;
}

.done {
  top: 0;
}

.done {
  width: 30%;
}

/* For preview */
.done {
  width: 30%;
}

.text {
  position: relative;
}

.goal {
  color: #fff;
}

.goal {
  font-size: 14pt;
}

.goal {
  text-align: center;
}

.goal {
  text-shadow: #000 0 0 20px;
}

.name {
  margin-bottom: 10px;
}

.legend {
  display: flex;
}

.legend {
  flex-direction: row;
}

.deadline {
  flex: 1;
}

.end {
  flex: 1;
}

.start {
  flex: 1;
}

.start {
  text-align: left;
}

.end {
  text-align: right;
}

.deadline {
  text-align: center;
}

        `}</style>

        {/* Custom style */}
        <style>{`
          ${cssText}
        `}</style>

        {/* Sample HTML Elements */}
        <div className="goal">
          <div className="name">Tip box</div>
          <div className="progress">
            <div className="done"></div>
            <div className="text">฿30 (30%)</div>
          </div>
          <div className="legend">
            <div className="start">฿0</div>
            <div className="deadline"><time>4 สัปดาห์</time></div>
            <div className="end">฿100</div>
          </div>
        </div>
      </div>
    </div>
  );
};