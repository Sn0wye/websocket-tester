import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { Editor } from '@/components/editor';
import { useStorage } from '@/hooks/storage';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function RightPanel() {
  const [selectedTab, setSelectedTab] = useState('teste');
  const storage = useStorage(s => s.storage);
  const setStorage = useStorage(s => s.setStorage);
  const removeKey = useStorage(s => s.removeKey);
  const tabs = Array.from(storage.keys());

  return (
    <div className='w-full flex flex-col h-full'>
      <nav className='flex items-center bg-zinc-950'>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            displayName={tab}
            tabName={tab}
            onSelectTab={setSelectedTab}
            isSelected={tab === selectedTab}
          />
        ))}
        <button
          onClick={() => {
            const newTabName = `Nova aba`;
            setSelectedTab(newTabName);
            setStorage(newTabName, '');
          }}
          className='ml-2 bg-transparent border-0 text-zinc-100 outline-none text-sm p-1.5 cursor-pointer hover:bg-white/5 rounded'
        >
          <Plus className='h-4 w-4' />
        </button>
      </nav>

      <main className='flex flex-1 overflow-hidden relative h-full'>
        <Editor tabName={selectedTab} />
      </main>

      <footer className='bg-zinc-950 flex p-2 w-full items-center justify-end'>
        <Button
          variant='destructive'
          onClick={() => {
            removeKey(selectedTab);
            setSelectedTab(tabs[tabs.length - 2]);
          }}
        >
          Excluir
        </Button>
      </footer>
    </div>
  );
}

export type Tab = string;

export type TabButtonProps = {
  tabName: string;
  displayName: string;
  isSelected: boolean;
  onSelectTab: (tab: string) => void;
};

export function TabButton({
  tabName,
  displayName,
  isSelected,
  onSelectTab
}: TabButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(displayName);
  const inputRef = useRef<HTMLInputElement>(null);
  const { renameKey } = useStorage();

  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setIsEditing(false);
    }
  };

  const handleRename = () => {
    if (editedName !== displayName && editedName !== '') {
      console.log('renaming', displayName, editedName);
      renameKey(displayName, editedName);
    }
    setIsEditing(false);
  };

  return (
    <button
      type='button'
      onClick={() => onSelectTab(tabName)}
      onDoubleClick={handleDoubleClick}
      className={cn(
        'bg-transparent border-0 text-zinc-100 outline-none text-sm py-2 px-3 cursor-pointer flex items-center gap-3',
        isSelected && 'bg-white/5'
      )}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className='w-[140px] bg-transparent border-0 focus:outline-none text-zinc-100'
          onChange={e => setEditedName(e.target.value)}
          value={editedName}
          onBlur={handleRename}
          onKeyDown={e => e.key === 'Enter' && handleRename()}
        />
      ) : (
        displayName
      )}
    </button>
  );
}
