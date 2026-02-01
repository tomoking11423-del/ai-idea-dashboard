# AI実装アイデア管理ダッシュボード

Webサイト向けAI機能の検討・管理ダッシュボード

## 機能

- ✅ 優先度スコアリング（難易度・競合優位度・ROIから自動計算）
- ✅ 依存関係マッピング
- ✅ カンバンボード表示
- ✅ タイムライン/ロードマップビュー
- ✅ 比較モード（2〜3個のアイデアを横並び比較）
- ✅ ローカルストレージ保存
- ✅ JSON/CSVエクスポート・インポート
- ✅ タグ機能
- ✅ お気に入り/ピン留め
- ✅ ソート機能
- ✅ メモ・コメント履歴
- ✅ 決定理由の記録

## セットアップ

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev

# 本番ビルド
npm run build
```

## デプロイ

### Vercel（推奨）
1. GitHubにリポジトリをプッシュ
2. [vercel.com](https://vercel.com) でGitHubアカウント連携
3. リポジトリを選択してDeploy

### Netlify
1. GitHubにリポジトリをプッシュ
2. [netlify.com](https://netlify.com) でGitHubアカウント連携
3. リポジトリを選択
4. Build command: `npm run build`
5. Publish directory: `dist`

### GitHub Pages
```bash
npm install -D gh-pages

# package.jsonに追加:
# "homepage": "https://ユーザー名.github.io/リポジトリ名",
# "scripts": { "deploy": "npm run build && gh-pages -d dist" }

npm run deploy
```

## 技術スタック

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
