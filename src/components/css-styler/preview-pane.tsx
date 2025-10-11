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
          .styled-element {
            /* Typography */
            font-size: ${styles.fontSize};
            font-family: ${styles.fontFamily};
            font-weight: ${styles.fontWeight};
            text-align: ${styles.textAlign};
            line-height: ${styles.lineHeight};
            letter-spacing: ${styles.letterSpacing};
            color: ${styles.textColor};

            /* Layout & Spacing */
            padding: ${styles.padding};
            margin: ${styles.margin};
            width: ${styles.width};
            height: ${styles.height};
            display: ${styles.display};
            position: ${styles.position};

            /* Appearance */
            background-color: ${styles.backgroundColor};
            border-style: ${styles.borderStyle};
            border-width: ${styles.borderWidth};
            border-color: ${styles.borderColor};
            border-radius: ${styles.borderRadius};
            box-shadow: ${styles.boxShadow};
            opacity: ${styles.opacity};
          }
        `}</style>

        {/* Sample HTML Elements */}
        <div className="space-y-6">
          {/* Heading 1 */}
          <h1 className="styled-element">Heading 1 - Sample Title</h1>

          {/* Heading 2 */}
          <h2 className="styled-element">Heading 2 - Subtitle Text</h2>

          {/* Paragraph */}
          <p className="styled-element">
            This is a paragraph element demonstrating the applied styles. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Link and Button */}
          <div className="styled-element space-x-4">
            <a href="#" className="text-blue-600 hover:underline">
              Sample Link
            </a>
            <button className="styled-element bg-blue-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-600">
              Sample Button
            </button>
          </div>

          {/* Div with specific class */}
          <div className="styled-element p-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg">
            This is a styled div with additional Tailwind classes to demonstrate layering effects.
          </div>

          {/* Image */}
          <div className="styled-element">
            <img 
              src="https://picsum.photos/seed/cssstyler/400/200.jpg" 
              alt="Sample image" 
              className="w-full rounded"
            />
          </div>

          {/* List */}
          <div className="styled-element">
            <h3 className="font-semibold mb-2">Sample List:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>First list item with styled content</li>
              <li>Second list item demonstrating text flow</li>
              <li>Third list item showing consistent styling</li>
            </ul>
          </div>

          {/* Mixed content */}
          <div className="styled-element">
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">
              "The best way to learn is by doing. This CSS styler helps you understand how different properties work together."
            </blockquote>
          </div>

          {/* Form elements */}
          <div className="styled-element space-y-4">
            <div>
              <label className="block mb-2">Sample Input:</label>
              <input 
                type="text" 
                placeholder="Type something here..." 
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Sample Textarea:</label>
              <textarea 
                placeholder="Enter longer text here..." 
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};