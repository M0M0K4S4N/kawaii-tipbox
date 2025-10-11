"use client";

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';

interface AdvancedEditorProps {
  css: string;
  onChange: (css: string) => void;
}

const themes = [
  { value: 'vs', label: 'Light', icon: Sun },
  { value: 'vs-dark', label: 'Dark', icon: Moon },
  { value: 'hc-black', label: 'High Contrast', icon: Monitor },
];

export const AdvancedEditor = ({ css, onChange }: AdvancedEditorProps) => {
  const [theme, setTheme] = useState('vs-dark');
  const [editor, setEditor] = useState<any>(null);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setEditor(editor);

    // Format CSS on paste
    editor.onDidPaste(() => {
      setTimeout(() => {
        editor.getAction('editor.action.formatDocument').run();
      }, 100);
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const formatCSS = () => {
    if (editor) {
      editor.getAction('editor.action.formatDocument').run();
    }
  };

  const minimap = { enabled: false };
  const scrollbar = { vertical: 'auto', horizontal: 'auto' };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Theme:</span>
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map(({ value, label, icon: Icon }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={formatCSS} variant="outline" size="sm">
          Format CSS
        </Button>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language="css"
          value={css}
          onChange={(value) => onChange(value || '')}
          theme={theme}
          onMount={handleEditorDidMount}
          options={{
            minimap,
            scrollbar,
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            wordBasedSuggestions: true,
            parameterHints: { enabled: true },
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            contextmenu: true,
            mouseWheelZoom: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            bracketMatching: 'always',
            guides: {
              indentation: true,
              bracketPairs: true,
            },
            lightbulb: { enabled: true },
            codeActionsOnSave: {
              'source.fixAll': true,
              'source.organizeImports': true,
            },
          }}
        />
      </div>
    </div>
  );
};