"use client";

import React from 'react';
import { ControlPanel } from './control-panel';

interface PreviewPaneProps {
  styles: ControlPanel['styles'];
}

export const PreviewPane = ({ styles }: PreviewPaneProps) => {
  return (
    <div className="h-full overflow-auto bg-muted/30 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <style jsx>{`
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
            background: ${styles.progressBackground};
            box-shadow: ${styles.progressBoxShadow};
            height: ${styles.progressHeight};
            line-height: ${styles.progressLineHeight};
            position: ${styles.progressPosition};
            width: ${styles.progressWidth}
          }

          .DonateGoal_progress__done {
            background: ${styles.doneBackground};
            border-right: ${styles.doneBorderRight};
            height: ${styles.doneHeight};
            left: ${styles.doneLeft};
            position: ${styles.donePosition};
            top: ${styles.doneTop};
            transition: ${styles.doneTransition};
            width: ${styles.doneWidth};
          }

          .DonateGoal_progress__text {
            position: ${styles.textPosition}
          }

          .DonateGoal_style__goal {
            color: ${styles.goalColor};
            font-size: ${styles.goalFontSize};
            text-align: ${styles.goalTextAlign};
            text-shadow: ${styles.goalTextShadow}
          }

          .DonateGoal_style__name {
            margin-bottom: ${styles.nameMarginBottom}
          }

          .DonateGoal_style__legend {
            display: ${styles.legendDisplay};
            flex-direction: ${styles.legendFlexDirection}
          }

          .DonateGoal_style__deadline,
          .DonateGoal_style__end,
          .DonateGoal_style__start {
            flex: ${styles.legendItemFlex}
          }

          .DonateGoal_style__start {
            text-align: ${styles.startTextAlign}
          }

          .DonateGoal_style__end {
            text-align: ${styles.endTextAlign}
          }

          .DonateGoal_style__deadline {
            text-align: ${styles.deadlineTextAlign}
          }
        `}</style>

        {/* Sample HTML Elements */}
        <div className="DonateGoal_style__goal">
          <div className="DonateGoal_progress__progress">
            <div className="DonateGoal_progress__done"></div>
            <div className="DonateGoal_progress__text">฿30 (30%)</div>
          </div>
          <div className="DonateGoal_style__legend">
            <div className="DonateGoal_style__start">฿0</div>
            <div className="DonateGoal_style__end">฿100</div>
          </div>
        </div>
      </div>
    </div>
  );
};