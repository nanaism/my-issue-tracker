// src/components/todo-edit-sidebar.tsx

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { usePageContext } from "@/contexts/page-context";
import { useTodoStore } from "@/stores/todo-store";
import { MoreHorizontal, X } from "lucide-react";
import React from "react";

// プロパティ行をコンポーネント化して再利用性を高める
function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center">
      <span className="text-neutral-500 font-medium w-24 shrink-0">
        {label}
      </span>
      <div className="flex-1 flex justify-start">{children}</div>
    </div>
  );
}

export function TodoEditSidebar() {
  const { pages } = usePageContext(); // ✅ 使用します
  const {
    sidebarOpen,
    editingTodo,
    closeTodoSidebar,
    setEditingTodo,
    saveTodoChanges,
  } = useTodoStore();

  if (!sidebarOpen || !editingTodo) {
    return (
      <aside className="transform-gpu transition-transform duration-300 translate-x-full"></aside>
    );
  }

  // ✅ 不足していたハンドラー関数をすべて定義します
  const handleTitleChange = (title: string) => {
    setEditingTodo({ ...editingTodo, title });
  };
  const handleDescriptionChange = (description: string) => {
    setEditingTodo({ ...editingTodo, description });
  };
  const handleCompletedChange = (completed: boolean) => {
    setEditingTodo({ ...editingTodo, completed });
  };
  const handleCategoryChange = (category: string) => {
    // ✅ 使用します
    setEditingTodo({ ...editingTodo, category });
  };

  return (
    <aside className="h-screen bg-white/80 backdrop-blur-xl border-l border-neutral-200/80 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-end p-2">
        <button
          onClick={closeTodoSidebar}
          className="p-2 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/60"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <Input
          value={editingTodo.title}
          onChange={(e) => handleTitleChange(e.target.value)} // ✅ 呼び出し
          placeholder="Untitled"
          className="text-2xl font-bold border-none focus:ring-0 p-0 h-auto bg-transparent mb-6"
        />
        <div className="space-y-3 text-sm border-y border-neutral-200/80 py-4">
          <PropertyRow label="Status">
            <Switch
              checked={editingTodo.completed}
              onCheckedChange={handleCompletedChange} // ✅ 呼び出し
            />
          </PropertyRow>
          <PropertyRow label="Page">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between w-full max-w-[200px] border-neutral-200 hover:bg-neutral-100"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span>
                      {pages.find((p) => p.category === editingTodo.category)
                        ?.emoji || "📝"}
                    </span>
                    <span className="truncate">
                      {pages.find((p) => p.category === editingTodo.category)
                        ?.title || "Unknown"}
                    </span>
                  </div>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 border-stone-200">
                {pages.map((page) => (
                  <DropdownMenuItem
                    key={page.id}
                    onClick={() => handleCategoryChange(page.category)} // ✅ 呼び出し
                    className="flex items-center space-x-2"
                  >
                    <span>{page.emoji}</span>
                    <span>{page.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </PropertyRow>
          <PropertyRow label="Created">
            <span className="text-neutral-600">
              {editingTodo.createdAt.toLocaleDateString()}
            </span>
          </PropertyRow>
          <PropertyRow label="Updated">
            <span className="text-neutral-600">
              {editingTodo.updatedAt.toLocaleDateString()}
            </span>
          </PropertyRow>
        </div>
        <div className="pt-6 flex-1">
          <Textarea
            value={editingTodo.description}
            onChange={(e) => handleDescriptionChange(e.target.value)} // ✅ 呼び出し
            placeholder="Add a description..."
            className="w-full h-full text-base bg-transparent border-none resize-none focus:ring-0 p-0 placeholder:text-neutral-400"
          />
        </div>
        <div className="pt-4">
          <Button
            onClick={saveTodoChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </aside>
  );
}
