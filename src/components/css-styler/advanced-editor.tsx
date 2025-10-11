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

    // Register CSS language if not already registered
    if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'css')) {
      monaco.languages.register({ id: 'css' });
    }

    // Set up CSS language configuration
    monaco.languages.setLanguageConfiguration('css', {
      comments: {
        blockComment: ['/*', '*/'],
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });

    // Define CSS tokens for syntax highlighting
    monaco.languages.setMonarchTokensProvider('css', {
      tokenizer: {
        root: [
          // Comments
          [/\/\*/, 'comment', '@comment'],
          [/\/\/.*$/, 'comment'],
          
          // Strings
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/'([^'\\]|\\.)*$/, 'string.invalid'],
          [/"/, 'string', '@string_double'],
          [/'/, 'string', '@string_single'],
          
          // Selectors
          [/[.#]?[\w-]+(?=\s*[{])/, 'selector'],
          [/@[\w-]+/, 'keyword'],
          
          // Properties
          [/[\w-]+(?=\s*:)/, 'attribute.name'],
          
          // Values
          [/:/, 'delimiter'],
          [/#[0-9a-fA-F]{3,6}\b/, 'number.hex'],
          [/\d+\.?\d*(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|deg|rad|turn|s|ms)\b/, 'number'],
          [/\d+\.?\d*/, 'number'],
          [/url\(/, 'string', '@url'],
          
          // Important
          [/!important\b/, 'keyword'],
          
          // Punctuation
          [/[{}]/, 'delimiter.bracket'],
          [/[,;]/, 'delimiter'],
        ],
        
        comment: [
          [/[^\/*]+/, 'comment'],
          [/\*\//, 'comment', '@pop'],
          [/[\/*]/, 'comment'],
        ],
        
        string_double: [
          [/[^\\"]+/, 'string'],
          [/\\./, 'string.escape'],
          [/"/, 'string', '@pop'],
        ],
        
        string_single: [
          [/[^\\']+/, 'string'],
          [/\\./, 'string.escape'],
          [/'/, 'string', '@pop'],
        ],
        
        url: [
          [/[^)]+/, 'string'],
          [/\)/, 'string', '@pop'],
        ],
      },
    });

    // Add CSS completion provider
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          {
            label: 'color',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'color: ${1:#000};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'background-color',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'background-color: ${1:#fff};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'font-size',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'font-size: ${1:16px};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'padding',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'padding: ${1:16px};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'margin',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'margin: ${1:16px};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'border',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'border: ${1:1px} solid ${2:#ccc};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'display',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'display: ${1:block};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: 'position',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'position: ${1:relative};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
        ];

        return { suggestions };
      },
    });

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
          defaultLanguage="css"
          language="css"
          value={css}
          onChange={(value) => onChange(value || '')}
          theme={theme}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollbar: { vertical: 'auto', horizontal: 'auto' },
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