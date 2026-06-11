(function () {
  var DIMS = {
    R: { tbodyId: "rights-tbody", color: "#185FA5" },
    M: { tbodyId: "market-tbody", color: "#1A6B42" },
    S: { tbodyId: "sovereign-tbody", color: "#8B1A1A" }
  };

  var ROWS = {
    R: [
      { code: "R1", en: { n: "Binding comprehensive AI law with individual rights provisions", s0: "Voluntary only", s1: "Sector-specific binding", s2: "Comprehensive binding law" }, ja: { n: "個人の権利規定を含む包括的なAI法（拘束力あり）", s0: "自発的のみ", s1: "分野限定の拘束規定", s2: "包括的な拘束法" } },
      { code: "R2", en: { n: "Explicit list of prohibited AI use cases in binding law", s0: "None", s1: "Soft discouragements", s2: "Binding prohibition list" }, ja: { n: "拘束法における禁止AI利用事例の明示的リスト", s0: "なし", s1: "ソフトな抑制", s2: "拘束的な禁止リスト" } },
      { code: "R3", en: { n: "Legal right to explanation for automated AI decisions", s0: "Absent", s1: "Soft guideline or sector rule", s2: "Binding legal right" }, ja: { n: "AI自動判断に対する法的説明権", s0: "なし", s1: "ガイドラインまたは分野規則", s2: "拘束的な法的権利" } },
      { code: "R4", en: { n: "Legal right to human review of AI decisions", s0: "Absent", s1: "Recommended in guidelines", s2: "Binding legal right" }, ja: { n: "AI判断の人間による審査権", s0: "なし", s1: "ガイドラインで推奨", s2: "拘束的な法的権利" } },
      { code: "R5", en: { n: "Legal right to contest or appeal AI-driven decisions", s0: "Absent", s1: "Soft or sector-limited", s2: "Binding legal right" }, ja: { n: "AI判断への異議申立て・不服申立て権", s0: "なし", s1: "ソフトまたは分野限定", s2: "拘束的な法的権利" } },
      { code: "R6", en: { n: "Anti-discrimination provisions specifically targeting AI", s0: "None", s1: "General law applied to AI", s2: "AI-specific binding law" }, ja: { n: "AIを対象とする差別禁止規定", s0: "なし", s1: "一般法のAIへの適用", s2: "AI固有の拘束法" } },
      { code: "R7", en: { n: "Independent enforcement body acting on behalf of individuals", s0: "None", s1: "Existing agency with AI mandate", s2: "AI-specific body with full powers" }, ja: { n: "個人のために行動する独立した執行機関", s0: "なし", s1: "AI権限を持つ既存機関", s2: "完全な権限を持つAI専門機関" } },
      { code: "R8", en: { n: "Meaningful financial penalties calibrated to turnover or harm", s0: "None", s1: "Fixed or limited penalties", s2: "Turnover-based or substantial" }, ja: { n: "売上高・被害に応じた実質的な金銭的制裁", s0: "なし", s1: "定額または限定的な制裁", s2: "売上高ベースまたは実質的" } },
      { code: "R9", en: { n: "Restrictions on biometric surveillance or invasive AI in binding law", s0: "Absent or authorized", s1: "Guidelines or limited rules", s2: "Binding prohibition or strict limits" }, ja: { n: "拘束法における生体認証監視・侵襲的AIの制限", s0: "なしまたは許可", s1: "ガイドラインまたは限定的規則", s2: "拘束的禁止または厳格な制限" } },
      { code: "R10", en: { n: "Constitutional or treaty-level AI rights protection", s0: "None", s1: "Foundational law reference", s2: "Constitutional or treaty protection" }, ja: { n: "憲法または条約レベルのAI権利保護", s0: "なし", s1: "基本法への言及", s2: "憲法または条約による保護" } }
    ],
    M: [
      { code: "M1", en: { n: "Primary governance mechanism is voluntary, not legally binding", s0: "Primarily binding", s1: "Mix of binding and voluntary", s2: "Fully voluntary" }, ja: { n: "主要なガバナンス手段が自発的（法的拘束力なし）", s0: "主に拘束的", s1: "拘束と自発の混合", s2: "完全に自発的" } },
      { code: "M2", en: { n: "Industry self-governance is the primary compliance mechanism", s0: "State-led entirely", s1: "Significant industry role", s2: "Industry self-gov primary" }, ja: { n: "業界自主規制が主要なコンプライアンス手段", s0: "完全に国家主導", s1: "業界の重要な役割", s2: "業界自主規制が主役" } },
      { code: "M3", en: { n: "Innovation promotion explicitly mandated in governance framework", s0: "Absent", s1: "Stated policy goal", s2: "Legal mandate" }, ja: { n: "ガバナンス枠組みで革新促進が明示的に義務付け", s0: "なし", s1: "政策目標として表明", s2: "法的義務" } },
      { code: "M4", en: { n: "No binding financial penalties exist for AI violations", s0: "Strong penalties exist", s1: "Limited or fixed penalties", s2: "No AI-specific penalties" }, ja: { n: "AI違反に対する拘束的な金銭的制裁がない", s0: "強い制裁あり", s1: "限定的または定額制裁", s2: "AI固有の制裁なし" } },
      { code: "M5", en: { n: "Formal regulatory sandbox or experimental AI zone", s0: "None", s1: "Informal pilots only", s2: "Formal legal sandbox" }, ja: { n: "正式な規制サンドボックスまたは実験的AIゾーン", s0: "なし", s1: "非公式パイロットのみ", s2: "正式な法的サンドボックス" } },
      { code: "M6", en: { n: "Framework is principles-based rather than prescriptive-rules-based", s0: "Prescriptive rules", s1: "Mix of principles and rules", s2: "Principles only" }, ja: { n: "枠組みが原則ベース（詳細規則ベースでない）", s0: "詳細規則", s1: "原則と規則の混合", s2: "原則のみ" } },
      { code: "M7", en: { n: "No dedicated enforcement body with AI sanctioning powers", s0: "Full AI regulator exists", s1: "Light-touch or sector regulator", s2: "No AI-specific regulator" }, ja: { n: "AI制裁権を持つ専門執行機関がない", s0: "完全なAI規制当局あり", s1: "ライトタッチまたは分野規制当局", s2: "AI専門規制当局なし" } },
      { code: "M8", en: { n: "Compliance is primarily self-assessed, not externally audited", s0: "External audit required", s1: "Mix of self and external", s2: "Self-assessment primary" }, ja: { n: "コンプライアンスが主に自己評価（外部監査なし）", s0: "外部監査必須", s1: "自己評価と外部の混合", s2: "自己評価が主" } },
      { code: "M9", en: { n: "Explicit alignment with international voluntary standards (OECD, ISO 42001)", s0: "None", s1: "Referenced but not adopted", s2: "Actively adopted" }, ja: { n: "国際的な自発的基準（OECD、ISO 42001）との明示的整合", s0: "なし", s1: "言及のみで未採用", s2: "積極的に採用" } },
      { code: "M10", en: { n: "Light-touch, pro-industry approach explicitly stated in official policy", s0: "Not stated", s1: "Implied or mentioned", s2: "Explicit core policy statement" }, ja: { n: "公式政策で明示されたライトタッチ・産業支援アプローチ", s0: "言及なし", s1: "暗示または言及", s2: "中核政策として明示" } }
    ],
    S: [
      { code: "S1", en: { n: "AI outputs must comply with state values or ideology in binding law", s0: "Absent", s1: "Soft preference or guidance", s2: "Binding legal requirement" }, ja: { n: "AI出力が国家の価値観・イデオロギーに合致すること（拘束法）", s0: "なし", s1: "ソフトな偏好またはガイダンス", s2: "拘束的な法的要件" } },
      { code: "S2", en: { n: "Mandatory state registration required before AI deployment", s0: "None", s1: "Sector-specific registration", s2: "Comprehensive mandatory registration" }, ja: { n: "AI導入前の義務的な国家登録", s0: "なし", s1: "分野限定の登録", s2: "包括的な義務登録" } },
      { code: "S3", en: { n: "National security provisions give state broad AI override powers", s0: "None", s1: "Limited carve-out only", s2: "Broad state override powers" }, ja: { n: "国家安全保障規定による国家の広範なAI上書き権", s0: "なし", s1: "限定的な除外のみ", s2: "広範な国家上書き権" } },
      { code: "S4", en: { n: "State directs AI development priorities through binding strategic mandate", s0: "Absent", s1: "Non-binding policy document", s2: "Binding strategic direction" }, ja: { n: "拘束的な戦略命令によるAI開発優先順位の国家指導", s0: "なし", s1: "非拘束の政策文書", s2: "拘束的な戦略的方向性" } },
      { code: "S5", en: { n: "Data localization requirements affecting AI training or deployment", s0: "None", s1: "Sector-specific requirements", s2: "Strict binding requirements" }, ja: { n: "AI学習・導入に影響するデータローカライゼーション要件", s0: "なし", s1: "分野限定の要件", s2: "厳格な拘束要件" } },
      { code: "S6", en: { n: "Restrictions on foreign AI providers or models in binding law", s0: "None", s1: "Preferences or soft guidance", s2: "Binding restrictions" }, ja: { n: "拘束法における外国AI提供者・モデルの制限", s0: "なし", s1: "偏好またはソフトガイダンス", s2: "拘束的な制限" } },
      { code: "S7", en: { n: "State ownership or investment explicitly directs AI development", s0: "Market-led entirely", s1: "Significant state investment role", s2: "State explicitly directs development" }, ja: { n: "国家所有・投資がAI開発を明示的に指導", s0: "完全に市場主導", s1: "重要な国家投資の役割", s2: "国家が開発を明示的に指導" } },
      { code: "S8", en: { n: "State surveillance AI explicitly authorized or mandated in law", s0: "Restricted or absent", s1: "Permitted without explicit law", s2: "Explicitly authorized in law" }, ja: { n: "法律で明示的に許可・義務付けされた国家監視AI", s0: "制限またはなし", s1: "明示法なしで許可", s2: "法律で明示的に許可" } },
      { code: "S9", en: { n: "Content moderation requirements serving state political interests", s0: "Absent", s1: "Soft guidance", s2: "Binding requirement" }, ja: { n: "国家的政治利益に資するコンテンツモデレーション要件", s0: "なし", s1: "ソフトガイダンス", s2: "拘束的要件" } },
      { code: "S10", en: { n: "State pre-approval required for AI deployment", s0: "None required", s1: "Sector-specific approval", s2: "Broad prior approval required" }, ja: { n: "AI導入に国家の事前承認が必要", s0: "不要", s1: "分野限定の承認", s2: "広範な事前承認が必要" } }
    ]
  };

  function renderIndicatorTables(lang) {
    var L = lang === "ja" ? "ja" : "en";
    ["R", "M", "S"].forEach(function (dim) {
      var meta = DIMS[dim];
      var tbody = document.getElementById(meta.tbodyId);
      if (!tbody) return;
      tbody.innerHTML = ROWS[dim].map(function (row, i) {
        var t = row[L];
        var bg = i % 2 === 1 ? "background:#FAFAF8;" : "";
        return "<tr style=\"border-top:1px solid #E5E3DC;" + bg + "\">" +
          "<td style=\"padding:8px 12px;font-weight:700;color:" + meta.color + ";\">" + row.code + "</td>" +
          "<td style=\"padding:8px 12px;\">" + t.n + "</td>" +
          "<td style=\"padding:8px 12px;color:#9CA3AF;font-size:11px;\">" + t.s0 + "</td>" +
          "<td style=\"padding:8px 12px;color:#9CA3AF;font-size:11px;\">" + t.s1 + "</td>" +
          "<td style=\"padding:8px 12px;color:#9CA3AF;font-size:11px;\">" + t.s2 + "</td>" +
          "</tr>";
      }).join("");
    });
  }

  window.renderMethIndicatorTables = renderIndicatorTables;
})();
