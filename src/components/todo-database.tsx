// src/components/todo-database.tsx

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageContext } from "@/contexts/page-context";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/todo-store";
import { Check, Edit3, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import React from "react";

// ✅ exportキーワードが正しくついています
export function TodoDatabase() {
  const { activePage } = usePageContext();
  const {
    newTodoTitle,
    setNewTodoTitle, // ✅ 使用します
    addTodo,
    toggleTodoStatus,
    deleteTodo, // ✅ 使用します
    openTodoSidebar,
    getFilteredTodos,
  } = useTodoStore();

  const filteredTodos = getFilteredTodos(activePage.category);

  const handleAddTodo = () => {
    addTodo(newTodoTitle, activePage.category);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // ✅ 使用します
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center">
        <Check className="w-5 h-5 mr-3 text-emerald-600" />
        Todo Database
      </h2>

      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Add a new todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-neutral-100 border-neutral-200/80 focus:border-blue-500 focus:ring-blue-500 rounded-md"
        />
        <Button
          onClick={handleAddTodo}
          disabled={!newTodoTitle.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <div className="rounded-lg border border-neutral-200/80">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-neutral-200/80">
              <TableHead className="w-16">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Created</TableHead>
              <TableHead className="w-16 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTodos.map((todo) => (
              <TableRow
                key={todo.id}
                className="group border-b-0 hover:bg-neutral-200/40"
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Switch
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodoStatus(todo.id)}
                  />
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => openTodoSidebar(todo)}
                >
                  <p
                    className={cn(
                      "font-medium",
                      todo.completed
                        ? "line-through text-neutral-400"
                        : "text-neutral-800"
                    )}
                  >
                    {todo.title}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-neutral-500">
                  {todo.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-neutral-500 hover:bg-neutral-300/50"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openTodoSidebar(todo)}>
                          <Edit3 className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
