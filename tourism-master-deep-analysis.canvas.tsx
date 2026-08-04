import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

/** 分区标题组件：统一章节层级 */
function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Stack gap={4}>
      <H2>{title}</H2>
      {subtitle ? (
        <Text tone="secondary" size="small">
          {subtitle}
        </Text>
      ) : null}
    </Stack>
  );
}

/** 模式切换：演示 A vs 全栈 B */
type DataMode = "A" | "B";

export default function TourismMasterDeepAnalysis() {
  const theme = useHostTheme();
  const [mode, setMode] = useCanvasState<DataMode>("data-mode", "A");

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1100 }}>
      {/* 页眉 */}
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1>Tourism Master 深度分析</H1>
          <Pill tone="success" size="sm">
            Wave 1–2 Done
          </Pill>
          <Pill tone="info" size="sm">
            Mock-only Demo
          </Pill>
        </Row>
        <Text tone="secondary">
          山西文旅双语小程序 · 三端架构审查 · 源码与 ADR/CONTEXT 对齐 · 未改业务代码
        </Text>
        <Text tone="tertiary" size="small">
          路径：D:\OneDrive\Desktop\project\tourism-master · 分析基准：仓库文档 +
          tourism_admin / tourism_api / tourism_weapp
        </Text>
      </Stack>

      {/* 概览指标 */}
      <Grid columns={4} gap={12}>
        <Stat value="3" label="端（Admin / API / Weapp）" />
        <Stat value="6" label="P0 山西景区（Mock/Seed）" tone="success" />
        <Stat value="A" label="演示默认数据模式" tone="info" />
        <Stat value="86/85" label="API / Admin 本地端口" />
      </Grid>

      <Callout tone="info" title="一句话定位">
        基于闲鱼购得的 Snowy（Spring Boot + Vue3 + UniApp）旅游模板二次开发：产品主线收敛为「景区介绍
        + 中英双语服务」，同学演示默认 Mock-only（ADR-0003），Mode B（真 API）代码保留、运行时后置。
      </Callout>

      {/* 1. 概览 */}
      <SectionTitle
        title="1. 项目概览"
        subtitle="产品边界、阶段状态与交付口径"
      />
      <Grid columns="1.2fr 1fr" gap={12}>
        <Card>
          <CardHeader>产品主线</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>
                面向入境游客与中文用户，用中英双语讲清山西景区故事与跨文化现场话术。
              </Text>
              <Table
                headers={["能力", "职责"]}
                rows={[
                  ["景区介绍", "列表/详情：名称、简介、看点、开放与交通"],
                  ["语言偏好", "全局 zh ↔ en；壳文案与内容字段同步"],
                  ["文化解读", "礼仪、历史语境、参观提示"],
                  ["双语服务", "通用话术 + 景区专属话术"],
                  ["首页热点", "homeRecommendations → 景区热点（非 biz_recommend）"],
                  ["数据接入", "演示 Mode A；Mode B 资产保留"],
                ]}
                rowTone={[
                  "neutral",
                  "neutral",
                  "neutral",
                  "neutral",
                  "info",
                  "success",
                ]}
              />
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>明确不做（业务边界）</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text tone="secondary">· 真实支付 / 库存核销</Text>
              <Text tone="secondary">· 完整行程规划 OTA</Text>
              <Text tone="secondary">· 日韩等多语言扩展</Text>
              <Text tone="secondary">· 语音讲解 / AR / 深度地图</Text>
              <Text tone="secondary">· 公网权限与云部署（演示后置）</Text>
              <Divider />
              <Text size="small" tone="tertiary">
                订票/评论等模板入口可保留，但不纳入同学演示验收。
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader
          trailing={
            <Row gap={6}>
              <Pill tone="success" size="sm">
                Wave 0–2 ✅
              </Pill>
              <Pill tone="warning" size="sm">
                Wave 3 ⚪
              </Pill>
            </Row>
          }
        >
          路线图快照
        </CardHeader>
        <CardBody>
          <Table
            headers={["阶段", "状态", "说明"]}
            rows={[
              ["Wave 0", "✅", "仓库资产 / 调研 / ADR"],
              ["Wave 1", "✅", "小程序双语主链路 + Mock 闭环"],
              ["Wave 2", "✅", "API Seed、双语查询、管理端双语表单（运行时冻结）"],
              ["概况/遗产 SD-15", "🔜", "另开任务"],
              ["Wave 3 模式 C", "⚪", "完整内容运营，需独立 ADR/PRD"],
            ]}
            rowTone={["success", "success", "success", "warning", "neutral"]}
          />
        </CardBody>
      </Card>

      {/* 2. 技术栈 */}
      <SectionTitle title="2. 技术栈" subtitle="三端与运行环境" />
      <Table
        headers={["层级", "技术", "路径 / 备注"]}
        rows={[
          [
            "用户端",
            "UniApp（Vue2 运行时）+ ColorUI + 微信小程序",
            "tourism_weapp/ · HBuilderX 主推",
          ],
          [
            "管理端",
            "Vue 3.3 · Vite 5 · Ant Design Vue 3.2 · Pinia · TS",
            "tourism_admin/ · 端口 85",
          ],
          [
            "后端",
            "Spring Boot 2.5.12 · MyBatis-Plus · Sa-Token · Knife4j",
            "tourism_api/ · Snowy 2.0.0 · 端口 86",
          ],
          ["数据", "MySQL 8（库 tourism）· Redis", "Mode B / 全栈时需要"],
          ["构建", "JDK 8 · Maven 3.6+ · Node 18+ · pnpm 优先", "演示可仅开 Weapp"],
        ]}
      />
      <Callout tone="warning" title="版本约束">
        后端锁定 Java 8 / Spring Boot 2.5；勿擅自升 JDK 21。管理端品牌文案仍残留「黄山旅游助手」（.env.development），与山西产品叙事未完全对齐。
      </Callout>

      {/* 3. 目录 */}
      <SectionTitle title="3. 目录结构" subtitle="仓库级与三端关键路径" />
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>仓库根</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">CONTEXT.md / CONTEXT-MAP.md — 产品域与多端地图</Text>
              <Text size="small">AGENTS.md / CLAUDE.md — Agent 纪律</Text>
              <Text size="small">docs/adr — ADR-0001~0003（双语、Mode B、Mock 冻结）</Text>
              <Text size="small">docs/contexts — weapp / admin / api 分端约定</Text>
              <Text size="small">docs/outputs — report / prd / handoff / commit-history</Text>
              <Text size="small">tourism_* — 三端工程本体</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>规模（排除 node_modules/target/unpackage）</CardHeader>
          <CardBody>
            <Table
              headers={["端", "约文件数", "核心入口"]}
              rows={[
                ["tourism_admin/src", "~559", "src/views/biz、src/api"],
                ["tourism_api", "~608", "snowy-web-app、snowy-plugin-*"],
                ["tourism_weapp", "~130", "pages、services、mock/scenic"],
              ]}
            />
          </CardBody>
        </Card>
      </Grid>

      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader>tourism_weapp</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">pages/ — home · spot · service · strategy · user</Text>
              <Text size="small">services/ — Repository · Adapter · locale</Text>
              <Text size="small">mock/scenic/ — 10 个 JSON 数据源</Text>
              <Text size="small">api/ — 模板 API + scenicBilingualApi</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>tourism_api</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">snowy-web-app — 启动与配置</Text>
              <Text size="small">snowy-plugin-client — /client/c/** 小程序侧</Text>
              <Text size="small">snowy-plugin-biz — 管理端业务实体</Text>
              <Text size="small">sql/ — 00→05 + Wave2 seed</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>tourism_admin</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">views/biz — spot / ticket / order / …</Text>
              <Text size="small">api/biz/spotApi — /biz/spot/</Text>
              <Text size="small">locales · store · router — Snowy 壳</Text>
              <Text size="small">.env.* — VITE_API_BASEURL→:86</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      {/* 4. 核心模块 */}
      <SectionTitle
        title="4. 核心模块"
        subtitle="二次开发焦点 vs 模板遗产能力"
      />
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>二次开发主战场（山西双语）</CardHeader>
          <CardBody>
            <Table
              headers={["模块", "位置"]}
              rows={[
                ["景区 Repository / Adapter", "weapp/services/scenic*.js"],
                ["Mock 景区包", "weapp/mock/scenic/*.json"],
                ["Locale / 壳文案", "weapp/services/locale.js · shellCopy.js"],
                ["游客双语 API", "api …/WxSpotBilingualController"],
                ["biz_spot 双语实体", "api …/spot/entity/Spot.java"],
                ["管理端双语表单", "admin …/views/biz/spot/form.vue"],
                ["Wave2 DDL/Seed", "api/sql/wave2_*.sql · 02_biz_spot_full.sql"],
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>模板保留模块（非演示主线）</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small" weight="semibold">
                Weapp 页面
              </Text>
              <Text size="small" tone="secondary">
                strategy · prebook · order · comment · plan · news · recommend（美食住宿类）· user
                登录注册
              </Text>
              <Text size="small" weight="semibold">
                API client 包
              </Text>
              <Text size="small" tone="secondary">
                wxorder · wxtitck · wxplan · wxstrategy · wxrecommend · wxuser · wxindex
              </Text>
              <Text size="small" weight="semibold">
                Admin biz
              </Text>
              <Text size="small" tone="secondary">
                ticket · order · comment · history · doings · recommend · heritage · analysis · user
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>首批 6 个 P0 景区（slug）</H3>
      <Table
        headers={["Slug", "景区"]}
        rows={[
          ["yungang-grottoes", "云冈石窟"],
          ["wutai-mountain", "五台山"],
          ["pingyao-ancient-city", "平遥古城"],
          ["jinci-temple", "晋祠"],
          ["hukou-waterfall", "黄河壶口瀑布（山西侧）"],
          ["xuankong-temple", "悬空寺"],
        ]}
      />

      {/* 5. 架构与数据流 */}
      <SectionTitle
        title="5. 三端架构与数据流"
        subtitle="切换 Mode A / Mode B 查看运行时路径"
      />
      <Row gap={8} align="center" wrap>
        <Text weight="semibold">数据模式：</Text>
        <Pill
          tone={mode === "A" ? "success" : "neutral"}
          active={mode === "A"}
          onClick={() => setMode("A")}
        >
          Mode A · Mock-only（演示默认）
        </Pill>
        <Pill
          tone={mode === "B" ? "info" : "neutral"}
          active={mode === "B"}
          onClick={() => setMode("B")}
        >
          Mode B · API 优先（后置）
        </Pill>
        <Spacer />
        <Text size="small" tone="tertiary">
          开关：tourism_weapp/services/scenicDataSource.js → USE_SCENIC_MOCK
        </Text>
      </Row>

      {mode === "A" ? (
        <Card>
          <CardHeader>Mode A 数据流（当前演示）</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <Text>
                页面 → scenicRepository → mock/scenic JSON → scenicAdapter（按 locale
                产出 ViewModel）→ UI。不经过 Token http 主链路。
              </Text>
              <Table
                headers={["步骤", "组件", "说明"]}
                rows={[
                  ["1", "pages/home|spot|service|…", "调用 getHomeHotspots / getSpotCatalog / …"],
                  ["2", "scenicDataSource", "USE_SCENIC_MOCK=true → 跳过 API"],
                  ["3", "scenicRepository", "读 spotCatalog/spots/homeRecommendations/…"],
                  ["4", "scenicAdapter + locale", "nameZh/nameEn → 当前语言字段；slug 导航"],
                  ["5", "订票/评论（可选）", "仍走原 api/* + Token；演示不验收"],
                ]}
                rowTone={["info", "success", "success", "success", "neutral"]}
              />
              <Callout tone="success" title="演示机只需">
                HBuilderX 打开 tourism_weapp → 微信开发者工具；无需 MySQL / Redis / JDK。
              </Callout>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>Mode B 数据流（资产已就绪，运行时冻结）</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <Text>
                Admin CRUD → MySQL biz_spot → Client 双语 API → Weapp Repository（API 优先，失败回退
                Mock）。
              </Text>
              <Table
                headers={["端", "路径", "契约"]}
                rows={[
                  [
                    "Admin",
                    "views/biz/spot → /biz/spot/*",
                    "维护 spotName/En、slug、摘要、bilingual 扩展",
                  ],
                  [
                    "API",
                    "GET /client/c/spot/bilingual/{catalog|detail|hotspots}",
                    "locale=zh|en；detail 按 slug；白名单免登",
                  ],
                  [
                    "Weapp",
                    "scenicBilingualApi → Repository",
                    "USE_SCENIC_MOCK=false；失败 console.warn 后 Mock 回退",
                  ],
                  [
                    "DB",
                    "biz_spot + Wave2 seed",
                    "slug 唯一幂等；成对双语列 + bilingual_json",
                  ],
                ]}
                rowTone={["info", "info", "info", "warning"]}
              />
              <Callout tone="warning" title="启用条件">
                置 USE_SCENIC_MOCK=false，并完成本机 SQL 导入 + Redis + spring-boot:run（:86）。建议在独立分支
                feat/mode-b-live 推进。
              </Callout>
            </Stack>
          </CardBody>
        </Card>
      )}

      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader>Weapp 分层</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">UI pages（home/spot/service…）</Text>
              <Text size="small">→ scenicRepository（统一入口）</Text>
              <Text size="small">→ Adapter / Mock / API</Text>
              <Text size="small">约定：禁止页面散落 import 多个 scenic JSON</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>API 分层（Snowy）</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">snowy-web-app（端口/安全白名单）</Text>
              <Text size="small">plugin-client（C 端接口）</Text>
              <Text size="small">plugin-biz（实体/管理 API）</Text>
              <Text size="small">plugin-auth/sys/dev（框架能力）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Admin 分层</CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">Vue Router + 动态菜单</Text>
              <Text size="small">api/* → axios → :86</Text>
              <Text size="small">Sa-Token 会话（管理端登录）</Text>
              <Text size="small">不直连小程序 client 接口</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      {/* 6. 如何运行 */}
      <SectionTitle title="6. 如何运行" subtitle="演示路径 vs 全栈后置" />
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>同学演示（推荐）</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>1. HBuilderX 打开 tourism_weapp</Text>
              <Text>2. 运行到微信开发者工具</Text>
              <Text>3. 勾选「不校验合法域名」（如提示）</Text>
              <Text>4. 验收：语言切换 → 热点 → 详情 → 话术 / 概况 / 遗产</Text>
              <Divider />
              <Text size="small" tone="tertiary">
                动态字段带 UNVERIFIED 免责声明，勿当作实时官方信息。
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>本机全栈（后置）</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">MySQL 8 + Redis → 依序导入 sql/00→05 + Wave2 seed</Text>
              <Text size="small">JDK 8：tourism_api → mvn clean install -DskipTests</Text>
              <Text size="small">snowy-web-app → mvn spring-boot:run（:86）</Text>
              <Text size="small">tourism_admin → pnpm install && pnpm dev（:85）</Text>
              <Text size="small">账号 admin / 123456 · Knife4j /doc.html</Text>
              <Divider />
              <Text size="small" tone="tertiary">
                详见 tourism_api/sql/README.md 与根 README「本机全栈」。
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      {/* 7. 亮点 */}
      <SectionTitle title="7. 亮点" subtitle="工程与产品上的可取之处" />
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>产品主线收敛清楚</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              从通用 OTA 模板收敛到「景区介绍 + 双语服务」，边界表写进 README/CONTEXT。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Mock-first 演示策略</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              ADR-0003 降低同学演示失败面；Mode B 代码与 SQL 不删，资产可复用。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Repository / Adapter 分层</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              页面只打 Repository；slug 导航 + locale ViewModel，模式切换成本可控。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>文档与 Agent 体系完整</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              CONTEXT-MAP、分端 CONTEXT、ADR、PRD、handoff、调研包形成可交接真相源。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>三端字段已贯通设计</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              Wave2 双语列、游客免登 API、管理端 zh/en 表单形成 Mode B 闭环骨架。
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>数据可替换意识</CardHeader>
          <CardBody>
            <Text tone="secondary" size="small">
              UNVERIFIED 标记、slug 幂等 Seed、Mock 与 API 契约对齐，利于后续换真数据。
            </Text>
          </CardBody>
        </Card>
      </Grid>

      {/* 8. 风险与改进 */}
      <SectionTitle
        title="8. 风险与改进建议"
        subtitle="按优先级排列；不涉及本次改代码"
      />
      <Table
        headers={["优先级", "风险 / 缺口", "建议"]}
        rows={[
          [
            "P0",
            "默认密钥入仓（DB root/123456、Druid、admin/123456）",
            "本地改密 + 示例 properties；生产密钥走环境变量；轮换演示账号",
          ],
          [
            "P0",
            "Spring Boot 2.5 / 依赖年代久远（安全补丁压力）",
            "Mode B 上线前做依赖 CVE 盘点；升级需独立 ADR",
          ],
          [
            "P1",
            "模板遗产页面多，与山西主线并存易误导演示/评审",
            "演示脚本隐藏订票订单；或加「主线/遗产」导航分组",
          ],
          [
            "P1",
            "Admin 标题仍为「黄山旅游助手」等模板品牌残留",
            "统一山西品牌文案与 README Showcase 截图",
          ],
          [
            "P1",
            "Mode A/B 双轨：服务话术等仍大量依赖本地 Mock 富化",
            "Mode B 分支补齐服务条目 CMS 或完整 API 装配",
          ],
          [
            "P2",
            "Weapp 偏 Vue2 UniApp 运行时，与 Admin Vue3 心智分裂",
            "长期评估 uni-app Vue3 迁移；短期保持二次开发优先",
          ],
          [
            "P2",
            "自动化测试/CI 对三端主链路覆盖不足",
            "至少为 Repository Adapter 与 bilingual API 补契约测试",
          ],
          [
            "P2",
            "概况/遗产与 Wave3 CMS 仍 open",
            "按 roadmap 开独立 PRD；避免在演示分支扩 scope",
          ],
        ]}
        rowTone={[
          "danger",
          "danger",
          "warning",
          "warning",
          "warning",
          "neutral",
          "neutral",
          "info",
        ]}
      />

      <Callout tone="neutral" title="分析范围说明">
        本画布基于仓库内 README、CONTEXT、ADR 与三端源码结构只读梳理；未启动服务、未改业务代码。交互状态（Mode
        A/B）仅影响画布展示路径说明。
      </Callout>

      <Text tone="tertiary" size="small">
        生成时间：2026-08-04 · 画布文件：tourism-master-deep-analysis.canvas.tsx
      </Text>
    </Stack>
  );
}
