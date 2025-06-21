// add-page-dialog.tsx (修正後)

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePageContext } from "@/contexts/page-context";
import React from "react";

export function AddPageDialog() {
  const {
    newPageTitle,
    setNewPageTitle,
    newPageEmoji,
    setNewPageEmoji, // ◀️ この関数が使われるように修正
    isAddPageDialogOpen,
    setIsAddPageDialogOpen,
    addPage,
  } = usePageContext();

  const handleAddPage = () => {
    addPage(newPageTitle, newPageEmoji);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPage();
    }
  };

  return (
    <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-xl border-neutral-200/80 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-neutral-900">
            Create New Page
          </DialogTitle>
          <DialogDescription>
            Give your new page a title and an icon to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* ◀️ 絵文字とタイトルの入力欄を修正 */}
          <div className="flex items-center space-x-3">
            <Input
              placeholder="📝"
              value={newPageEmoji}
              onChange={(e) => setNewPageEmoji(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-4xl text-center w-20 h-20 p-2 rounded-lg bg-neutral-100 border-neutral-200 focus:border-blue-500 focus:ring-blue-500"
              maxLength={2}
            />
            <Input
              id="page-title"
              placeholder="Untitled"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-lg font-semibold border-0 border-b-2 border-transparent focus:border-blue-500 focus:ring-0 h-12 p-0 bg-transparent flex-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsAddPageDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddPage}
            disabled={!newPageTitle.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
