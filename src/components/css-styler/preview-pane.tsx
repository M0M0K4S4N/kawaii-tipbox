"use client";

import React, { useState } from 'react';
import { TemplateSelector, Template } from './template-selector';
import { templates } from './template-data';
import { CSSClassOverlay } from './css-class-overlay';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';

export const PreviewPane = ({
  cssText,
  onTemplateSelect,
  isDarkMode,
  onToggleDarkMode
}: {
  cssText: string;
  onTemplateSelect?: (template: Template) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}) => {
  const [isCSSClassOverlayEnabled, setIsCSSClassOverlayEnabled] = React.useState(false);

  return (
    <div className={`h-full overflow-auto p-8 relative`} style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <Sun className="h-4 w-4" color={isDarkMode ? '#fff' : '#000'} />
        <Switch
          checked={isDarkMode}
          onCheckedChange={onToggleDarkMode}
        />
        <Moon className="h-4 w-4" color={isDarkMode ? '#fff' : '#000'} />
      </div>

      {/* CSS Class Overlay Toggle */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <Label style={{ color: isDarkMode ? '#fff' : '#000' }}>เปิดตัวช่วยดู Class</Label>
        <Switch
          checked={isCSSClassOverlayEnabled}
          onCheckedChange={setIsCSSClassOverlayEnabled}
        />
      </div>

      {/* CSS Class Overlay */}
      <CSSClassOverlay
        enabled={isCSSClassOverlayEnabled}
      />

      <div className={`max-w-4xl mx-auto space-y-6`}>
        <style>{`
          .manager_style__error {
            background-color: #a8262699;
            color: #fff;
            font-size: 16pt;
            left: 10px;
            padding: 15px;
            position: absolute;
            text-overflow: ellipsis;
            top: 10px;
            white-space: nowrap
          }

          .manager_style__autohide {
            animation: manager_style__hide 1ms 60s
          }

          @keyframes manager_style__hide {
            0% {
              opacity: 1
            }

            to {
              opacity: 0
            }
          }

          .DonateGoal_progress__progress {
            background: linear-gradient(180deg, #aaa, #888);
            box-shadow: 0 0 10px #000;
            height: 42px;
            line-height: 42px;
            position: relative;
            width: 100%
          }

          .DonateGoal_progress__done {
            background: linear-gradient(180deg, #71e251, #509e39);
            border-right: 2px solid #444;
            height: 42px;
            left: 0;
            position: absolute;
            top: 0;
            transition: width 1s ease-out;
            width: 30%;
          }

          .DonateGoal_progress__text {
            position: relative
          }

          .DonateGoal_style__goal {
            color: #fff;
            font-size: 14pt;
            text-align: center;
            text-shadow: #000 0 0 20px
          }

          .DonateGoal_style__name {
            margin-bottom: 10px
          }

          .DonateGoal_style__legend {
            display: flex;
            flex-direction: row
          }

          .DonateGoal_style__deadline,
          .DonateGoal_style__end,
          .DonateGoal_style__start {
            flex: 1
          }

          .DonateGoal_style__start {
            text-align: left
          }

          .DonateGoal_style__end {
            text-align: right
          }

          .DonateGoal_style__deadline {
            text-align: center
          }

          /* For preview */
          .DonateGoal_progress__done {
            width: 30%;
          }
        `}</style>

        {/* Custom style */}
        {/* <style jsx>{`
          .DonateGoal_progress__progress {
            background: linear-gradient(180deg, #aaaaaa, #888888);
            border-radius: 25px;
            border: 1px solid rgb(252, 140, 140);
          }

          .DonateGoal_progress__done {
            background: linear-gradient(180deg, #71e251, #509e39);
            border-right: 2px solid #444444;
            border-radius: 25px;
            height: 100%;
          }

          .DonateGoal_progress__text {
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
        `}</style> */}

        <style>{`
          ${cssText}
        `}</style>

        {/* Sample HTML Elements */}
        <div className="DonateGoal_style__goal" data-overlay-desc="กรอบด้านนอกสุด">
          <div className="DonateGoal_style__name" data-overlay-desc="กรอบหัวข้อ">Tip box</div>
          <div className="DonateGoal_progress__progress" data-overlay-desc="หลอดพื้นหลัง">
            <div className="DonateGoal_progress__done" data-overlay-desc="หลอดความคืบหน้า"></div>
            <div className="DonateGoal_progress__text" data-overlay-desc="ข้อความจำนวนเงินและเปอร์เซ็น">฿30 (30%)</div>
          </div>
          <div className="DonateGoal_style__legend" data-overlay-desc="กรอบข้อความด้านล่าง คลุมทั้งหมด">
            <div className="DonateGoal_style__start" data-overlay-desc="กรอบจำนวนเงินเริ่มต้น">฿0</div>
            <div className="DonateGoal_style__deadline" data-overlay-desc="กรอบระยะเวลา"><time>4 สัปดาห์</time></div>
            <div className="DonateGoal_style__end" data-overlay-desc="กรอบจำนวนเงินเป้าหมาย">฿100</div>
          </div>
        </div>

        {/* Template Selector */}
        {onTemplateSelect && (
          <TemplateSelector
            templates={templates}
            onTemplateSelect={onTemplateSelect}
          />
        )}
      </div>
    </div>
  );
};