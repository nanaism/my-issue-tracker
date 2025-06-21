// App.tsx (修正後)

import { AddPageDialog } from "@/components/add-page-dialog";
import { IdeaBlocks } from "@/components/idea-blocks";
// import { PageHeader } from "@/components/page-header"; // ◀️ この行を削除
import { PageSidebar } from "@/components/page-sidebar";
import { TodoDatabase } from "@/components/todo-database";
import { TodoEditSidebar } from "@/components/todo-edit-sidebar";
import { PageProvider, usePageContext } from "@/contexts/page-context";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/todo-store";

// PageHeaderコンポーネントはここに定義されているので、importは不要
function PageHeader() {
  const { activePage } = usePageContext();

  return (
    <header className="sticky top-0 z-10 bg-neutral-50/80 px-8 pt-10 pb-6 backdrop-blur-sm">
      <div className="group mb-2">
        <button className="text-6xl transition-transform duration-200 ease-in-out group-hover:scale-110">
          {activePage.emoji}
        </button>
      </div>
      <h1 className="cursor-pointer text-4xl font-bold tracking-tight text-neutral-900 hover:bg-neutral-200/60 rounded-md px-2 py-1 -ml-2">
        {activePage.title}
      </h1>
    </header>
  );
}

function NotionTodoAppInner() {
  const { sidebarOpen } = useTodoStore();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 antialiased">
      <div
        className={cn(
          "grid transition-[grid-template-columns] duration-300 ease-in-out",
          sidebarOpen
            ? "grid-cols-[256px_1fr_384px]"
            : "grid-cols-[256px_1fr_0px]"
        )}
      >
        <PageSidebar />
        <main className="h-screen overflow-y-auto">
          <div className="mx-auto max-w-4xl">
            <PageHeader />
            <div className="px-8 pb-24">
              <IdeaBlocks />
              <TodoDatabase />
            </div>
          </div>
        </main>
        <TodoEditSidebar />
      </div>
      <AddPageDialog />
    </div>
  );
}

export default function NotionTodoApp() {
  return (
    <PageProvider>
      <NotionTodoAppInner />
    </PageProvider>
  );
}
