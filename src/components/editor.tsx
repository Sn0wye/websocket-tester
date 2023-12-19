'use client';

import { memo } from 'react';

import MonacoEditor from '@monaco-editor/react';
import { useStorage } from '@/hooks/storage';

import { useEditor } from '@/hooks/editor';

type EditorProps = {
  tabName: string;
};

const EditorComponent = ({ tabName }: EditorProps) => {
  const { storage } = useStorage();
  const { onMount, handleValueChange } = useEditor();

  return (
    <div className='w-full h-full'>
      <MonacoEditor
        className='w-full h-full'
        language='json'
        value={storage.get(tabName) || ''}
        // path={`index.${language.toLowerCase()}`}
        onMount={onMount}
        onChange={value => {
          handleValueChange(tabName, value || '');
        }}
        options={{
          minimap: {
            enabled: false
          },
          renderLineHighlight: 'gutter',
          fontSize: 16,
          lineHeight: 26,
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          fontLigatures: true,
          'semanticHighlighting.enabled': true,
          bracketPairColorization: {
            enabled: true
          },
          wordWrap: 'on',
          tabSize: 2,
          suggestOnTriggerCharacters: false
        }}
      />
    </div>
  );
};

export const Editor = memo(EditorComponent);
