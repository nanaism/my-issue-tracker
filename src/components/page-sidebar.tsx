// page-sidebar.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePageContext } from "@/contexts/page-context";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";

export function PageSidebar() {
  const {
    pages,
    activePage,
    setActivePage,
    deletePage,
    setIsAddPageDialogOpen,
  } = usePageContext();

  return (
    // 左サイドバー: grid-areaを指定し、レイアウトをGridに任せる
    <aside className="h-screen bg-neutral-100/70 flex flex-col border-r border-neutral-200/80">
      {/* ヘッダー: ワークスペース名のように見せる */}
      <div className="p-4 h-[60px] flex items-center">
        <h1 className="text-base font-semibold text-neutral-700">Todo管理er</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <h2 className="px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
          Pages
        </h2>
        <div className="space-y-0.5">
          {pages.map((page) => (
            <div
              key={page.id}
              className="group relative flex items-center rounded-md"
            >
              <button
                onClick={() => setActivePage(page.id)}
                // アクティブ状態を左のボーダーと背景色で表現。より繊細に。
                className={cn(
                  "flex-1 flex items-center pl-2 pr-1 py-1.5 text-sm rounded-md transition-colors w-full text-left",
                  page.id === activePage.id
                    ? "bg-blue-100/50 text-blue-700 font-semibold"
                    : "text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-800"
                )}
              >
                <span className="mr-2 text-lg">{page.emoji}</span>
                <span className="truncate flex-1">{page.title}</span>
              </button>

              {/* 
                アクションメニュー: ホバー時に表示される...ボタンに集約。
                UIをクリーンに保ち、誤操作を防ぐ。
              */}
              {pages.length > 1 && (
                <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem
                        onClick={() => deletePage(page.id)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => setIsAddPageDialogOpen(true)}
            className="w-full flex items-center px-2 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Page</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
