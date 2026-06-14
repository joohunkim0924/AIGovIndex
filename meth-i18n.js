(function () {
  var currentLang = "en";

  var t = {
    en: {
      navBrand: "AI Governance Index",
      navMap: "Map",
      navData: "Data",
      navBack: "\u2190 Back to map",
      langBtn: "\u65e5\u672c\u8a9e",
      heroH1: "Methodology",
      pill1: "30 indicators",
      pill2: "3 dimensions",
      pill3: "79 jurisdictions",
      pill4: "Updated June 2026",
      pill5: "Primary sources only",
      tocTitle: "Contents",
      toc1: "1. Overview & core formula",
      toc2: "2. The three-level scoring scale",
      toc3: "3. Rights dimension \u2014 R1 to R10",
      toc4: "4. Market dimension \u2014 M1 to M10",
      toc5: "5. Sovereign dimension \u2014 S1 to S10",
      toc6: "6. Compass coordinates (rx, bx)",
      toc7: "7. Worked examples & scorecard PDFs",
      toc8: "8. Full scoring table \u2014 all 79 jurisdictions",
      toc9: "9. Known limitations",
      toc10: "10. Primary source basis",
      s1tag: "Section 1",
      s1h2: "Overview & core formula",
      s1scope: "This index measures governance philosophy as expressed in binding primary legal documents and official policy instruments, not enforcement outcomes or regulatory effectiveness.",
      s1precision: "<strong>Precision.</strong> With 10 indicators per dimension scored 0\u20132, each raw score ranges from 0 to 20. The maximum total is 60, giving a minimum step size of 1/60 \u2248 0.017 after normalization. Coordinates are rounded to two decimal places. The honest uncertainty at that precision is <strong>\u00b10.02</strong>, corresponding to a single indicator being scored one level differently by another researcher applying the same rubric to the same document. All indicators are weighted equally to minimize researcher subjectivity.",
      s2tag: "Section 2",
      s2h2: "The three-level scoring scale",
      s2sub: "Every indicator uses the same scale, applied exclusively to primary governance documents \u2014 legislation, official regulatory guidance, executive orders, and international treaties.",
      scale0: "Absent",
      scale0d: "No meaningful provision exists. Silence, vague aspiration, or rhetorical reference without operational content all score 0.",
      scale0e: "Japan: no binding right to explanation \u2192 R3 = 0",
      scale1: "Soft / partial / sector-specific",
      scale1d: "Exists but is voluntary, limited to one sector, or binding without meaningful enforcement capacity.",
      scale1e: "UK: sector regulators issue AI transparency guidance \u2192 R3 = 1",
      scale2: "Binding / comprehensive",
      scale2d: "A binding legal obligation across sectors, with real enforcement mechanism and meaningful penalties or powers.",
      scale2e: "EU AI Act: binding right to explanation for high-risk AI \u2192 R3 = 2",
      s3tag: "Section 3",
      s3h2: "Rights dimension (R)",
      s3sub: "Measures how strongly the framework protects individuals from AI harms. Max raw score: 20.",
      s4tag: "Section 4",
      s4h2: "Market dimension (M)",
      s4sub: "Measures how strongly governance relies on voluntary, industry-led mechanisms. Max raw score: 20.",
      s5tag: "Section 5",
      s5h2: "Sovereign dimension (S)",
      s5sub: "Measures how strongly the state directs and controls AI development and deployment. Max raw score: 20.",
      thCode: "Code",
      thIndicator: "Indicator",
      th0: "Score 0",
      th1: "Score 1",
      th2: "Score 2",
      tableNote: "Indicator definitions and scoring criteria remain in English for reproducibility with primary sources.",
      s6tag: "Section 6",
      s6h2: "Compass coordinates (rx, bx)",
      s6sub: "The Compass view uses a two-axis system. The vertical axis (rx) maps individual rights vs. state control. The horizontal axis (bx) maps voluntary vs. binding governance. These are derived independently from the ternary coordinates.",
      s6note: "The 1.15 multiplier stretches the rx axis to better utilize the full compass range, since most countries have moderate (r\u2212s) values. Countries with r=0.75 and s=0.04 get rx=(0.71)\u00d71.15=0.82, placing them near the top of the compass without reaching the extreme.",
      s7tag: "Section 7",
      s7h2: "Worked examples & scorecard PDFs",
      s7sub: "Side-by-side coordinate derivation for Japan and the EU, plus full indicator-by-indicator scorecards for four benchmark jurisdictions. Each PDF documents every R, M, and S indicator with primary-source justification.",
      s7pdfHead: "Full indicator scorecards (PDF)",
      pdfDl: "Download",
      pdfEuDesc: "All 30 indicators with article-level citations and scoring rationale.",
      pdfJpDesc: "All 30 indicators with primary-source justification for each score.",
      pdfKrDesc: "All 30 indicators including extraterritorial scope and penalty analysis.",
      pdfUsDesc: "All 30 indicators across federal EO, Colorado SB 205, Illinois BIPA, and more.",
      s8tag: "Section 8",
      s8h2: "Full scoring table \u2014 all 79 jurisdictions",
      s8sub: "Raw indicator sums and derived coordinates for every jurisdiction in the index, as of June 2026. EU member states share the same R/M baseline from the EU AI Act but may differ on S indicators reflecting national governance context.",
      thJurisdiction: "Jurisdiction",
      s9tag: "Section 9",
      s9h2: "Known limitations",
      lim1t: "Advocacy bodies vs governance actors",
      lim1b: "OECD and UNESCO score market-oriented because their frameworks are voluntary \u2014 but their philosophy is rights-protective. The formula measures governance mechanism, not governance intent. These are noted as edge cases.",
      lim2t: "Intent vs enacted reality",
      lim2b: "Canada and Australia have strong rights traditions but lack binding AI law following legislative failures. The formula scores current enacted governance, not aspiration. Timeline data captures the trajectory.",
      lim3t: "Inter-rater reliability",
      lim3b: "Indicator scoring requires reading primary documents. Two researchers may score a single indicator \u00b11, producing a coordinate shift of approximately \u00b10.02. This is the irreducible uncertainty of any document-based governance index.",
      lim4t: "Equal indicator weighting",
      lim4b: "All 10 indicators per dimension are weighted equally. A future version could weight foundational indicators (R1, S1) more heavily. Current equal weighting is a deliberate choice to minimize researcher subjectivity.",
      s10tag: "Section 10",
      s10h2: "Primary source basis",
      s10sub: "All indicator scores are based exclusively on the following primary source types. Secondary commentary, news articles, and think-tank summaries were not used as scoring inputs.",
      src1: "National AI legislation and regulations (official government portals and official journals)",
      src2: "Executive orders, cabinet decisions, and prime ministerial directives",
      src3: "Binding regulatory guidance issued by national supervisory authorities (e.g., CAC, BfDI, ICO, CNIL)",
      src4: "Constitutional provisions and constitutional court judgments",
      src5: "International treaties and intergovernmental agreements",
      src6: "National AI strategies where adopted by formal government decision (not consultation documents)",
      src7: "OECD AI Policy Observatory database for cross-verification",
      src8: "Stanford HAI AI Index 2026 for secondary validation of key facts",
      callout: "<strong>Position \u2260 ranking.</strong> The formula produces a location in three-dimensional governance space, not a score from good to bad. A country positioned near the sovereignty corner is not worse than one near the rights corner \u2014 it reflects a different stated philosophy about what AI governance is for, as expressed in primary legal documents. The formula makes that philosophy visible and contestable, which is the point.",
      backBtn: "\u2190 Back to the map",
      pageTitle: "Methodology \u2014 Global AI Governance Index"
    },
    ja: {
      navBrand: "AI\u30ac\u30d0\u30ca\u30f3\u30b9\u6307\u6570",
      navMap: "\u5730\u56f3",
      navData: "\u30c7\u30fc\u30bf",
      navBack: "\u2190 \u5730\u56f3\u306b\u623b\u308b",
      langBtn: "English",
      heroH1: "\u65b9\u6cd5\u8ad6",
      pill1: "30\u6307\u6a19",
      pill2: "3\u6b21\u5143",
      pill3: "79\u6cd5\u57df",
      pill4: "2026\u5e746\u6708\u66f4\u65b0",
      pill5: "\u4e00\u6b21\u8cc7\u6599\u306e\u307f",
      tocTitle: "\u76ee\u6b21",
      toc1: "1. \u6982\u8981\u3068\u6838\u5fc3\u7b97\u5f0f",
      toc2: "2. 3\u6bb5\u968e\u306e\u63a1\u70b9\u30b9\u30b1\u30fc\u30eb",
      toc3: "3. \u6a29\u5229\u6b21\u5143 \u2014 R1\u301cR10",
      toc4: "4. \u5e02\u5834\u6b21\u5143 \u2014 M1\u301cM10",
      toc5: "5. \u4e3b\u6a29\u6b21\u5143 \u2014 S1\u301cS10",
      toc6: "6. \u30b3\u30f3\u30d1\u30b9\u5ea7\u6a19\uff08rx, bx\uff09",
      toc7: "7. \u8a08\u7b97\u4f8b\u3068\u30b9\u30b3\u30a2\u30ab\u30fc\u30c9PDF",
      toc8: "8. \u5168\u30b9\u30b3\u30a2\u8868 \u2014 79\u6cd5\u57df",
      toc9: "9. \u5df2\u77e5\u306e\u9650\u754c",
      toc10: "10. \u4e00\u6b21\u8cc7\u6599\u306e\u57fa\u6e96",
      s1tag: "\u7b2c1\u7ae0",
      s1h2: "\u6982\u8981\u3068\u6838\u5fc3\u7b97\u5f0f",
      s1scope: "\u672c\u6307\u6570\u306f\u3001\u7d81\u5b9a\u529b\u306e\u3042\u308b\u4e00\u6b21\u6cd5\u4ee4\u304a\u3088\u3073\u516c\u5f0f\u306e\u653f\u7b56\u6587\u66f8\u306b\u8868\u308c\u305f\u30ac\u30d0\u30ca\u30f3\u30b9\u54f2\u5b66\u3092\u6e2c\u5b9a\u3059\u308b\u3082\u306e\u3067\u3042\u308a\u3001\u57f7\u884c\u306e\u6210\u679c\u3084\u898f\u5236\u306e\u5b9f\u52b9\u6027\u3092\u6e2c\u5b9a\u3059\u308b\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
      s1precision: "<strong>\u7cbe\u5ea6\u3002</strong>\u6b21\u5143\u3054\u3068\u306b10\u6307\u6a19\u30920\u301c2\u3067\u63a1\u70b9\u3059\u308b\u3068\u3001\u5404\u751f\u30b9\u30b3\u30a2\u306f0\u301c20\u306e\u7bc4\u56f2\u306b\u306a\u308a\u307e\u3059\u3002\u5408\u8a08\u306e\u6700\u5927\u5024\u306f60\u3067\u3001\u6b63\u898f\u5316\u5f8c\u306e\u6700\u5c0f\u6b65\u9577\u306f1/60\u22480.017\u3067\u3059\u3002\u5ea7\u6a19\u306f\u5c0f\u6570\u7b2c2\u4f4d\u307e\u3067\u4e38\u3081\u307e\u3059\u3002\u305d\u306e\u7cbe\u5ea6\u3067\u306e\u5b9f\u8cea\u7684\u306a\u4e0d\u78ba\u5b9f\u6027\u306f<strong>\u00b10.02</strong>\u3067\u3001\u540c\u3058\u30eb\u30fc\u30d6\u30ea\u30c3\u30af\u3092\u9069\u7528\u3057\u305f\u5225\u306e\u7814\u7a76\u8005\u304c1\u6307\u6a19\u3060\u30511\u6bb5\u968e\u7570\u306a\u308b\u63a1\u70b9\u3092\u3057\u305f\u5834\u5408\u306b\u5bfe\u5fdc\u3057\u307e\u3059\u3002\u3059\u3079\u3066\u306e\u6307\u6a19\u306f\u540c\u91cd\u307f\u3067\u3001\u7814\u7a76\u8005\u306e\u4e3b\u89b3\u6027\u3092\u6700\u5c0f\u5316\u3059\u308b\u305f\u3081\u306e\u610f\u56f3\u7684\u306a\u9078\u629e\u3067\u3059\u3002",
      s2tag: "\u7b2c2\u7ae0",
      s2h2: "3\u6bb5\u968e\u306e\u63a1\u70b9\u30b9\u30b1\u30fc\u30eb",
      s2sub: "\u3059\u3079\u3066\u306e\u6307\u6a19\u306f\u540c\u3058\u30b9\u30b1\u30fc\u30eb\u3092\u4f7f\u7528\u3057\u3001\u6cd5\u4ee4\u3001\u5b98\u65b9\u898f\u5236\u30ac\u30a4\u30c0\u30f3\u30b9\u3001\u884c\u653f\u547d\u4ee4\u3001\u56fd\u969b\u6761\u7d04\u306a\u3069\u306e\u4e00\u6b21\u30ac\u30d0\u30ca\u30f3\u30b9\u6587\u66f8\u306b\u306e\u307f\u9069\u7528\u3057\u307e\u3059\u3002",
      scale0: "\u306a\u3057",
      scale0d: "\u610f\u5473\u306e\u3042\u308b\u898f\u5b9a\u304c\u306a\u3044\u3002\u6c88\u9ed9\u3001\u3042\u3044\u307e\u3044\u306a\u5fd7\u5411\u3001\u5b9f\u52d9\u7684\u5185\u5bb9\u306e\u306a\u3044\u55e6\u4f53\u7684\u63d0\u53ca\u306f\u3059\u3079\u30660\u70b9\u3002",
      scale0e: "\u65e5\u672c\uff1a\u7d81\u5b9a\u7684\u306a\u8aac\u660e\u6a29\u306a\u3057 \u2192 R3 = 0",
      scale1: "\u30bd\u30d5\u30c8\u30fb\u90e8\u5206\u7684\u30fb\u5206\u91ce\u9650\u5b9a",
      scale1d: "\u5b58\u5728\u3059\u308b\u304c\u81ea\u767a\u7684\u3001\u5358\u4e00\u5206\u91ce\u306b\u9650\u5b9a\u3001\u307e\u305f\u306f\u610f\u5473\u306e\u3042\u308b\u57f7\u884c\u529b\u306e\u306a\u3044\u7d81\u5b9a\u898f\u5b9a\u3002",
      scale1e: "\u82f1\u56fd\uff1a\u5206\u91ce\u76e3\u7763\u6a5f\u95a2\u304cAI\u900f\u660e\u6027\u30ac\u30a4\u30c9\u30e9\u30a4\u30f3\u3092\u767a\u4ee4 \u2192 R3 = 1",
      scale2: "\u7d81\u5b9a\u30fb\u5305\u62ec\u7684",
      scale2d: "\u5206\u91ce\u3092\u8d85\u3048\u3066\u7d81\u5b9a\u7684\u306a\u6cd5\u7684\u7fa9\u52d9\u304c\u3042\u308a\u3001\u5b9f\u8cea\u7684\u306a\u57f7\u884c\u6a5f\u69cb\u3068\u610f\u5473\u306e\u3042\u308b\u7f70\u5247\u307e\u305f\u306f\u6a29\u9650\u304c\u3042\u308b\u3002",
      scale2e: "EU AI\u6cd5\uff1a\u9ad8\u30ea\u30b9\u30afAI\u306b\u5bfe\u3059\u308b\u7d81\u5b9a\u7684\u8aac\u660e\u6a29 \u2192 R3 = 2",
      s3tag: "\u7b2c3\u7ae0",
      s3h2: "\u6a29\u5229\u6b21\u5143\uff08R\uff09",
      s3sub: "AI\u306b\u3088\u308b\u640d\u5bb3\u304b\u3089\u500b\u4eba\u3092\u3069\u306e\u7a0b\u5ea6\u5f37\u304f\u4fdd\u8b77\u3059\u308b\u304b\u3092\u6e2c\u5b9a\u3057\u307e\u3059\u3002\u751f\u30b9\u30b3\u30a2\u6700\u5927\u5024\uff1a20\u3002",
      s4tag: "\u7b2c4\u7ae0",
      s4h2: "\u5e02\u5834\u6b21\u5143\uff08M\uff09",
      s4sub: "\u30ac\u30d0\u30ca\u30f3\u30b9\u304c\u81ea\u767a\u7684\u30fb\u696d\u754c\u4e3b\u5c0e\u306e\u4ed5\u7d44\u307f\u306b\u3069\u306e\u7a0b\u5ea6\u4f9d\u5b58\u3059\u308b\u304b\u3092\u6e2c\u5b9a\u3057\u307e\u3059\u3002\u751f\u30b9\u30b3\u30a2\u6700\u5927\u5024\uff1a20\u3002",
      s5tag: "\u7b2c5\u7ae0",
      s5h2: "\u4e3b\u6a29\u6b21\u5143\uff08S\uff09",
      s5sub: "\u56fd\u304cAI\u306e\u958b\u767a\u30fb\u5c0e\u5165\u3092\u3069\u306e\u7a0b\u5ea6\u6307\u5c0e\u30fb\u7ba1\u5236\u3059\u308b\u304b\u3092\u6e2c\u5b9a\u3057\u307e\u3059\u3002\u751f\u30b9\u30b3\u30a2\u6700\u5927\u5024\uff1a20\u3002",
      thCode: "\u30b3\u30fc\u30c9",
      thIndicator: "\u6307\u6a19",
      th0: "0\u70b9",
      th1: "1\u70b9",
      th2: "2\u70b9",
      tableNote: "\u6307\u6a19\u306e\u5b9a\u7fa9\u3068\u63a1\u70b9\u57fa\u6e96\u306f\u3001\u4e00\u6b21\u8cc7\u6599\u3068\u306e\u6574\u5408\u6027\u306e\u305f\u3081\u82f1\u8a9e\u306e\u307e\u307e\u3068\u3057\u3066\u3044\u307e\u3059\u3002",
      s6tag: "\u7b2c6\u7ae0",
      s6h2: "\u30b3\u30f3\u30d1\u30b9\u5ea7\u6a19\uff08rx, bx\uff09",
      s6sub: "\u30b3\u30f3\u30d1\u30b9\u8868\u793a\u306f2\u8ef8\u30b7\u30b9\u30c6\u30e0\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002\u7e26\u8ef8rx\u306f\u500b\u4eba\u306e\u6a29\u5229\u3068\u56fd\u5bb6\u7d71\u5236\u3001\u6a2a\u8ef8bx\u306f\u81ea\u767a\u7684\u30ac\u30d0\u30ca\u30f3\u30b9\u3068\u7d81\u5b9a\u7684\u30ac\u30d0\u30ca\u30f3\u30b9\u3092\u793a\u3057\u307e\u3059\u3002\u4e09\u5206\u56f3\u5ea7\u6a19\u3068\u306f\u72ec\u7acb\u3057\u3066\u5c0e\u51fa\u3055\u308c\u307e\u3059\u3002",
      s6note: "1.15\u500d\u306e\u4e57\u6570\u306f\u3001\u5927\u304d\u306a\u56fd\u306f(r\u2212s)\u304c\u4e2d\u7a0b\u5ea6\u306b\u96c6\u4e2d\u3059\u308b\u305f\u3081\u3001\u30b3\u30f3\u30d1\u30b9\u306e\u7bc4\u56f2\u3092\u3088\u308a\u6709\u52b9\u306b\u4f7f\u3046\u305f\u3081\u306brx\u8ef8\u3092\u5f35\u3070\u3057\u307e\u3059\u3002r=0.75\u3001s=0.04\u306e\u56fd\u306frx=(0.71)\u00d71.15=0.82\u3068\u306a\u308a\u3001\u6975\u7aef\u306b\u9054\u305b\u305a\u306b\u4e0a\u90e8\u306b\u914d\u7f6e\u3055\u308c\u307e\u3059\u3002",
      s7tag: "\u7b2c7\u7ae0",
      s7h2: "\u8a08\u7b97\u4f8b\u3068\u30b9\u30b3\u30a2\u30ab\u30fc\u30c9PDF",
      s7sub: "\u65e5\u672c\u3068EU\u306e\u5ea7\u6a19\u5c0e\u51fa\u3092\u4e26\u5217\u8868\u793a\u3057\u30014\u3064\u306e\u30d9\u30f3\u30c1\u30de\u30fc\u30af\u6cd5\u57df\u306e\u5168\u6307\u6a19\u30b9\u30b3\u30a2\u30ab\u30fc\u30c9\u3092\u63b2\u8f09\u3057\u307e\u3059\u3002\u5404PDF\u306fR\u30fbM\u30fbS\u306e\u3059\u3079\u3066\u306e\u6307\u6a19\u3092\u4e00\u6b21\u8cc7\u6599\u306b\u3088\u308b\u6839\u62e0\u3068\u3068\u3082\u306b\u8a18\u8f09\u3057\u307e\u3059\u3002",
      s7pdfHead: "\u5168\u6307\u6a19\u30b9\u30b3\u30a2\u30ab\u30fc\u30c9\uff08PDF\uff09",
      pdfDl: "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",
      pdfEuDesc: "30\u6307\u6a19\u3059\u3079\u3066\u306b\u6761\u6587\u30ec\u30d9\u30eb\u306e\u5f15\u7528\u3068\u63a1\u70b9\u306e\u6839\u62e0\u3092\u8a18\u8f09\u3002",
      pdfJpDesc: "30\u6307\u6a19\u3059\u3079\u3066\u306b\u4e00\u6b21\u8cc7\u6599\u306b\u3088\u308b\u63a1\u70b9\u306e\u6839\u62e0\u3092\u8a18\u8f09\u3002",
      pdfKrDesc: "\u5883\u5916\u9069\u7528\u3068\u7f70\u5247\u5206\u6790\u3092\u542b\u308030\u6307\u6a19\u3092\u8a18\u8f09\u3002",
      pdfUsDesc: "\u9023\u90a6\u884c\u653f\u547d\u4ee4\u3001\u30b3\u30ed\u30e9\u30c9SB 205\u3001\u30a4\u30ea\u30ce\u30a4BIPA\u306a\u3069\u306b\u308f\u305f\u308b30\u6307\u6a19\u3092\u8a18\u8f09\u3002",
      s8tag: "\u7b2c8\u7ae0",
      s8h2: "\u5168\u30b9\u30b3\u30a2\u8868 \u2014 79\u6cd5\u57df",
      s8sub: "2026\u5e746\u6708\u6642\u70b9\u3067\u3001\u6307\u6570\u306b\u542b\u307e\u308c\u308b\u3059\u3079\u3066\u306e\u6cd5\u57df\u306e\u751f\u6307\u6a19\u5408\u8a08\u3068\u5c0e\u51fa\u5ea7\u6a19\u3067\u3059\u3002EU\u52a0\u76df\u56fd\u306fEU AI\u6cd5\u304b\u3089\u540c\u3058R/M\u30d9\u30fc\u30b9\u30e9\u30a4\u30f3\u3092\u5171\u6709\u3057\u307e\u3059\u304c\u3001\u56fd\u5185\u30ac\u30d0\u30ca\u30f3\u30b9\u306b\u5fdc\u3058\u3066S\u6307\u6a19\u306f\u7570\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002",
      thJurisdiction: "\u6cd5\u57df",
      s9tag: "\u7b2c9\u7ae0",
      s9h2: "\u5df2\u77e5\u306e\u9650\u754c",
      lim1t: "\u5021\u8b70\u6a5f\u95a2\u3068\u30ac\u30d0\u30ca\u30f3\u30b9\u5b9f\u884c\u8005",
      lim1b: "OECD\u3068UNESCO\u306f\u81ea\u767a\u7684\u30d5\u30ec\u30fc\u30e0\u30ef\u30fc\u30af\u306e\u305f\u3081\u5e02\u5834\u5074\u306b\u63a1\u70b9\u3055\u308c\u307e\u3059\u304c\u3001\u54f2\u5b66\u7684\u306b\u306f\u6a29\u5229\u4fdd\u8b77\u578b\u3067\u3059\u3002\u7b97\u5f0f\u304c\u6e2c\u308b\u306e\u306f\u610f\u56f3\u3067\u306f\u306a\u304f\u30ac\u30d0\u30ca\u30f3\u30b9\u306e\u624b\u6bb5\u3067\u3059\u3002\u3053\u308c\u3089\u306f\u4f8b\u5916\u3068\u3057\u3066\u8a18\u8f09\u3057\u307e\u3059\u3002",
      lim2t: "\u610f\u56f3\u3068\u5b9f\u65bd\u306e\u73fe\u5b9f",
      lim2b: "\u30ab\u30ca\u30c0\u3068\u30aa\u30fc\u30b9\u30c8\u30e9\u30ea\u30a2\u306f\u6a29\u5229\u4fdd\u8b77\u306e\u4f1d\u7d71\u304c\u3042\u308a\u307e\u3059\u304c\u3001\u7acb\u6cd5\u5931\u6557\u5f8c\u306f\u7d81\u5b9a\u7684\u306aAI\u6cd5\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u7b97\u5f0f\u306f\u5fd7\u5411\u3067\u306f\u306a\u304f\u73fe\u884c\u306e\u5b9f\u65bd\u6cd5\u3092\u63a1\u70b9\u3057\u307e\u3059\u3002\u6642\u7cfb\u5217\u30c7\u30fc\u30bf\u304c\u8ecc\u8de1\u3092\u793a\u3057\u307e\u3059\u3002",
      lim3t: "\u8a55\u5b9a\u8005\u9593\u4fe1\u983c\u6027",
      lim3b: "\u6307\u6a19\u306e\u63a1\u70b9\u306b\u306f\u4e00\u6b21\u6587\u66f8\u306e\u8aad\u89e3\u304c\u5fc5\u8981\u3067\u3059\u30022\u4eba\u306e\u7814\u7a76\u8005\u304c1\u6307\u6a19\u3067\u00b11\u306e\u5dee\u304c\u751f\u3058\u3001\u5ea7\u6a19\u306f\u7d04\u00b10.02\u305a\u308c\u307e\u3059\u3002\u3053\u308c\u306f\u6587\u66f8\u30d9\u30fc\u30b9\u306e\u30ac\u30d0\u30ca\u30f3\u30b9\u6307\u6570\u306b\u4e0d\u53ef\u907f\u306a\u4e0d\u78ba\u5b9f\u6027\u3067\u3059\u3002",
      lim4t: "\u6307\u6a19\u306e\u540c\u91cd\u307f",
      lim4b: "1\u6b21\u5143\u306e10\u6307\u6a19\u306f\u3059\u3079\u3066\u540c\u91cd\u307f\u3067\u3059\u3002\u5c06\u6765\u306e\u7248\u3067\u306f\u57fa\u672c\u6307\u6a19\uff08R1\u3001S1\uff09\u306b\u3088\u308a\u9ad8\u3044\u91cd\u307f\u3092\u4ed8\u3051\u308b\u3053\u3068\u3082\u53ef\u80fd\u3067\u3059\u3002\u73fe\u884c\u306e\u540c\u91cd\u307f\u306f\u7814\u7a76\u8005\u306e\u4e3b\u89b3\u6027\u3092\u6700\u5c0f\u5316\u3059\u308b\u610f\u56f3\u7684\u306a\u9078\u629e\u3067\u3059\u3002",
      s10tag: "\u7b2c10\u7ae0",
      s10h2: "\u4e00\u6b21\u8cc7\u6599\u306e\u57fa\u6e96",
      s10sub: "\u3059\u3079\u3066\u306e\u6307\u6a19\u30b9\u30b3\u30a2\u306f\u4ee5\u4e0b\u306e\u4e00\u6b21\u8cc7\u6599\u306e\u307f\u306b\u57fa\u3065\u3044\u3066\u3044\u307e\u3059\u3002\u4e8c\u6b21\u8cc7\u6599\u3001\u30cb\u30e5\u30fc\u30b9\u3001\u30b7\u30f3\u30af\u30bf\u30f3\u30af\u306e\u8981\u7d04\u306f\u63a1\u70b9\u5165\u529b\u306b\u4f7f\u7528\u3057\u3066\u3044\u307e\u305b\u3093\u3002",
      src1: "\u56fd\u5225AI\u6cd5\u4ee4\u30fb\u898f\u5236\uff08\u653f\u5e9c\u516c\u5f0f\u30dd\u30fc\u30bf\u30eb\u30fb\u5b98\u5831\uff09",
      src2: "\u884c\u653f\u547d\u4ee4\u3001\u95a3\u8b70\u6c7a\u5b9a\u3001\u9996\u76f8\u6307\u793a",
      src3: "\u56fd\u5bb6\u76e3\u7763\u6a5f\u95a2\u304c\u767a\u3059\u308b\u7d81\u5b9a\u7684\u898f\u5236\u30ac\u30a4\u30c9\u30e9\u30f3\u30b9\uff08CAC\u3001BfDI\u3001ICO\u3001CNIL\u306a\u3069\uff09",
      src4: "\u61b2\u6cd5\u6761\u9805\u3068\u61b2\u6cd5\u88c1\u5224\u6240\u5224\u6c7a",
      src5: "\u56fd\u969b\u6761\u7d04\u3068\u653f\u5e9c\u9593\u5354\u5b9a",
      src6: "\u653f\u5e9c\u6c7a\u5b9a\u306b\u3088\u308a\u63a1\u629e\u3055\u308c\u305f\u56fd\u5225AI\u6226\u7565\uff08\u30d1\u30d6\u30ea\u30c3\u30af\u30b3\u30e1\u30f3\u30c8\u9664\u304f\uff09",
      src7: "OECD AI Policy Observatory\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\uff08\u4e92\u63db\u691c\u8a3c\uff09",
      src8: "Stanford HAI AI Index 2026\uff08\u4e8b\u5b9f\u306e\u4e8c\u6b21\u691c\u8a3c\uff09",
      callout: "<strong>\u4f4d\u7f6e \u2260 \u30e9\u30f3\u30ad\u30f3\u30b0\u3002</strong>\u7b97\u5f0f\u304c\u751f\u307f\u51fa\u3059\u306e\u306f\u826f\u3044\u304b\u60aa\u3044\u304b\u306e\u30b9\u30b3\u30a2\u3067\u306f\u306a\u304f\u3001\u4e09\u6b21\u5143\u306e\u30ac\u30d0\u30ca\u30f3\u30b9\u7a7a\u9593\u3067\u306e\u4f4d\u7f6e\u3067\u3059\u3002\u4e3b\u6a29\u5074\u306b\u914d\u7f6e\u3055\u308c\u305f\u56fd\u304c\u6a29\u5229\u5074\u3088\u308a\u60aa\u3044\u308f\u3051\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u4e00\u6b21\u6cd5\u4ee4\u306b\u8868\u308c\u305fAI\u30ac\u30d0\u30ca\u30f3\u30b9\u306e\u76ee\u7684\u306b\u95a2\u3059\u308b\u7570\u306a\u308b\u6587\u66f8\u4e0a\u306e\u54f2\u5b66\u3092\u53cd\u6620\u3057\u3066\u3044\u307e\u3059\u3002\u7b97\u5f0f\u306f\u305d\u306e\u54f2\u5b66\u3092\u53ef\u8996\u5316\u3057\u3001\u8ad6\u629b\u306e\u5bfe\u8c61\u306b\u3059\u308b\u3053\u3068\u304c\u76ee\u7684\u3067\u3059\u3002",
      backBtn: "\u2190 \u5730\u56f3\u306b\u623b\u308b",
      pageTitle: "\u65b9\u6cd5\u8ad6 \u2014 \u30b0\u30ed\u30fc\u30d0\u30ebAI\u30ac\u30d0\u30ca\u30f3\u30b9\u6307\u6570"
    }
  };

  function applyMethLang(lang) {
    var strings = t[lang] || t.en;
    currentLang = lang === "ja" ? "ja" : "en";
    document.documentElement.lang = currentLang;
    document.title = strings.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (strings[key] != null) el.textContent = strings[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (strings[key] != null) el.innerHTML = strings[key];
    });

    var btn = document.getElementById("meth-lang-btn");
    if (btn) {
      btn.textContent = currentLang === "ja" ? t.en.langBtn : t.ja.langBtn;
      btn.classList.toggle("ja", currentLang === "ja");
    }
    if (typeof window.renderMethIndicatorTables === "function") {
      window.renderMethIndicatorTables(currentLang);
    }
  }

  function toggleMethLang() {
    var next = currentLang === "ja" ? "en" : "ja";
    applyMethLang(next);
  }

  window.toggleMethLang = toggleMethLang;

  document.addEventListener("DOMContentLoaded", function () {
    applyMethLang("en");
  });
})();
