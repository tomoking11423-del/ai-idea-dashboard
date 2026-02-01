import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Edit2, Trash2, X, Filter, CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronUp, Search, BarChart3, Lightbulb, Target, Zap, Star, Download, Upload, FileText, Image, Columns, Calendar, GitBranch, ArrowRight, MessageSquare, Tag, Pin, ArrowUpDown, Layers, Eye, Clock, DollarSign, TrendingUp, AlertCircle, Check, Copy, Trash, GripVertical, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Initial Ideas Data
const initialIdeas = [
  { id: 1, title: 'AI FAQエージェント', category: '標準実装', description: 'サイト内の情報を学習し、24時間即答。問い合わせ対応をゼロにする。', problem: '営業時間外の問い合わせ対応、スタッフの負担増加', features: ['サイト内容自動学習', '24時間自動応答', '問い合わせ履歴分析'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '中', cost: 50000, monthlyCost: 5000, expectedROI: 300, dependencies: [], tags: ['自動化', '顧客対応'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 2, title: 'Googleマップ返信下書き', category: '標準実装', description: '新着口コミに対し、店舗の雰囲気に合わせた返信案を自動生成。', problem: '口コミ返信の遅延、一貫性のない対応', features: ['口コミ自動検知', 'トーン分析・マッチング', '返信案自動生成'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '低', cost: 30000, monthlyCost: 3000, expectedROI: 150, dependencies: [], tags: ['自動化', '口コミ管理'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 3, title: 'SNS要約・即時投稿', category: '標準実装', description: 'サイト更新内容をXやFB向けに要約し、ボタン一つで投稿完了。', problem: 'SNS更新の手間、サイトとSNSの情報不一致', features: ['更新検知', 'プラットフォーム別最適化', 'ワンクリック投稿'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '中', cost: 40000, monthlyCost: 4000, expectedROI: 200, dependencies: [], tags: ['SNS', 'マーケティング'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 4, title: 'AI多言語自動翻訳', category: '標準実装', description: '訪日外国人向けにサイト全体を自然な多言語に変換。', problem: 'インバウンド顧客の取りこぼし、翻訳コスト', features: ['リアルタイム翻訳', '文脈理解', '多言語SEO対応'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '高', cost: 80000, monthlyCost: 8000, expectedROI: 400, dependencies: [], tags: ['インバウンド', 'グローバル'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 5, title: 'AI SEOメタデータ生成', category: '標準実装', description: 'ページ内容から最適なタイトル、ディスクリプションを自動設定。', problem: 'SEO対策の知識不足、手動更新の手間', features: ['コンテンツ分析', 'キーワード最適化', '自動更新'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '低', cost: 25000, monthlyCost: 2000, expectedROI: 250, dependencies: [], tags: ['SEO', '自動化'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 6, title: '離脱防止ポップアップ', category: '標準実装', description: 'ユーザーがサイトを閉じようとした際、AIが最適なオファーを表示。', problem: '高い離脱率、コンバージョン機会の損失', features: ['離脱予測', 'パーソナライズオファー', 'A/Bテスト'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '中', cost: 35000, monthlyCost: 3500, expectedROI: 350, dependencies: [], tags: ['コンバージョン', 'UX'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 7, title: '画像代替テキスト自動生成', category: '標準実装', description: '掲載画像の内容をAIが判別し、SEOを高める記述を自動挿入。', problem: 'アクセシビリティ対応不足、SEO機会損失', features: ['画像認識', 'SEO最適化テキスト', '一括処理'], competitiveAdvantage: '低', status: 'pending', consideringReason: '', difficulty: '低', cost: 20000, monthlyCost: 2000, expectedROI: 100, dependencies: [], tags: ['SEO', 'アクセシビリティ'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 8, title: 'SNS予約投稿・台本生成', category: '追加オプション', description: 'サイト内容を元に動画台本を生成し、最適な時間に予約投稿。', problem: 'SNS運用の時間不足、投稿タイミングの最適化', features: ['台本自動生成', '最適時間分析', '予約投稿機能'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '中', cost: 60000, monthlyCost: 6000, expectedROI: 250, dependencies: [3], tags: ['SNS', 'コンテンツ'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 9, title: 'インフルエンサーDM生成', category: '追加オプション', description: '属性の合うインフルエンサーを抽出し、依頼文を自動作成。', problem: 'インフルエンサーマーケティングの知識不足', features: ['インフルエンサー抽出', 'マッチング分析', 'DM文面生成'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '高', cost: 100000, monthlyCost: 10000, expectedROI: 500, dependencies: [], tags: ['マーケティング', 'SNS'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 10, title: 'AI求人票・面接自動化', category: '追加オプション', description: '既存情報から求人票を作成。応募対応と面接調整を自動化。', problem: '採用活動の負担、応募者対応の遅延', features: ['求人票自動生成', '応募自動返信', '面接日程調整'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '高', cost: 120000, monthlyCost: 12000, expectedROI: 400, dependencies: [], tags: ['採用', '自動化'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 11, title: 'パーソナル・クーポン発行', category: '追加オプション', description: 'ユーザーの行動に合わせた「今だけ」のクーポンを自動配信。', problem: 'リピート率の低さ、画一的なプロモーション', features: ['行動分析', 'パーソナライズクーポン', '自動配信'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '高', cost: 90000, monthlyCost: 9000, expectedROI: 450, dependencies: [20], tags: ['マーケティング', 'CRM'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 12, title: '競合・市場アラート', category: '追加オプション', description: '近隣競合の価格や新メニューをAIが監視し、店主へLINE通知。', problem: '競合動向の把握不足、対応の遅れ', features: ['競合監視', '変更検知', 'LINE通知連携'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '中', cost: 70000, monthlyCost: 7000, expectedROI: 300, dependencies: [], tags: ['競合分析', 'アラート'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 13, title: 'AI広告クリエイティブ制作', category: '追加オプション', description: 'サイト画像からGoogle/Meta広告用のバナーとコピーを量産。', problem: '広告制作コスト、クリエイティブ不足', features: ['バナー自動生成', 'コピーライティング', '複数サイズ対応'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '中', cost: 80000, monthlyCost: 8000, expectedROI: 350, dependencies: [], tags: ['広告', 'デザイン'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 14, title: '内部資料のAIチャット化', category: '追加オプション', description: 'マニュアルを学習させ、バイトがスマホで即時検索できる環境。', problem: '新人教育の負担、マニュアル検索の非効率', features: ['マニュアル学習', 'スマホ対応チャット', '履歴・分析'], competitiveAdvantage: '中', status: 'pending', consideringReason: '', difficulty: '中', cost: 60000, monthlyCost: 5000, expectedROI: 200, dependencies: [1], tags: ['社内効率化', '教育'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 15, title: '店主の「デジタルツイン」', category: '競合優位', description: '店主の性格・口調をAIに移植。その人らしい接客を実現。', problem: '店主不在時のサービス品質低下', features: ['パーソナリティ学習', '口調・言い回し再現', '継続学習'], competitiveAdvantage: '最高', status: 'pending', consideringReason: '', difficulty: '最高', cost: 200000, monthlyCost: 20000, expectedROI: 600, dependencies: [1, 19], tags: ['ブランディング', '差別化'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 16, title: '自律型・高度予約管理', category: '競合優位', description: '独自の複雑な予約ルールを学習し、AIが会話で予約を完遂。', problem: '予約管理の複雑さ、電話対応負担', features: ['ルール学習', '会話型予約', '例外処理対応'], competitiveAdvantage: '最高', status: 'pending', consideringReason: '', difficulty: '最高', cost: 180000, monthlyCost: 18000, expectedROI: 550, dependencies: [1], tags: ['予約', '自動化'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 17, title: '在庫・売上予測エンジン', category: '競合優位', description: 'PV、予約、天候、イベントを掛け合わせ仕入れ量を助言。', problem: '在庫ロス、機会損失', features: ['多要素分析', '需要予測', '仕入れ提案'], competitiveAdvantage: '最高', status: 'pending', consideringReason: '', difficulty: '最高', cost: 250000, monthlyCost: 25000, expectedROI: 700, dependencies: [16, 18], tags: ['予測', '在庫管理'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 18, title: 'AI Ops（継続的知能改善）', category: '競合優位', description: '回答ログを分析し、顧客の生の声（一次情報）を経営に反映。', problem: '顧客ニーズの把握不足、改善サイクルの遅さ', features: ['ログ分析', 'インサイト抽出', '改善提案'], competitiveAdvantage: '最高', status: 'pending', consideringReason: '', difficulty: '高', cost: 150000, monthlyCost: 15000, expectedROI: 500, dependencies: [1], tags: ['分析', '改善'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 19, title: 'ブランド・ボイス完全同期', category: '競合優位', description: '全ツール（サイト・SNS・ボット）のトーンを一貫。', problem: 'チャネル間のトーン不一致、ブランド毀損', features: ['トーン定義', '全チャネル適用', '一貫性監視'], competitiveAdvantage: '高', status: 'pending', consideringReason: '', difficulty: '高', cost: 100000, monthlyCost: 10000, expectedROI: 350, dependencies: [], tags: ['ブランディング', '一貫性'], pinned: false, comments: [], decisionReason: '', phase: '' },
  { id: 20, title: '顧客体験（CX）カスタマイズ', category: '競合優位', description: '過去の来店回数や好みを把握し、超パーソナライズ接客。', problem: 'リピーター対応の画一化、顧客離れ', features: ['顧客データ統合', '好み学習', 'パーソナライズ提案'], competitiveAdvantage: '最高', status: 'pending', consideringReason: '', difficulty: '最高', cost: 220000, monthlyCost: 22000, expectedROI: 650, dependencies: [1, 18], tags: ['CX', 'パーソナライズ'], pinned: false, comments: [], decisionReason: '', phase: '' },
];

const categories = ['すべて', '標準実装', '追加オプション', '競合優位'];
const statuses = ['すべて', 'pending', 'approved', 'rejected', 'considering'];
const statusLabels = { pending: '未決定', approved: '実行する', rejected: '実行しない', considering: '検討中' };
const statusColors = { pending: 'bg-gray-100 text-gray-700 border-gray-300', approved: 'bg-emerald-100 text-emerald-700 border-emerald-300', rejected: 'bg-red-100 text-red-700 border-red-300', considering: 'bg-amber-100 text-amber-700 border-amber-300' };
const advantageColors = { '低': 'bg-blue-100 text-blue-700', '中': 'bg-indigo-100 text-indigo-700', '高': 'bg-purple-100 text-purple-700', '最高': 'bg-rose-100 text-rose-700' };
const difficultyColors = { '低': 'bg-green-100 text-green-700', '中': 'bg-yellow-100 text-yellow-700', '高': 'bg-orange-100 text-orange-700', '最高': 'bg-red-100 text-red-700' };
const phases = ['Phase 1 (1-3ヶ月)', 'Phase 2 (4-6ヶ月)', 'Phase 3 (7-12ヶ月)', 'Phase 4 (1年以降)'];

// Priority Score Calculation
const calculatePriorityScore = (idea) => {
  const difficultyScore = { '低': 30, '中': 20, '高': 10, '最高': 5 };
  const advantageScore = { '低': 10, '中': 20, '高': 30, '最高': 40 };
  const roiScore = Math.min(idea.expectedROI / 20, 30);
  return Math.round((difficultyScore[idea.difficulty] || 0) + (advantageScore[idea.competitiveAdvantage] || 0) + roiScore);
};

export default function AIIdeaDashboard() {
  const [ideas, setIdeas] = useState(() => {
    try {
      const saved = localStorage.getItem('ai-ideas-dashboard');
      return saved ? JSON.parse(saved) : initialIdeas;
    } catch { return initialIdeas; }
  });
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedStatus, setSelectedStatus] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIdea, setEditingIdea] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, kanban, timeline, dependencies
  const [sortBy, setSortBy] = useState('priority'); // priority, cost, roi, name
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showDependencyModal, setShowDependencyModal] = useState(null);
  const fileInputRef = useRef(null);
  const exportRef = useRef(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai-ideas-dashboard', JSON.stringify(ideas));
    } catch (e) { console.error('Failed to save:', e); }
  }, [ideas]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    ideas.forEach(idea => idea.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [ideas]);

  // Filter and sort ideas
  const filteredIdeas = useMemo(() => {
    let result = ideas.filter(idea => {
      const categoryMatch = selectedCategory === 'すべて' || idea.category === selectedCategory;
      const statusMatch = selectedStatus === 'すべて' || idea.status === selectedStatus;
      const searchMatch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => idea.tags?.includes(tag));
      return categoryMatch && statusMatch && searchMatch && tagMatch;
    });

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'priority') {
        comparison = calculatePriorityScore(b) - calculatePriorityScore(a);
      } else if (sortBy === 'cost') {
        comparison = a.cost - b.cost;
      } else if (sortBy === 'roi') {
        comparison = b.expectedROI - a.expectedROI;
      } else if (sortBy === 'name') {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });

    // Pinned items first
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return result;
  }, [ideas, selectedCategory, selectedStatus, searchQuery, selectedTags, sortBy, sortOrder]);

  const stats = useMemo(() => ({
    total: ideas.length,
    approved: ideas.filter(i => i.status === 'approved').length,
    rejected: ideas.filter(i => i.status === 'rejected').length,
    considering: ideas.filter(i => i.status === 'considering').length,
    pending: ideas.filter(i => i.status === 'pending').length,
    totalCost: ideas.filter(i => i.status === 'approved').reduce((sum, i) => sum + (i.cost || 0), 0),
    avgPriority: Math.round(ideas.reduce((sum, i) => sum + calculatePriorityScore(i), 0) / ideas.length),
  }), [ideas]);

  const openModal = (idea = null) => {
    setEditingIdea(idea || {
      id: Date.now(),
      title: '',
      category: '標準実装',
      description: '',
      problem: '',
      features: [],
      competitiveAdvantage: '中',
      status: 'pending',
      consideringReason: '',
      difficulty: '中',
      cost: 0,
      monthlyCost: 0,
      expectedROI: 0,
      dependencies: [],
      tags: [],
      pinned: false,
      comments: [],
      decisionReason: '',
      phase: ''
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
      setCompareIds(compareIds.filter(cid => cid !== id));
    }
  };

  const updateStatus = (id, status) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, status } : i));
  };

  const togglePin = (id) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, pinned: !i.pinned } : i));
  };

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(cid => cid !== id));
    } else if (compareIds.length < 3) {
      setCompareIds([...compareIds, id]);
    }
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

  const updatePhase = (id, phase) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, phase } : i));
  };

  const updateDependencies = (id, deps) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, dependencies: deps } : i));
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
    const headers = ['ID', 'タイトル', 'カテゴリ', '説明', '課題', '機能', '競合優位度', 'ステータス', '難易度', '初期コスト', '月額コスト', '期待ROI', '優先度スコア', 'フェーズ', 'タグ', '決定理由'];
    const rows = ideas.map(i => [
      i.id, i.title, i.category, i.description, i.problem, i.features?.join('; '), i.competitiveAdvantage,
      statusLabels[i.status], i.difficulty, i.cost, i.monthlyCost, i.expectedROI, calculatePriorityScore(i),
      i.phase, i.tags?.join('; '), i.decisionReason
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

  const exportImage = () => {
    alert('画像エクスポート: ブラウザのスクリーンショット機能をご利用ください（Cmd/Ctrl + Shift + S）');
  };

  // Category Icon Component
  const CategoryIcon = ({ category }) => {
    if (category === '標準実装') return <Lightbulb className="w-4 h-4" />;
    if (category === '追加オプション') return <Zap className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  // Idea Card Component
  const IdeaCard = ({ idea, compact = false }) => {
    const priorityScore = calculatePriorityScore(idea);
    
    return (
      <div className={`bg-white rounded-xl border ${idea.pinned ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'} overflow-hidden hover:shadow-lg transition-all ${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {idea.pinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${idea.category === '標準実装' ? 'bg-sky-100 text-sky-700' : idea.category === '追加オプション' ? 'bg-violet-100 text-violet-700' : 'bg-rose-100 text-rose-700'}`}>
                <CategoryIcon category={idea.category} />{compact ? '' : idea.category}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${advantageColors[idea.competitiveAdvantage]}`}>
                優位: {idea.competitiveAdvantage}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-600 text-white">
                スコア: {priorityScore}
              </span>
            </div>
            <h3 className={`font-semibold text-slate-800 ${compact ? 'text-sm' : 'text-lg'} mb-1 truncate`}>{idea.title}</h3>
            {!compact && <p className="text-sm text-slate-600 line-clamp-2">{idea.description}</p>}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {isCompareMode && (
              <button onClick={() => toggleCompare(idea.id)} className={`p-1.5 rounded-lg transition-colors ${compareIds.includes(idea.id) ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>
                <Eye className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => togglePin(idea.id)} className={`p-1.5 rounded-lg transition-colors ${idea.pinned ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}>
              <Pin className="w-4 h-4" />
            </button>
            <select value={idea.status} onChange={(e) => updateStatus(idea.id, e.target.value)} className={`px-2 py-1 rounded-lg text-xs font-medium border cursor-pointer ${statusColors[idea.status]}`}>
              <option value="pending">未決定</option>
              <option value="approved">実行する</option>
              <option value="rejected">実行しない</option>
              <option value="considering">検討中</option>
            </select>
            {!compact && (
              <>
                <button onClick={() => openModal(idea)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteIdea(idea.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Status-specific inputs */}
        {idea.status === 'considering' && (
          <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
            <input type="text" value={idea.consideringReason || ''} onChange={(e) => setIdeas(ideas.map(i => i.id === idea.id ? { ...i, consideringReason: e.target.value } : i))} placeholder="検討中の理由..." className="w-full px-2 py-1 text-xs bg-white border border-amber-200 rounded focus:outline-none focus:ring-1 focus:ring-amber-400" />
          </div>
        )}

        {(idea.status === 'approved' || idea.status === 'rejected') && (
          <div className={`mt-2 p-2 ${idea.status === 'approved' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} rounded-lg border`}>
            <input type="text" value={idea.decisionReason || ''} onChange={(e) => updateDecisionReason(idea.id, e.target.value)} placeholder="決定理由を記録..." className={`w-full px-2 py-1 text-xs bg-white border ${idea.status === 'approved' ? 'border-emerald-200' : 'border-red-200'} rounded focus:outline-none focus:ring-1`} />
          </div>
        )}

        {!compact && (
          <>
            {/* Tags */}
            {idea.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {idea.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">#{tag}</span>
                ))}
              </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xs text-slate-500">難易度</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyColors[idea.difficulty]}`}>{idea.difficulty}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">初期コスト</p>
                <p className="text-sm font-semibold text-slate-700">¥{(idea.cost || 0).toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">月額</p>
                <p className="text-sm font-semibold text-slate-700">¥{(idea.monthlyCost || 0).toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">期待ROI</p>
                <p className="text-sm font-semibold text-emerald-600">{idea.expectedROI}%</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-3">
              <button onClick={() => setShowCommentModal(idea.id)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">
                <MessageSquare className="w-3 h-3" />メモ ({idea.comments?.length || 0})
              </button>
              <button onClick={() => setShowDependencyModal(idea.id)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">
                <GitBranch className="w-3 h-3" />依存 ({idea.dependencies?.length || 0})
              </button>
              <button onClick={() => setExpandedId(expandedId === idea.id ? null : idea.id)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200">
                {expandedId === idea.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                詳細
              </button>
            </div>

            {/* Expanded details */}
            {expandedId === idea.id && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">解決できる課題</h4>
                  <p className="text-sm text-slate-700">{idea.problem}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">具体的な機能</h4>
                  <div className="flex flex-wrap gap-1">
                    {idea.features?.map((f, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600">{f}</span>
                    ))}
                  </div>
                </div>
                {idea.dependencies?.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">依存する機能</h4>
                    <div className="flex flex-wrap gap-1">
                      {idea.dependencies.map(depId => {
                        const dep = ideas.find(i => i.id === depId);
                        return dep ? (
                          <span key={depId} className="px-2 py-1 bg-white border border-blue-200 rounded text-xs text-blue-700">{dep.title}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Kanban View Component
  const KanbanView = () => {
    const statusColumns = ['pending', 'considering', 'approved', 'rejected'];
    const columnColors = {
      pending: 'bg-gray-50 border-gray-200',
      considering: 'bg-amber-50 border-amber-200',
      approved: 'bg-emerald-50 border-emerald-200',
      rejected: 'bg-red-50 border-red-200'
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {statusColumns.map(status => (
          <div key={status} className={`rounded-xl border-2 ${columnColors[status]} p-3 min-h-[400px]`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700">{statusLabels[status]}</h3>
              <span className="px-2 py-0.5 bg-white rounded-full text-xs font-medium text-slate-600">
                {filteredIdeas.filter(i => i.status === status).length}
              </span>
            </div>
            <div className="space-y-2">
              {filteredIdeas.filter(i => i.status === status).map(idea => (
                <IdeaCard key={idea.id} idea={idea} compact />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Timeline View Component
  const TimelineView = () => {
    const approvedIdeas = ideas.filter(i => i.status === 'approved');
    const phaseColors = {
      'Phase 1 (1-3ヶ月)': 'bg-emerald-500',
      'Phase 2 (4-6ヶ月)': 'bg-blue-500',
      'Phase 3 (7-12ヶ月)': 'bg-purple-500',
      'Phase 4 (1年以降)': 'bg-orange-500'
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />実装ロードマップ
          </h3>
          <p className="text-sm text-slate-500 mb-4">「実行する」に設定したアイデアにフェーズを割り当ててロードマップを作成できます。</p>
          
          {phases.map((phase, idx) => {
            const phaseIdeas = approvedIdeas.filter(i => i.phase === phase);
            return (
              <div key={phase} className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full ${phaseColors[phase]}`} />
                  <h4 className="font-medium text-slate-700">{phase}</h4>
                  <span className="text-xs text-slate-500">({phaseIdeas.length}件)</span>
                </div>
                <div className="ml-7 border-l-2 border-slate-200 pl-4 space-y-2">
                  {phaseIdeas.length === 0 ? (
                    <p className="text-sm text-slate-400 py-2">このフェーズにはまだアイデアがありません</p>
                  ) : (
                    phaseIdeas.map(idea => (
                      <div key={idea.id} className="bg-slate-50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-700">{idea.title}</p>
                          <p className="text-xs text-slate-500">¥{idea.cost?.toLocaleString()} / ROI: {idea.expectedROI}%</p>
                        </div>
                        <button onClick={() => updatePhase(idea.id, '')} className="text-xs text-red-500 hover:text-red-700">削除</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Unassigned approved ideas */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800 mb-3">未割り当ての実行アイデア</h3>
          <div className="space-y-2">
            {approvedIdeas.filter(i => !i.phase).map(idea => (
              <div key={idea.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700">{idea.title}</span>
                <select value={idea.phase || ''} onChange={(e) => updatePhase(idea.id, e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1">
                  <option value="">フェーズを選択</option>
                  {phases.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            ))}
            {approvedIdeas.filter(i => !i.phase).length === 0 && (
              <p className="text-sm text-slate-400">すべての実行アイデアにフェーズが割り当てられています</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Dependencies View Component
  const DependenciesView = () => {
    const ideasWithDeps = ideas.filter(i => i.dependencies?.length > 0);

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />依存関係マップ
        </h3>
        
        {ideasWithDeps.length === 0 ? (
          <p className="text-slate-500 text-center py-8">依存関係が設定されているアイデアはありません</p>
        ) : (
          <div className="space-y-4">
            {ideasWithDeps.map(idea => (
              <div key={idea.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${statusColors[idea.status]}`}>
                    {statusLabels[idea.status]}
                  </div>
                  <span className="font-semibold text-slate-800">{idea.title}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-500">依存:</span>
                  {idea.dependencies.map(depId => {
                    const dep = ideas.find(i => i.id === depId);
                    if (!dep) return null;
                    return (
                      <div key={depId} className="flex items-center gap-1">
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[dep.status]}`}>
                          {dep.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {idea.dependencies.some(depId => {
                  const dep = ideas.find(i => i.id === depId);
                  return dep && dep.status !== 'approved';
                }) && (
                  <div className="mt-2 flex items-center gap-1 text-amber-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>一部の依存先が未承認です</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Compare View Component
  const CompareView = () => {
    const compareIdeas = ideas.filter(i => compareIds.includes(i.id));

    if (compareIdeas.length < 2) {
      return (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">比較するアイデアを2〜3個選択してください</p>
          <p className="text-sm text-slate-400 mt-2">リストビューでアイデアの目アイコンをクリックして選択</p>
        </div>
      );
    }

    const metrics = [
      { key: 'category', label: 'カテゴリ' },
      { key: 'competitiveAdvantage', label: '競合優位度' },
      { key: 'difficulty', label: '実装難易度' },
      { key: 'cost', label: '初期コスト', format: (v) => `¥${v?.toLocaleString()}` },
      { key: 'monthlyCost', label: '月額コスト', format: (v) => `¥${v?.toLocaleString()}` },
      { key: 'expectedROI', label: '期待ROI', format: (v) => `${v}%` },
      { key: 'priorityScore', label: '優先度スコア', getValue: (i) => calculatePriorityScore(i) },
      { key: 'status', label: 'ステータス', format: (v) => statusLabels[v] },
      { key: 'dependencies', label: '依存関係数', getValue: (i) => i.dependencies?.length || 0 },
    ];

    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">項目</th>
                {compareIdeas.map(idea => (
                  <th key={idea.id} className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b border-l">
                    <div className="flex items-center justify-between">
                      {idea.title}
                      <button onClick={() => toggleCompare(idea.id)} className="text-slate-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 text-sm text-slate-600 border-b">説明</td>
                {compareIdeas.map(idea => (
                  <td key={idea.id} className="px-4 py-3 text-sm text-slate-700 border-b border-l">{idea.description}</td>
                ))}
              </tr>
              {metrics.map(metric => (
                <tr key={metric.key} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-600 border-b">{metric.label}</td>
                  {compareIdeas.map(idea => {
                    const value = metric.getValue ? metric.getValue(idea) : idea[metric.key];
                    const formatted = metric.format ? metric.format(value) : value;
                    return (
                      <td key={idea.id} className="px-4 py-3 text-sm text-slate-700 border-b border-l">{formatted}</td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="px-4 py-3 text-sm text-slate-600 border-b">タグ</td>
                {compareIdeas.map(idea => (
                  <td key={idea.id} className="px-4 py-3 text-sm text-slate-700 border-b border-l">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags?.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-xs">#{tag}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">AI実装アイデア管理</h1>
              <p className="text-sm text-slate-500">Webサイト向けAI機能の検討・管理ダッシュボード</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* View Mode Buttons */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                  <Layers className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('kanban')} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                  <Columns className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('timeline')} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === 'timeline' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                  <Calendar className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('dependencies')} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewMode === 'dependencies' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}>
                  <GitBranch className="w-4 h-4" />
                </button>
              </div>

              {/* Compare Mode Toggle */}
              <button onClick={() => { setIsCompareMode(!isCompareMode); if (isCompareMode) setCompareIds([]); }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isCompareMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                <Eye className="w-4 h-4" />比較
                {compareIds.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">{compareIds.length}</span>}
              </button>

              {/* Export/Import */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200">
                  <Download className="w-4 h-4" />エクスポート
                </button>
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 hidden group-hover:block min-w-[140px] z-50">
                  <button onClick={exportJSON} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                    <FileText className="w-4 h-4" />JSON
                  </button>
                  <button onClick={exportCSV} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                    <FileText className="w-4 h-4" />CSV
                  </button>
                  <button onClick={exportImage} className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                    <Image className="w-4 h-4" />画像
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 cursor-pointer">
                <Upload className="w-4 h-4" />インポート
                <input ref={fileInputRef} type="file" accept=".json" onChange={importJSON} className="hidden" />
              </label>

              <button onClick={() => openModal()} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Plus className="w-5 h-5" />新規
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-600" />
              <div><p className="text-xl font-bold text-slate-800">{stats.total}</p><p className="text-xs text-slate-500">総数</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div><p className="text-xl font-bold text-emerald-600">{stats.approved}</p><p className="text-xs text-slate-500">実行</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <div><p className="text-xl font-bold text-amber-600">{stats.considering}</p><p className="text-xs text-slate-500">検討中</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div><p className="text-xl font-bold text-red-600">{stats.rejected}</p><p className="text-xs text-slate-500">却下</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <div><p className="text-xl font-bold text-gray-600">{stats.pending}</p><p className="text-xs text-slate-500">未決定</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <div><p className="text-lg font-bold text-indigo-600">¥{(stats.totalCost / 10000).toFixed(0)}万</p><p className="text-xs text-slate-500">実行コスト</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div><p className="text-xl font-bold text-purple-600">{stats.avgPriority}</p><p className="text-xs text-slate-500">平均スコア</p></div>
            </div>
          </div>
        </div>

        {/* Compare View (if active) */}
        {isCompareMode && compareIds.length >= 2 && (
          <div className="mb-6">
            <CompareView />
          </div>
        )}

        {/* Filters */}
        {(viewMode === 'list' || viewMode === 'kanban') && (
          <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="検索..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm">
                {categories.map(c => <option key={c} value={c}>{c === 'すべて' ? 'カテゴリ: すべて' : c}</option>)}
              </select>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm">
                {statuses.map(s => <option key={s} value={s}>{s === 'すべて' ? 'ステータス: すべて' : statusLabels[s]}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm">
                <option value="priority">優先度スコア順</option>
                <option value="cost">コスト順</option>
                <option value="roi">ROI順</option>
                <option value="name">名前順</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <ArrowUpDown className={`w-4 h-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Tags filter */}
            {allTags.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {allTags.map(tag => (
                    <button key={tag} onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])} className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      #{tag}
                    </button>
                  ))}
                  {selectedTags.length > 0 && (
                    <button onClick={() => setSelectedTags([])} className="text-xs text-red-500 hover:text-red-700">クリア</button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        {viewMode === 'list' && (
          <div className="grid gap-4">
            {filteredIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
            {filteredIdeas.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">該当するアイデアがありません</p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'kanban' && <KanbanView />}
        {viewMode === 'timeline' && <TimelineView />}
        {viewMode === 'dependencies' && <DependenciesView />}
      </main>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-800">{editingIdea?.id && ideas.find(i => i.id === editingIdea.id) ? 'アイデアを編集' : '新規アイデア'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">タイトル *</label>
                <input type="text" value={editingIdea?.title || ''} onChange={(e) => setEditingIdea({ ...editingIdea, title: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="AI機能の名前" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">カテゴリ</label>
                  <select value={editingIdea?.category || '標準実装'} onChange={(e) => setEditingIdea({ ...editingIdea, category: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="標準実装">標準実装</option>
                    <option value="追加オプション">追加オプション</option>
                    <option value="競合優位">競合優位</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">競合優位度</label>
                  <select value={editingIdea?.competitiveAdvantage || '中'} onChange={(e) => setEditingIdea({ ...editingIdea, competitiveAdvantage: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="低">低</option>
                    <option value="中">中</option>
                    <option value="高">高</option>
                    <option value="最高">最高</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">実装難易度</label>
                  <select value={editingIdea?.difficulty || '中'} onChange={(e) => setEditingIdea({ ...editingIdea, difficulty: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="低">低</option>
                    <option value="中">中</option>
                    <option value="高">高</option>
                    <option value="最高">最高</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ステータス</label>
                  <select value={editingIdea?.status || 'pending'} onChange={(e) => setEditingIdea({ ...editingIdea, status: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="pending">未決定</option>
                    <option value="approved">実行する</option>
                    <option value="rejected">実行しない</option>
                    <option value="considering">検討中</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">初期コスト (円)</label>
                  <input type="number" value={editingIdea?.cost || 0} onChange={(e) => setEditingIdea({ ...editingIdea, cost: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">月額コスト (円)</label>
                  <input type="number" value={editingIdea?.monthlyCost || 0} onChange={(e) => setEditingIdea({ ...editingIdea, monthlyCost: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">期待ROI (%)</label>
                  <input type="number" value={editingIdea?.expectedROI || 0} onChange={(e) => setEditingIdea({ ...editingIdea, expectedROI: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">説明</label>
                <textarea value={editingIdea?.description || ''} onChange={(e) => setEditingIdea({ ...editingIdea, description: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none" placeholder="機能の概要説明" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">解決できる課題</label>
                <textarea value={editingIdea?.problem || ''} onChange={(e) => setEditingIdea({ ...editingIdea, problem: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none" placeholder="クライアントのどんな課題を解決するか" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">具体的な機能（カンマ区切り）</label>
                <input type="text" value={editingIdea?.features?.join(', ') || ''} onChange={(e) => setEditingIdea({ ...editingIdea, features: e.target.value.split(',').map(f => f.trim()).filter(f => f) })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="機能1, 機能2, 機能3" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">タグ（カンマ区切り）</label>
                <input type="text" value={editingIdea?.tags?.join(', ') || ''} onChange={(e) => setEditingIdea({ ...editingIdea, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="自動化, マーケティング, SEO" />
              </div>

              {editingIdea?.status === 'considering' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">検討理由</label>
                  <input type="text" value={editingIdea?.consideringReason || ''} onChange={(e) => setEditingIdea({ ...editingIdea, consideringReason: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="検討中の理由" />
                </div>
              )}

              {(editingIdea?.status === 'approved' || editingIdea?.status === 'rejected') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">決定理由</label>
                  <input type="text" value={editingIdea?.decisionReason || ''} onChange={(e) => setEditingIdea({ ...editingIdea, decisionReason: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="この決定を下した理由" />
                </div>
              )}

              {/* Priority Score Preview */}
              {editingIdea && (
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-indigo-700">計算された優先度スコア</span>
                    <span className="text-2xl font-bold text-indigo-600">{calculatePriorityScore(editingIdea)}</span>
                  </div>
                  <p className="text-xs text-indigo-600 mt-1">難易度が低く、競合優位度が高く、ROIが高いほどスコアが上がります</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">キャンセル</button>
              <button onClick={saveIdea} disabled={!editingIdea?.title?.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">保存</button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">メモ・コメント履歴</h3>
              <button onClick={() => setShowCommentModal(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(ideas.find(i => i.id === showCommentModal)?.comments || []).length === 0 ? (
                <p className="text-slate-400 text-center py-8">まだコメントがありません</p>
              ) : (
                ideas.find(i => i.id === showCommentModal)?.comments.map(comment => (
                  <div key={comment.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-slate-700">{comment.text}</p>
                      <button onClick={() => deleteComment(showCommentModal, comment.id)} className="text-slate-400 hover:text-red-500 flex-shrink-0">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{comment.date} {comment.time}</p>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addComment(showCommentModal)} placeholder="コメントを追加..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button onClick={() => addComment(showCommentModal)} disabled={!newComment.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">追加</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dependency Modal */}
      {showDependencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">依存関係の設定</h3>
              <button onClick={() => setShowDependencyModal(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-sm text-slate-500 mb-4">このアイデアを実装する前に必要な機能を選択してください。</p>
              <div className="space-y-2">
                {ideas.filter(i => i.id !== showDependencyModal).map(idea => {
                  const currentIdea = ideas.find(i => i.id === showDependencyModal);
                  const isSelected = currentIdea?.dependencies?.includes(idea.id);
                  return (
                    <button key={idea.id} onClick={() => {
                      const current = ideas.find(i => i.id === showDependencyModal);
                      const deps = current?.dependencies || [];
                      const newDeps = isSelected ? deps.filter(d => d !== idea.id) : [...deps, idea.id];
                      updateDependencies(showDependencyModal, newDeps);
                    }} className={`w-full p-3 rounded-lg border text-left transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-700">{idea.title}</p>
                          <p className="text-xs text-slate-500">{idea.category}</p>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-indigo-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200">
              <button onClick={() => setShowDependencyModal(null)} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">完了</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
