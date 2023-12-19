'use client';

import { EditorContentContextProvider } from '@/hooks/editor';
import { RightPanel } from './right-panel';

export default function Home() {
  return (
    <div className='w-full h-full min-h-screen grid grid-cols-2'>
      <div className='flex-1 bg-zinc-800'></div>
      <div className='flex-1 bg-zinc-900'>
        <EditorContentContextProvider>
          {/* <Editor tabName='teste' /> */}
          <RightPanel />
        </EditorContentContextProvider>
      </div>
    </div>
  );
}
