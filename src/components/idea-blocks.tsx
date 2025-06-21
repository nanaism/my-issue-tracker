// idea-blocks.tsx (修正後)

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { usePageContext } from "@/contexts/page-context";
import { useIdeasImmer } from "@/hooks/use-ideas-immer";
import { FileText, GripVertical, Plus, Trash2 } from "lucide-react";

export function IdeaBlocks() {
  const { pages, activePage } = usePageContext(); // ◀️ `pages`を使用
  const {
    newIdeaText,
    setNewIdeaText,
    draggedIdea,
    setDraggedIdea,
    addIdea,
    deleteIdea,
    updateIdeaCategory, // ◀️ `updateIdeaCategory`を使用
    moveIdea,
    getFilteredIdeas,
  } = useIdeasImmer();

  const filteredIdeas = getFilteredIdeas(activePage.category);

  const handleAddIdea = () => addIdea(newIdeaText, activePage.category);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddIdea();
  };
  const handleDragStart = (ideaId: string) => setDraggedIdea(ideaId);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIdea) {
      const fromIndex = filteredIdeas.findIndex((i) => i.id === draggedIdea);
      moveIdea(fromIndex, dropIndex, activePage.category);
      setDraggedIdea(null);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-3 text-amber-600" />
        Idea Blocks
      </h2>
      <div className="space-y-1">
        {filteredIdeas.map((idea, index) => (
          <div
            key={idea.id}
            className="group flex items-start space-x-2 p-1.5 rounded-md hover:bg-neutral-200/60 transition-colors duration-150"
            draggable
            onDragStart={() => handleDragStart(idea.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <GripVertical className="w-5 h-5 p-0.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-grab mt-0.5" />
            <p className="flex-1 text-base text-neutral-800 leading-relaxed break-words py-0.5 cursor-text">
              {idea.text}
            </p>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* ◀️ ページ移動のDropdownMenuを復活 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-neutral-500 hover:bg-neutral-300/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>
                      {pages.find((p) => p.category === idea.category)?.emoji ||
                        "📝"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/95 border-stone-200"
                >
                  {pages.map((page) => (
                    <DropdownMenuItem
                      key={page.id}
                      onClick={() => updateIdeaCategory(idea.id, page.category)}
                      className="flex items-center space-x-2"
                    >
                      <span>{page.emoji}</span>
                      <span className="text-sm">{page.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => deleteIdea(idea.id)}
                className="p-1 rounded text-neutral-500 hover:text-red-600 hover:bg-red-100/50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 pl-7">
        <div className="flex items-center space-x-2">
          <Plus className="w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Add a new idea... (Press Enter to save)"
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none focus:ring-0 p-0 h-auto text-base placeholder:text-neutral-400"
          />
        </div>
      </div>
      {filteredIdeas.length === 0 && (
        <div className="text-center py-10 text-neutral-500 border-2 border-dashed border-neutral-200 rounded-lg mt-4">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <h3 className="font-semibold text-neutral-600">
            Your ideas will appear here
          </h3>
          <p className="text-sm">
            Start by typing in the field above and press Enter.
          </p>
        </div>
      )}
    </div>
  );
}
