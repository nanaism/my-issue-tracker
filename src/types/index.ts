/**
 * アプリケーション共通型定義
 *
 * このモジュールはアプリケーション全体で使用される
 * データ構造とUI状態の型定義を提供します。
 */

// ページ（カテゴリ）情報を表す型
// サイドバーでのページ表示とコンテンツフィルタリングに使用
export interface Page {
  id: string;
  title: string;
  isActive: boolean; // 現在選択中のページかどうか
  category: string; // フィルタリング用のカテゴリ識別子
  emoji: string;
}

// アイデア情報を表す型
// 簡易的なメモ機能として使用
export interface Idea {
  id: string;
  text: string;
  createdAt: Date;
  category: string; // 所属ページのカテゴリ
}

// TODO情報を表す型
// タスク管理機能のメインデータ構造
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: string; // 所属ページのカテゴリ
}

// UI状態の型定義
export interface UIState {
  sidebarOpen: boolean;
  selectedTodo: Todo | null;
  editingTodo: Todo | null;
  draggedIdea: string | null;
}
