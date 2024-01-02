'use client';

import { EditorContentContextProvider } from '@/hooks/editor';
import { RightPanel } from './right-panel';
import { LeftPanel } from './left-panel';

export default function Home() {
  return (
    <EditorContentContextProvider>
      <div className='w-full h-full min-h-screen grid grid-cols-2 divide-x-2 divide-black'>
        <div className='flex-1 bg-zinc-900'>
          <LeftPanel />
        </div>
        <div className='flex-1 bg-zinc-900'>
          <RightPanel />
        </div>
      </div>
    </EditorContentContextProvider>
  );
}
