"use client";

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sun, Moon, Monitor, Wand2, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

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
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  // Generate session ID on component mount
  useEffect(() => {
    const generateSessionId = () => {
      return crypto.randomUUID();
    };
    setSessionId(generateSessionId());
  }, []);

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

  const handleAiEdit = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a command for AI');
      return;
    }

    if (!css.trim()) {
      toast.error('Please add some CSS first');
      return;
    }

    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai-css', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          currentCss: css,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to edit CSS with AI');
      }

      onChange(data.data.modifiedCss);
      setAiPrompt('');
      toast.success('CSS updated successfully with AI');
    } catch (error) {
      console.error('AI CSS Edit Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to edit CSS with AI');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAiEdit();
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
        <div className="flex items-center space-x-2">
          <Button onClick={formatCSS} variant="outline" size="sm">
            Format CSS
          </Button>
          <Button
            onClick={() => window.open('https://www.w3schools.com/css/', '_blank')}
            variant="outline"
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Learn CSS
          </Button>
        </div>
      </div>

      <div className="p-3 border-b bg-muted/30">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={handleAiKeyPress}
              placeholder="ให้ AI ช่วย (เช่น 'เปลี่ยนสีเป็นธีมสีฟ้า', 'ช่วยทำให้ขอบมน')"
              disabled={isAiLoading}
              className="pr-10"
            />
          </div>
          <Button
            onClick={handleAiEdit}
            disabled={isAiLoading || !aiPrompt.trim()}
            size="sm"
            className="whitespace-nowrap"
          >
            {isAiLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Casting a spell...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Magic
              </>
            )}
          </Button>
        </div>
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
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineNumbers: 'on',
          }}
        />
      </div>
    </div>
  );
};