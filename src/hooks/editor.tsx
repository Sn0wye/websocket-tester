import {
  createContext,
  type ReactNode,
  useCallback,
  useRef,
  useContext
} from 'react';

import {
  type EditorProps,
  type Monaco,
  type OnMount
} from '@monaco-editor/react';

import { type editor } from 'monaco-editor';
import monacoOmniTheme from '@/assets/monaco-omni.json';

import { useStorage } from './storage';

interface EditorContextProviderProps {
  children: ReactNode;
}

interface EditorContentContextData {
  onMount: EditorProps['onMount'];
  handleValueChange: (key: string, value: string) => void;
}

export const EditorContentContext = createContext(
  {} as EditorContentContextData
);

export const editorHotkeys = new EventTarget();

export function EditorContentContextProvider({
  children
}: EditorContextProviderProps) {
  const monacoRef = useRef<Monaco>();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const { setStorage } = useStorage();

  const handleValueChange = (key: string, value: string) => {
    setStorage(key, value);
  };

  const onMount = useCallback<OnMount>((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monacoRef.current.editor.defineTheme(
      'custom-theme',
      monacoOmniTheme as editor.IStandaloneThemeData
    );

    monacoRef.current?.editor.setTheme('custom-theme');
  }, []);

  return (
    <EditorContentContext.Provider
      value={{
        onMount,
        handleValueChange
      }}
    >
      {children}
    </EditorContentContext.Provider>
  );
}

export const useEditor = () => {
  return useContext(EditorContentContext);
};
