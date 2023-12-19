'use client';

import { Editor } from '@/components/editor';
import { EditorContentContextProvider } from '@/hooks/editor';

export default function Home() {
  return (
    <div className='w-full h-full min-h-screen grid grid-cols-2'>
      <div className='flex-1 bg-zinc-800'></div>
      <div className='flex-1 bg-zinc-900'>
        <EditorContentContextProvider>
          <Editor tabName='teste' />
        </EditorContentContextProvider>
      </div>
    </div>
  );
}
