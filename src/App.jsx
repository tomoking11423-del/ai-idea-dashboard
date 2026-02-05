import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Edit2, Trash2, X, CheckCircle, XCircle, HelpCircle, ChevronRight, Search, Download, Upload, FileText, MessageSquare, Tag, Pin, Clock, Trash, Briefcase, Users, ShoppingCart, Repeat, Award, Home, LayoutGrid, List, Settings } from 'lucide-react';

// カテゴリ定義（ビジネス貢献別）
const categories = ['すべて', '集客・認知拡大', '売上・予約アップ', 'リピーター獲得', '業務効率化', '採用強化', 'ブランド強化'];

const categoryDescriptions = {
  '集客・認知拡大': '新しいお客様に知ってもらう',
  '売上・予約アップ': '来店・購入につなげる',
  'リピーター獲得': 'また来てもらう',
  '業務効率化': '手間を減らす・時間を節約',
  '採用強化': 'いい人材を採用する',
  'ブランド強化': '企業イメージ・信頼を高める'
};

const categoryIcons = {
  '集客・認知拡大': Users,
  '売上・予約アップ': ShoppingCart,
  'リピーター獲得': Repeat,
  '業務効率化': Briefcase,
  '採用強化': Users,
  'ブランド強化': Award
};

// 初期データ（20個のAI機能アイデア）
const initialIdeas = [
  // 集客・認知拡大（3個）
  { id: 1, title: 'AI SEOメタデータ生成', category: '集客・認知拡大', description: 'ページ内容から最適なタイトル、ディスクリプションを自動設定。検索順位の向上に貢献。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['SEO', '自動化'], pinned: false, comments: [] },
  { id: 2, title: 'SNS要約・即時投稿', category: '集客・認知拡大', description: 'サイト更新内容をXやFB向けに要約し、ボタン一つで投稿完了。SNS運用の手間を削減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['SNS', 'マーケティング'], pinned: false, comments: [] },
  { id: 3, title: 'AI広告クリエイティブ制作', category: '集客・認知拡大', description: 'サイト画像からGoogle/Meta広告用のバナーとコピーを量産。広告制作コストを削減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['広告', 'デザイン'], pinned: false, comments: [] },

  // 売上・予約アップ（4個）
  { id: 4, title: '離脱防止ポップアップ', category: '売上・予約アップ', description: 'ユーザーがサイトを閉じようとした際、AIが最適なオファーを表示。コンバージョン率を向上。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['コンバージョン', 'UX'], pinned: false, comments: [] },
  { id: 5, title: '自律型・高度予約管理', category: '売上・予約アップ', description: '独自の複雑な予約ルールを学習し、AIが会話で予約を完遂。電話対応の負担を軽減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['予約', '自動化'], pinned: false, comments: [] },
  { id: 6, title: 'AI多言語自動翻訳', category: '売上・予約アップ', description: '訪日外国人向けにサイト全体を自然な多言語に変換。インバウンド顧客を獲得。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['インバウンド', 'グローバル'], pinned: false, comments: [] },
  { id: 7, title: 'インフルエンサーDM生成', category: '売上・予約アップ', description: '属性の合うインフルエンサーを抽出し、依頼文を自動作成。インフルエンサーマーケティングを効率化。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['マーケティング', 'SNS'], pinned: false, comments: [] },

  // リピーター獲得（4個）
  { id: 8, title: 'パーソナル・クーポン発行', category: 'リピーター獲得', description: 'ユーザーの行動に合わせた「今だけ」のクーポンを自動配信。リピート率を向上。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['マーケティング', 'CRM'], pinned: false, comments: [] },
  { id: 9, title: '顧客体験（CX）カスタマイズ', category: 'リピーター獲得', description: '過去の来店回数や好みを把握し、超パーソナライズ接客を実現。顧客満足度を向上。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['CX', 'パーソナライズ'], pinned: false, comments: [] },
  { id: 10, title: 'Googleマップ返信下書き', category: 'リピーター獲得', description: '新着口コミに対し、店舗の雰囲気に合わせた返信案を自動生成。口コミ対応を効率化。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['口コミ管理', '自動化'], pinned: false, comments: [] },
  { id: 11, title: 'SNS予約投稿・台本生成', category: 'リピーター獲得', description: 'サイト内容を元に動画台本を生成し、最適な時間に予約投稿。継続的な情報発信を支援。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['SNS', 'コンテンツ'], pinned: false, comments: [] },

  // 業務効率化（4個）
  { id: 12, title: 'AI FAQエージェント', category: '業務効率化', description: 'サイト内の情報を学習し、24時間即答。問い合わせ対応をゼロに近づける。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['自動化', '顧客対応'], pinned: false, comments: [] },
  { id: 13, title: '内部資料のAIチャット化', category: '業務効率化', description: 'マニュアルを学習させ、スタッフがスマホで即時検索できる環境を構築。新人教育の負担を軽減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['社内効率化', '教育'], pinned: false, comments: [] },
  { id: 14, title: '在庫・売上予測エンジン', category: '業務効率化', description: 'PV、予約、天候、イベントを掛け合わせ仕入れ量を助言。在庫ロスと機会損失を削減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['予測', '在庫管理'], pinned: false, comments: [] },
  { id: 15, title: '競合・市場アラート', category: '業務効率化', description: '近隣競合の価格や新メニューをAIが監視し、店主へLINE通知。競合動向を把握。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['競合分析', 'アラート'], pinned: false, comments: [] },

  // 採用強化（2個）
  { id: 16, title: 'AI求人票・面接自動化', category: '採用強化', description: '既存情報から求人票を作成。応募対応と面接調整を自動化。採用活動の負担を軽減。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['採用', '自動化'], pinned: false, comments: [] },
  { id: 17, title: '採用ページ最適化AI', category: '採用強化', description: '応募者の行動データを分析し、採用ページの改善点を提案。応募率を向上。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['採用', '分析'], pinned: false, comments: [] },

  // ブランド強化（3個）
  { id: 18, title: '店主の「デジタルツイン」', category: 'ブランド強化', description: '店主の性格・口調をAIに移植。その人らしい接客をオンラインでも実現。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['ブランディング', '差別化'], pinned: false, comments: [] },
  { id: 19, title: 'ブランド・ボイス完全同期', category: 'ブランド強化', description: '全ツール（サイト・SNS・ボット）のトーンを一貫させ、ブランドイメージを統一。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['ブランディング', '一貫性'], pinned: false, comments: [] },
  { id: 20, title: '画像代替テキスト自動生成', category: 'ブランド強化', description: '掲載画像の内容をAIが判別し、SEOとアクセシビリティを高める記述を自動挿入。', status: 'pending', consideringReason: '', decisionReason: '', tags: ['SEO', 'アクセシビリティ'], pinned: false, comments: [] },
];

const statuses = ['すべて', 'pending', 'approved', 'rejected', 'considering'];
const statusLabels = { pending: '未決定', approved: '実行する', rejected: '実行しない', considering: '検討中' };

export default function AIIdeaDashboard() {
  const [ideas, setIdeas] = useState(() => {
    try {
      const saved = localStorage.getItem('ai-ideas-dashboard-v2');
      return saved ? JSON.parse(saved) : initialIdeas;
    } catch { return initialIdeas; }
  });
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedStatus, setSelectedStatus] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIdea, setEditingIdea] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('category'); // category, list, kanban
  const [selectedTags, setSelectedTags] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [showActionSheet, setShowActionSheet] = useState(null);
  const [showStatusSheet, setShowStatusSheet] = useState(null);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [detailIdeaId, setDetailIdeaId] = useState(null);
  const fileInputRef = useRef(null);

  // 詳細表示中のアイデアを最新の状態から取得
  const detailIdea = useMemo(() => {
    return detailIdeaId ? ideas.find(i => i.id === detailIdeaId) : null;
  }, [detailIdeaId, ideas]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai-ideas-dashboard-v2', JSON.stringify(ideas));
    } catch (e) { console.error('Failed to save:', e); }
  }, [ideas]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    ideas.forEach(idea => idea.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [ideas]);

  // Filter ideas
  const filteredIdeas = useMemo(() => {
    let result = ideas.filter(idea => {
      const categoryMatch = selectedCategory === 'すべて' || idea.category === selectedCategory;
      const statusMatch = selectedStatus === 'すべて' || idea.status === selectedStatus;
      const searchMatch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => idea.tags?.includes(tag));
      return categoryMatch && statusMatch && searchMatch && tagMatch;
    });
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    return result;
  }, [ideas, selectedCategory, selectedStatus, searchQuery, selectedTags]);

  const stats = useMemo(() => ({
    total: ideas.length,
    approved: ideas.filter(i => i.status === 'approved').length,
    rejected: ideas.filter(i => i.status === 'rejected').length,
    considering: ideas.filter(i => i.status === 'considering').length,
    pending: ideas.filter(i => i.status === 'pending').length,
  }), [ideas]);

  const openModal = (idea = null) => {
    setEditingIdea(idea || {
      id: Date.now(),
      title: '',
      category: '集客・認知拡大',
      description: '',
      status: 'pending',
      consideringReason: '',
      decisionReason: '',
      tags: [],
      pinned: false,
      comments: []
    });
    setIsModalOpen(true);
  };

  const saveIdea = () => {
    if (!editingIdea.title.trim()) return;
    const exists = ideas.find(i => i.id === editingIdea.id);
    if (exists) {
      setIdeas(ideas.map(i => i.id === editingIdea.id ? editingIdea : i));
    } else {
      setIdeas([...ideas, editingIdea]);
    }
    setIsModalOpen(false);
    setEditingIdea(null);
  };

  const deleteIdea = (id) => {
    if (confirm('このアイデアを削除しますか？')) {
      setIdeas(ideas.filter(i => i.id !== id));
      setShowActionSheet(null);
      setDetailIdeaId(null);
    }
  };

  const updateStatus = async (id, status) => {
    const idea = ideas.find(i => i.id === id);
    setIdeas(ideas.map(i => i.id === id ? { ...i, status } : i));
    setShowStatusSheet(null);

    // 「実行する」に変更した場合、APIを呼び出す
    if (status === 'approved' && idea) {
      try {
        const response = await fetch('http://localhost:3002/api/ai-projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: '8079054c-257f-4981-9233-bd9d1d1a4f17',
            title: idea.title,
            description: idea.description,
            external_id: String(idea.id),
          }),
        });

        if (!response.ok) {
          console.error('API Error:', response.status);
        }
      } catch (error) {
        console.error('Failed to call API:', error);
      }
    }
  };

  const togglePin = (id) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, pinned: !i.pinned } : i));
  };

  const addComment = (id) => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      date: new Date().toLocaleDateString('ja-JP'),
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };
    setIdeas(ideas.map(i => i.id === id ? { ...i, comments: [...(i.comments || []), comment] } : i));
    setNewComment('');
  };

  const deleteComment = (ideaId, commentId) => {
    setIdeas(ideas.map(i => i.id === ideaId ? { ...i, comments: i.comments.filter(c => c.id !== commentId) } : i));
  };

  const updateDecisionReason = (id, reason) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, decisionReason: reason } : i));
  };

  const updateConsideringReason = (id, reason) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, consideringReason: reason } : i));
  };

  // Export functions
  const exportJSON = () => {
    const data = JSON.stringify(ideas, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-ideas-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['ID', 'タイトル', 'カテゴリ', '説明', 'ステータス', 'タグ', '検討理由', '決定理由'];
    const rows = ideas.map(i => [
      i.id, i.title, i.category, i.description,
      statusLabels[i.status], i.tags?.join('; '), i.consideringReason, i.decisionReason
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-ideas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) {
          setIdeas(data);
          alert('インポートが完了しました');
        }
      } catch (err) {
        alert('インポートに失敗しました: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Status colors for PIVOT style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      case 'considering': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  // Category Icon Component
  const CategoryIcon = ({ category, className = "w-5 h-5" }) => {
    const Icon = categoryIcons[category] || Briefcase;
    return <Icon className={className} />;
  };

  // Idea Card Component (PIVOT Style)
  const IdeaCard = ({ idea }) => {
    return (
      <div
        className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform ${idea.pinned ? 'ring-2 ring-purple-400' : ''}`}
        onClick={() => setDetailIdeaId(idea.id)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {idea.pinned && (
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusStyle(idea.status)}`}>
                {statusLabels[idea.status]}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{idea.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{idea.description}</p>
            {idea.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {idea.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
        </div>
      </div>
    );
  };

  // Category Group View (PIVOT Style)
  const CategoryGroupView = () => {
    const categoryList = categories.filter(c => c !== 'すべて');

    return (
      <div className="space-y-6 pb-24">
        {categoryList.map(category => {
          const categoryIdeas = filteredIdeas.filter(i => i.category === category);
          if (selectedCategory !== 'すべて' && selectedCategory !== category) return null;
          if (categoryIdeas.length === 0 && selectedCategory === 'すべて') return null;

          const Icon = categoryIcons[category] || Briefcase;

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-3 px-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900">{category}</h2>
                  <p className="text-xs text-gray-500">{categoryDescriptions[category]}</p>
                </div>
                <span className="text-sm font-medium text-gray-400">{categoryIdeas.length}</span>
              </div>
              <div>
                {categoryIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // List View (PIVOT Style)
  const ListView = () => {
    return (
      <div className="pb-24">
        {filteredIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">該当するアイデアがありません</p>
          </div>
        )}
      </div>
    );
  };

  // Kanban View (PIVOT Style)
  const KanbanView = () => {
    const statusColumns = ['pending', 'considering', 'approved', 'rejected'];

    return (
      <div className="overflow-x-auto pb-24 -mx-4 px-4">
        <div className="flex gap-4 min-w-max">
          {statusColumns.map(status => (
            <div key={status} className="w-72 flex-shrink-0">
              <div className={`rounded-xl p-3 mb-3 ${getStatusStyle(status)}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{statusLabels[status]}</span>
                  <span className="text-xs opacity-80">{filteredIdeas.filter(i => i.status === status).length}</span>
                </div>
              </div>
              <div className="space-y-3">
                {filteredIdeas.filter(i => i.status === status).map(idea => (
                  <div
                    key={idea.id}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
                    onClick={() => setDetailIdeaId(idea.id)}
                  >
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{idea.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{idea.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Detail Modal (PIVOT Style)
  const DetailModal = ({ idea }) => {
    if (!idea) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setDetailIdeaId(null)} />
        <div className="relative bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
            <button onClick={() => setDetailIdeaId(null)} className="text-purple-600 font-medium">閉じる</button>
            <button onClick={() => setShowActionSheet(idea.id)} className="text-purple-600 font-medium">操作</button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-60px)] pb-8">
            {/* Status */}
            <div className="px-5 pt-4">
              <button
                onClick={() => setShowStatusSheet(idea.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(idea.status)}`}
              >
                {statusLabels[idea.status]}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Description */}
            <div className="px-5 pt-4">
              <div className="flex items-start gap-3">
                {idea.pinned && (
                  <Pin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">{idea.title}</h2>
                  <p className="text-sm text-purple-600 mt-1">{idea.category}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">{idea.description}</p>
            </div>

            {/* Tags */}
            {idea.tags?.length > 0 && (
              <div className="px-5 pt-4">
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, i) => (
                    <span key={i} className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Status Reason Input */}
            {idea.status === 'considering' && (
              <div className="px-5 pt-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">検討理由</label>
                <textarea
                  value={idea.consideringReason || ''}
                  onChange={(e) => updateConsideringReason(idea.id, e.target.value)}
                  placeholder="検討中の理由を記録..."
                  className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  rows={3}
                />
              </div>
            )}

            {(idea.status === 'approved' || idea.status === 'rejected') && (
              <div className="px-5 pt-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">決定理由</label>
                <textarea
                  value={idea.decisionReason || ''}
                  onChange={(e) => updateDecisionReason(idea.id, e.target.value)}
                  placeholder="決定理由を記録..."
                  className={`w-full px-4 py-3 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${
                    idea.status === 'approved'
                      ? 'bg-emerald-50 border-emerald-200 focus:ring-emerald-400'
                      : 'bg-red-50 border-red-200 focus:ring-red-400'
                  }`}
                  rows={3}
                />
              </div>
            )}

            {/* Comments */}
            <div className="px-5 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">メモ ({idea.comments?.length || 0})</h3>
              <div className="space-y-3">
                {idea.comments?.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                      <button onClick={() => deleteComment(idea.id, comment.id)} className="text-gray-400 hover:text-red-500 p-1">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{comment.date} {comment.time}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addComment(idea.id)}
                  placeholder="メモを追加..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={() => addComment(idea.id)}
                  disabled={!newComment.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium disabled:opacity-50"
                >
                  追加
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Action Sheet (PIVOT Style)
  const ActionSheet = ({ ideaId }) => {
    if (!ideaId) return null;
    const idea = ideas.find(i => i.id === ideaId);
    if (!idea) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowActionSheet(null)} />
        <div className="relative w-full max-w-lg animate-slide-up">
          <div className="bg-white rounded-t-2xl overflow-hidden">
            <button
              onClick={() => { togglePin(ideaId); setShowActionSheet(null); }}
              className="w-full px-6 py-4 text-center text-purple-600 font-medium text-lg border-b border-gray-100 active:bg-gray-50"
            >
              {idea.pinned ? 'ピン留め解除' : 'ピン留め'}
            </button>
            <button
              onClick={() => { openModal(idea); setShowActionSheet(null); setDetailIdeaId(null); }}
              className="w-full px-6 py-4 text-center text-purple-600 font-medium text-lg border-b border-gray-100 active:bg-gray-50"
            >
              編集
            </button>
            <button
              onClick={() => deleteIdea(ideaId)}
              className="w-full px-6 py-4 text-center text-red-500 font-medium text-lg active:bg-gray-50"
            >
              削除
            </button>
          </div>
          <button
            onClick={() => setShowActionSheet(null)}
            className="w-full mt-2 mb-8 bg-white rounded-2xl px-6 py-4 text-center text-purple-600 font-bold text-lg active:bg-gray-50"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  };

  // Status Sheet (PIVOT Style)
  const StatusSheet = ({ ideaId }) => {
    if (!ideaId) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowStatusSheet(null)} />
        <div className="relative w-full max-w-lg animate-slide-up">
          <div className="bg-white rounded-t-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-center text-gray-500 text-sm">ステータスを変更</p>
            </div>
            {['pending', 'considering', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => updateStatus(ideaId, status)}
                className="w-full px-6 py-4 text-center text-purple-600 font-medium text-lg border-b border-gray-100 active:bg-gray-50"
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowStatusSheet(null)}
            className="w-full mt-2 mb-8 bg-white rounded-2xl px-6 py-4 text-center text-purple-600 font-bold text-lg active:bg-gray-50"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  };

  // Filter Sheet (PIVOT Style)
  const FilterSheet = () => {
    if (!showFilterSheet) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowFilterSheet(false)} />
        <div className="relative bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden animate-slide-up">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
            <button onClick={() => { setSelectedCategory('すべて'); setSelectedStatus('すべて'); setSelectedTags([]); }} className="text-gray-500 font-medium">リセット</button>
            <span className="font-bold text-gray-900">フィルター</span>
            <button onClick={() => setShowFilterSheet(false)} className="text-purple-600 font-medium">完了</button>
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-60px)] p-5 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">カテゴリ</h3>
              <div className="space-y-1">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${selectedCategory === c ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-700'}`}
                  >
                    <span>{c}</span>
                    {selectedCategory === c && <CheckCircle className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">ステータス</h3>
              <div className="space-y-1">
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${selectedStatus === s ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-700'}`}
                  >
                    <span>{s === 'すべて' ? 'すべて' : statusLabels[s]}</span>
                    {selectedStatus === s && <CheckCircle className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal (PIVOT Style)
  const EditModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
        <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden animate-slide-up sm:animate-none sm:mx-4">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 font-medium">キャンセル</button>
            <span className="font-bold text-gray-900">{editingIdea?.id && ideas.find(i => i.id === editingIdea.id) ? '編集' : '新規アイデア'}</span>
            <button onClick={saveIdea} disabled={!editingIdea?.title?.trim()} className="text-purple-600 font-bold disabled:opacity-50">保存</button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-60px)] p-5 space-y-5">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">タイトル</label>
              <input
                type="text"
                value={editingIdea?.title || ''}
                onChange={(e) => setEditingIdea({ ...editingIdea, title: e.target.value })}
                placeholder="AI機能の名前"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">カテゴリ</label>
              <div className="space-y-1">
                {categories.filter(c => c !== 'すべて').map(c => (
                  <button
                    key={c}
                    onClick={() => setEditingIdea({ ...editingIdea, category: c })}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${editingIdea?.category === c ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="text-gray-700">{c}</span>
                    <ChevronRight className={`w-5 h-5 ${editingIdea?.category === c ? 'text-purple-500' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">説明</label>
              <textarea
                value={editingIdea?.description || ''}
                onChange={(e) => setEditingIdea({ ...editingIdea, description: e.target.value })}
                placeholder="機能の概要説明"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={4}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-2">タグ（カンマ区切り）</label>
              <input
                type="text"
                value={editingIdea?.tags?.join(', ') || ''}
                onChange={(e) => setEditingIdea({ ...editingIdea, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                placeholder="自動化, マーケティング, SEO"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Settings View
  const SettingsView = () => (
    <div className="pb-24 space-y-4">
      <div className="bg-white rounded-2xl overflow-hidden">
        <button onClick={exportJSON} className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-100 active:bg-gray-50">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">JSONエクスポート</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
        <button onClick={exportCSV} className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-100 active:bg-gray-50">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">CSVエクスポート</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
        <label className="w-full flex items-center justify-between px-5 py-4 active:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">JSONインポート</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
          <input ref={fileInputRef} type="file" accept=".json" onChange={importJSON} className="hidden" />
        </label>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-5">
        <h3 className="font-bold text-gray-900 mb-4">統計</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500 mt-1">総数</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">{stats.approved}</p>
            <p className="text-sm text-gray-500 mt-1">実行</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{stats.considering}</p>
            <p className="text-sm text-gray-500 mt-1">検討中</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-500 mt-1">却下</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header (PIVOT Style - Dark) */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-30">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">AI Ideas</h1>
            {activeTab === 'home' && (
              <button
                onClick={() => setShowFilterSheet(true)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory !== 'すべて' || selectedStatus !== 'すべて' || selectedTags.length > 0
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/80'
                }`}
              >
                フィルター
              </button>
            )}
          </div>

          {/* Search */}
          {activeTab === 'home' && (
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="アイデアを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          )}

          {/* View Mode Tabs (only on home) */}
          {activeTab === 'home' && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setViewMode('category')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'category' ? 'bg-white text-gray-900' : 'bg-white/10 text-white/70'}`}
              >
                カテゴリ
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-gray-900' : 'bg-white/10 text-white/70'}`}
              >
                リスト
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white text-gray-900' : 'bg-white/10 text-white/70'}`}
              >
                カンバン
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {activeTab === 'home' && (
          <>
            {viewMode === 'category' && <CategoryGroupView />}
            {viewMode === 'list' && <ListView />}
            {viewMode === 'kanban' && <KanbanView />}
          </>
        )}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Floating Action Button */}
      {activeTab === 'home' && (
        <button
          onClick={() => openModal()}
          className="fixed right-5 bottom-24 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-20"
        >
          <Plus className="w-7 h-7 text-white" />
        </button>
      )}

      {/* Bottom Tab Bar (PIVOT Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 pb-safe">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">ホーム</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs font-medium">設定</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      {detailIdea && <DetailModal idea={detailIdea} />}
      <ActionSheet ideaId={showActionSheet} />
      <StatusSheet ideaId={showStatusSheet} />
      <FilterSheet />
      <EditModal />

      {/* CSS */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
