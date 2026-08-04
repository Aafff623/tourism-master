# 山西景区 Mock 数据调研报告（中英双语数据版）

> 说明：本报告与 JSON 内容一致。动态信息以 `UNVERIFIED` 标注，不可直接视作实时运营事实。

## 1. spotCatalog：候选景区与优先级

| 优先级 | 中文名 | English | 城市 | 入境游客价值 | 数据对象建议 |
|---|---|---|---|---|---|
| P0 | 云冈石窟 | Yungang Grottoes | 大同市 / Datong | 国际辨识度最高的山西文化遗产之一，适合展示佛教艺术传播、跨文化融合与文物保护。 | 单独成条。洞窟群本身就是完整目的地。 |
| P0 | 五台山 | Mount Wutai | 忻州市 / Xinzhou | 兼具宗教礼仪、山地气候与文化景观，最能体现入境游客需要的礼仪和实用服务。 | 单独成条；寺院作为子景点。 |
| P0 | 平遥古城 | Ancient City of Ping Yao | 晋中市 / Jinzhong | 可同时承载古城导览、票号金融史、民居住宿、饮食和慢行交通等多种功能模块。 | 单独成条；城墙、县衙、日昇昌等作为看点，双林寺和镇国寺可作关联子条目。 |
| P0 | 晋祠 | Jinci Temple | 太原市 / Taiyuan | 位于省会、交通便利，可作为理解山西古建筑、祠庙文化和水景园林的入门站。 | 单独成条；评级可关联“晋祠—天龙山景区”，但数据对象不要与天龙山混为一体。 |
| P0 | 黄河壶口瀑布（山西侧） | Hukou Waterfall of the Yellow River (Shanxi Side) | 临汾市 / Linfen | 补足自然景观与黄河文化，适合展示天气、流量、临时关闭和安全提醒等动态信息。 | 单独成条，并明确“山西侧”，避免与陕西侧入口、票务和交通混淆。 |
| P0 | 悬空寺 | Hanging Temple | 大同市 / Datong | 视觉识别度极高，且容量限制、登临票、狭窄栈道和天气管控非常适合做精细化游客提示。 | 建议单独成条，同时关联恒山景区。 |
| P1 | 乔家大院 | Qiao Family Compound | 晋中市 / Jinzhong | 适合补充晋商家庭、院落空间和民俗展陈，但与平遥在主题上部分重叠。 | 单独成条。 |
| P1 | 王家大院 | Wang Family Compound | 晋中市 / Jinzhong | 建筑规模和雕刻细节丰富，适合作为深度古建内容，但首版可由平遥和晋祠覆盖主要叙事。 | 单独成条。 |
| P1 | 应县木塔 | Wooden Pagoda of Yingxian | 朔州市 / Shuozhou | 世界级木构奇迹，适合古建专题；但与大同北线联动后再加入更利于行程设计。 | 单独成条。 |
| P1 | 雁门关 | Yanmen Pass | 忻州市 / Xinzhou | 可补充边塞和长城叙事，但对英文历史语境要求较高，适合第二阶段。 | 单独成条。 |
| P1 | 皇城相府 | Imperial City of the Xiangfu | 晋城市 / Jincheng | 有独特的官宦住宅与防御聚落价值，但地理上远离首版主线路。 | 单独成条。 |
| P1 | 解州关帝庙 | Guandi Temple at Haizhou | 运城市 / Yuncheng | 能补充运城和关公跨东亚文化传播，但需要更细致的宗教与历史解释。 | 单独成条。 |

### 六个 P0 的保留逻辑

- 保留云冈、五台山、平遥：三个世界文化遗产构成国际认知主轴。
- 保留晋祠：补齐太原，并提供古建筑入门场景。
- 保留壶口：补齐临汾与自然/黄河主题，并测试动态开放状态。
- 保留悬空寺：视觉辨识度高，限流、登临和安全信息对产品功能有代表性。
- P1 并非不重要，而是首版需控制地理跨度和内容重复。

## 2. spots[]：六个 P0 完整对象

### 云冈石窟 / Yungang Grottoes (`yungang-grottoes`)

**城市：** 大同市 / Datong  
**级别：** 世界文化遗产（2001）；国家5A级旅游景区；全国重点文物保护单位。5A状态应在上线前用文化和旅游主管部门最新名录复核。  
**Summary ZH：** 云冈石窟位于大同西郊，是中国早期佛教石窟艺术的重要代表。数百座洞窟与数万尊造像集中展示了5至6世纪佛教艺术由中亚、南亚传播并在中国本土化的过程，昙曜五窟尤具代表性。  
**Summary EN：** Located west of Datong, the Yungang Grottoes are a landmark of early Chinese Buddhist cave art. Hundreds of caves and tens of thousands of figures reveal how artistic ideas from South and Central Asia were transformed in China during the fifth and sixth centuries. The Tanyao Five Caves form the best-known core of the site.  

**介绍（中文）**  
云冈石窟开凿于北魏时期，是理解大同作为北魏都城以及佛教艺术跨区域传播的关键遗产。联合国教科文组织资料记载，这里保存有252座洞窟和约5.1万尊造像。大型佛像、窟内浮雕、装饰纹样与建筑式样共同反映了不同文化传统的交流与重构。参观时不应只关注“最大的佛像”，还可以观察造像服饰、面部风格和洞窟布局如何随年代变化。由于石雕长期受到风化、水汽和游客环境影响，现场常按洞窟实施开放、拍摄和客流管理。小程序应把历史解读、保护原因和当日开放提示放在同一页面。

**Introduction (English)**  
Carved during the Northern Wei period, Yungang is essential for understanding Datong’s role as an imperial capital and the cross-regional movement of Buddhist art. UNESCO records 252 caves and about 51,000 statues. Monumental Buddhas, reliefs, decorative patterns and architectural motifs show how multiple artistic traditions were exchanged and reinterpreted. Visitors should look beyond the largest statues and notice how clothing, facial styles and cave layouts change across periods. Because the sandstone is vulnerable to weathering, moisture and visitor impact, individual caves may have photography, access or crowd restrictions. The app should present historical meaning, conservation reasons and same-day access information together.

**看点 / Highlights**
- 昙曜五窟：云冈早期大型洞窟的核心代表。 / Tanyao Five Caves: the defining group of Yungang’s early monumental caves.
- 第20窟露天大佛：云冈最具辨识度的视觉形象之一。 / The open-air Buddha of Cave 20: one of Yungang’s most recognizable images.
- 造像风格变化：可观察外来艺术因素与中国传统逐步融合。 / Changing sculptural styles: trace the gradual fusion of imported and Chinese artistic traditions.
- 云冈博物馆与数字展示：适合补充洞窟保护和考古知识。 / Museum and digital interpretation: useful for understanding archaeology and conservation.

- 开放 / Opening: UNVERIFIED：通常按日间开放并区分季节，停止入园时间早于闭园时间；部分洞窟可能轮换或临时关闭。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: The site normally operates during daytime with seasonal schedules, and last admission is earlier than closing time. Individual caves may rotate or close temporarily. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：实行收费参观，常见成人票价区间约为人民币100～150元；可能使用实名预约，优惠政策和讲解服务另行计算。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Paid admission is required; a typical adult range is approximately RMB 100–150. Real-name booking may be used, and concessions or guide services may follow separate rules. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 可先到大同南站或大同云冈机场，再通过市内公交、出租车或网约车前往大同西部的景区。返程时应提前确认公交末班时间；跨城一日游建议预留安检、取票和步行时间。 / Reach Datong via Datong South Railway Station or Datong Yungang Airport, then continue west by city bus, taxi or ride-hailing service. Check the last public bus in advance and allow time for security checks, ticket verification and walking.
- 季节 / Best season: 春秋温度较舒适；大同冬季寒冷、风大，夏季日照较强。洞窟参观以室内和半室外为主，但景区步行距离仍需考虑。 / Spring and autumn are generally comfortable. Datong winters are cold and windy, while summer sunlight can be strong. Much of the visit is inside or near caves, but the site still involves substantial outdoor walking.
- 提示 / Tips: 禁止触摸造像和岩壁；是否允许拍照以每个洞窟入口标识为准，默认关闭闪光灯。热门洞窟可能排队和限时停留。英文讲解器、人工讲解和无障碍路线应在游客中心再次确认。 / Do not touch statues or rock surfaces. Follow the sign at each cave for photography and keep flash off by default. Popular caves may require queuing and limited viewing time. Reconfirm English audio guides, staffed tours and accessible routes at the visitor center.

**文化解读 / Cultural notes**
- **为什么云冈具有国际意义 / Why Yungang Matters Internationally**：云冈不是孤立的地方艺术，而是佛教图像、帝国政治和丝路交流在中国北方汇合的结果。 / Yungang is not an isolated local style; it reflects the meeting of Buddhist imagery, imperial power and Silk Road exchange in northern China.
- **洞窟内拍摄与保护 / Photography and Conservation Inside Caves**：光线、拥堵和触摸都会增加脆弱石雕与彩绘的保护压力。 / Light, crowding and touching add pressure to fragile stone and surviving pigments.
- **热门洞窟排队 / Queues at Popular Caves**：核心洞窟在节假日可能限流，排队位置与开放状态会动态变化。 / Core caves may use capacity limits on busy days, and queue locations or access can change.

### 五台山 / Mount Wutai (`mount-wutai`)

**城市：** 忻州市 / Xinzhou  
**级别：** 世界文化遗产（2009）；国家5A级旅游景区；国家级风景名胜区。当前门票及车辆预约政策需上线前复核。  
**Summary ZH：** 五台山由五座台顶及台怀镇寺院群构成，是文殊信仰的重要中心，也是汉传与藏传佛教传统共同存在的文化景观。这里既是宗教目的地，也是高海拔山地景区，参观需要同时考虑礼仪、气候和交通。  
**Summary EN：** Mount Wutai is a cultural landscape formed by five broad summits and a major monastic center around Taihuai. It is closely associated with devotion to Manjusri and includes both Chinese and Tibetan Buddhist traditions. Visitors need to consider religious etiquette, mountain weather and local transport together.  

**介绍（中文）**  
五台山不是单一山峰，而是一组环绕台怀盆地的山地与寺院。联合国教科文组织将其价值概括为佛教建筑、宗教传统与自然地形长期互动形成的文化景观。显通寺、塔院寺、菩萨顶、殊像寺等集中在台怀镇周边，佛光寺则以唐代木构建筑闻名，但与核心游览区距离较远。外国游客应理解，寺院既是文化遗产，也是仍在使用的宗教空间。部分殿堂会举行法会或日常修持，参观行为应服从现场秩序。景区海拔较高，天气变化快，冬季和肩季可能出现冰雪、低温及道路交通管制，因此小程序应把礼仪卡、天气预警、接驳交通和寺院开放状态联动展示。

**Introduction (English)**  
Mount Wutai is not a single peak but a mountain-and-monastery landscape surrounding the Taihuai basin. UNESCO describes its value through the long interaction of Buddhist architecture, living religious traditions and natural topography. Xiantong Temple, Tayuan Temple, Pusa Ding and Shuxiang Temple cluster around Taihuai, while Foguang Temple—famous for its Tang timber hall—is farther from the main visitor area. International visitors should recognize that the monasteries are both heritage places and active religious spaces. Halls may host ceremonies or daily practice, and visitor behavior must follow on-site arrangements. The high elevation brings rapid weather changes, while winter and shoulder seasons can involve snow, cold and road controls. The app should therefore connect etiquette, weather warnings, shuttles and monastery opening information.

**看点 / Highlights**
- 台怀寺院群：步行即可串联多座代表性寺院。 / Taihuai monastery cluster: several major temples can be linked on foot.
- 塔院寺白塔：五台山最醒目的地标之一。 / The Great White Pagoda at Tayuan Temple: one of Mount Wutai’s defining landmarks.
- 菩萨顶：体现藏传佛教建筑与朝圣传统。 / Pusa Ding: an important expression of Tibetan Buddhist architecture and pilgrimage.
- 佛光寺：以唐代东大殿著名，适合古建筑专题，但交通需单独规划。 / Foguang Temple: renowned for its Tang-period East Main Hall; ideal for an architecture-focused visit but requires separate transport planning.

- 开放 / Opening: UNVERIFIED：景区道路、游客中心与各寺院并非完全统一时段；寺院多在日间开放，宗教活动、维护和天气可能影响进入。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Scenic-area roads, visitor facilities and individual monasteries do not necessarily share one schedule. Temples generally open during daytime, but ceremonies, maintenance and weather may affect access. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：常见景区门票区间约为人民币100～150元；景交车、部分寺院或特定线路可能另行收费。车辆预约和进山规则可能随客流调整。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: A typical scenic-area admission range is approximately RMB 100–150. Shuttles, selected monasteries or special routes may be charged separately. Vehicle reservation and mountain-entry rules can change with visitor volume. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 可由太原、忻州方向乘长途客运或包车前往，也可经五台山机场再转公路交通。铁路站点名称容易造成误解，购票前应核对车站与台怀镇的实际距离。进入景区后通常还需步行或使用景交。 / Travel by coach or hired vehicle from Taiyuan or Xinzhou, or continue by road from Wutaishan Airport. Railway station names can be misleading, so verify the actual distance to Taihuai before booking. Within the scenic area, walking or local shuttles are normally still required.
- 季节 / Best season: 5月至10月相对适合普通观光，但早晚仍可能较冷；冬季冰雪、强风和极低温明显。台顶天气与台怀镇可能差异很大。 / May to October is generally more suitable for ordinary sightseeing, though mornings and evenings can remain cold. Winter brings snow, strong winds and very low temperatures. Summit conditions may differ sharply from Taihuai.
- 提示 / Tips: 进入殿堂前查看拍摄和着装标识；不要打断诵经、法会或礼佛。香火和捐赠均自愿。高海拔、台阶和长距离步行对老人及儿童有负担，应提前确认接驳和休息点。 / Check photography and dress signs before entering halls. Do not interrupt chanting, ceremonies or worship. Incense and donations are optional. Elevation, stairs and long walking distances can be demanding for older visitors and children, so confirm shuttles and rest points in advance.

**文化解读 / Cultural notes**
- **活态寺院不是普通展厅 / A Living Monastery Is Not an Ordinary Exhibition Hall**：五台山寺院仍承担宗教功能，游客与僧众、信众共享空间。 / Mount Wutai’s monasteries remain active religious institutions shared by visitors, monastics and worshippers.
- **高海拔与快速变天 / Elevation and Rapid Weather Change**：台顶与台怀镇温度、风力和道路条件可能明显不同。 / Temperature, wind and road conditions can differ significantly between the summits and Taihuai.
- **寺院分散与景交换乘 / Dispersed Monasteries and Shuttle Transfers**：核心寺院较集中，但台顶、佛光寺等需要不同交通计划。 / Core monasteries cluster together, while the summits and Foguang Temple require different transport plans.

### 平遥古城 / Ancient City of Ping Yao (`ancient-city-pingyao`)

**城市：** 晋中市 / Jinzhong  
**级别：** 世界文化遗产（1997，遗产范围包含古城、双林寺和镇国寺）；国家5A级旅游景区。最新通票范围需复核。  
**Summary ZH：** 平遥古城完整保存了明清县城格局，并见证了19世纪中国票号金融网络的兴盛。古城街巷、城墙、县衙、票号和传统院落共同构成可步行体验的历史城市，适合用双语内容解释城市规划与晋商文化。  
**Summary EN：** Pingyao preserves the urban form of a Ming–Qing county town and records the rise of China’s nineteenth-century draft-bank network. Its streets, walls, government office, banking houses and courtyard residences create a walkable historic city, ideal for bilingual interpretation of urban planning and Shanxi merchant culture.  

**介绍（中文）**  
平遥古城的价值不只是“保存完好的老街”，而是城墙、街道、公共建筑、商号和居民生活共同延续的历史城市系统。古城以南大街等街巷为骨架，城墙、平遥县衙、文庙、城隍庙和日昇昌票号等展示了传统行政、礼制、商业与社区空间。19世纪票号通过异地汇兑和信用网络服务跨区域贸易，是外国游客理解中国早期金融史的重要切入点。古城街道本身通常可进入，但主要收费景点往往采用联票；双林寺和镇国寺属于世界遗产组成部分，却位于城外，需要额外交通。小程序应将“古城免费步行区域”“通票景点”“城外关联遗产”分层展示，避免游客误以为购买一张票即可覆盖全部地点。

**Introduction (English)**  
Pingyao is more than a well-preserved old street. Its walls, road network, public institutions, commercial houses and resident life form a continuing historic urban system. South Street and surrounding lanes connect the city wall, county government office, Confucian and City God temples, and the Rishengchang draft bank, revealing how administration, ritual, commerce and community were organized. In the nineteenth century, draft banks supported long-distance trade through remittance and credit networks, giving international visitors an accessible entry into early Chinese financial history. The streets are generally open, while major monuments commonly use a joint pass. Shuanglin and Zhenguo Temples are components of the World Heritage property but lie outside the walled city and require separate transport. The app should clearly separate free walking areas, joint-pass attractions and outlying related heritage.

**看点 / Highlights**
- 明清古城墙：可观察完整防御与城市边界。 / Ming–Qing city wall: a clear view of historic defense and urban boundaries.
- 日昇昌票号：理解中国早期跨区域汇兑。 / Rishengchang Draft Bank: an introduction to early interregional remittance.
- 平遥县衙：展示传统县级行政与司法空间。 / Pingyao County Government Office: traditional county administration and justice.
- 南大街与市楼：古城商业轴线和标志性城市景观。 / South Street and Market Tower: the commercial axis and signature cityscape.
- 双林寺、镇国寺：城外世界遗产组成部分，适合深度路线。 / Shuanglin and Zhenguo Temples: outlying World Heritage components for a deeper route.

- 开放 / Opening: UNVERIFIED：古城公共街巷通常可步行进入；收费景点按日间时段开放，旺淡季和停止检票时间不同。夜间灯光与商业营业不等于文物景点开放。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Public streets are generally walkable, while ticketed monuments operate during daytime with seasonal schedules and earlier last-entry times. Evening lighting or shop opening does not mean heritage interiors are open. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：进入公共街区通常不收古城大门票，城墙、县衙、票号等主要景点常使用约人民币100～150元区间的联票；双林寺、镇国寺及演出可能另购。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Public streets generally have no city-gate admission fee. Major monuments such as the wall, county office and draft banks commonly use a joint pass in the approximate RMB 100–150 range. Shuanglin Temple, Zhenguo Temple and performances may be separate. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 高铁可到平遥古城站，普通列车可到平遥站；两站与古城入口距离不同，应确认住宿对应城门。古城核心街区以步行为主，电瓶车仅在指定线路运行，车辆通常不能随意进入核心步行区。 / High-speed trains serve Pingyao Gucheng Station, while conventional trains serve Pingyao Station. They are at different distances from the old city, so confirm the gate nearest your accommodation. The core is mainly pedestrian, with electric carts limited to designated routes.
- 季节 / Best season: 春秋适合长时间步行；夏季较热且日照强，冬季寒冷但游客相对少。大型节庆和黄金周客流显著增加。 / Spring and autumn are best for extended walking. Summer can be hot and sunny; winter is cold but often quieter. Major festivals and national holidays bring heavy crowds.
- 提示 / Tips: 穿适合石板路的鞋；区分“古城街区”“联票景点”和“城外寺院”。入住传统院落前确认行李接送、供暖、无障碍和卫生间条件。购买漆器或工艺品时保留付款凭证。 / Wear shoes suitable for stone streets. Distinguish between the old-city public area, joint-pass monuments and outlying temples. Before booking a courtyard stay, check luggage transfer, heating, accessibility and bathroom arrangements. Keep receipts for lacquerware and crafts.

**文化解读 / Cultural notes**
- **票号不是现代银行的简单复制 / Draft Banks Were Not Simply Modern Banks**：票号以汇兑和信用网络连接各地商人，是理解晋商组织方式的重要窗口。 / Draft banks connected merchants through remittance and trust networks and offer insight into how Shanxi commerce was organized.
- **古城内外不是一个票务空间 / Inside and Outside the Walled City Are Different Ticketing Zones**：双林寺和镇国寺虽属于世界遗产，但不在城墙内。 / Shuanglin and Zhenguo Temples belong to the World Heritage property but are outside the walled city.
- **地方饮食与原料确认 / Checking Ingredients in Local Food**：牛肉、面食、醋、芝麻、花生和酒类常见，英文菜单未必标注完整。 / Beef, wheat noodles, vinegar, sesame, peanuts and alcoholic drinks are common, and English menus may not list every ingredient.

### 晋祠 / Jinci Temple (`jinci-temple`)

**城市：** 太原市 / Taiyuan  
**级别：** 全国重点文物保护单位相关古建筑群；“晋祠—天龙山景区”于2024年进入国家5A级旅游景区名单。晋祠单体与组合景区的票务边界需复核。  
**Summary ZH：** 晋祠位于太原西南，是集祠庙、古建筑、雕塑、古树和泉水景观于一体的历史园林。圣母殿、鱼沼飞梁与宋代彩塑等内容，可帮助游客从结构、礼制和空间关系理解山西古建筑。  
**Summary EN：** Jinci, southwest of Taiyuan, combines ancestral-temple architecture, sculpture, ancient trees and spring-fed garden scenery. The Hall of the Holy Mother, the Fish-Pond Flying Bridge and historic painted sculpture help visitors understand Shanxi architecture through structure, ritual and spatial relationships.  

**介绍（中文）**  
晋祠最适合作为外国游客进入山西古建筑世界的第一站。它不是单一寺庙，而是围绕祭祀、泉水与园林逐步形成的建筑群。圣母殿以宋代木构和彩塑著称，鱼沼飞梁展现独特的十字形桥梁空间，难老泉及古树则使建筑与自然水系相互联系。参观时，应避免把“祠”简单翻译成普通寺庙；其核心与纪念、祭祀和地方历史有关。如今晋祠常与天龙山组合进行景区宣传和评级，但两者地理位置、游览时长与交通方式不同。Mock 数据应保留单独的晋祠对象，并通过 relatedSpots 或 packageNotice 关联天龙山，防止票务和路线描述混乱。

**Introduction (English)**  
Jinci is an excellent first stop for international visitors entering the world of Shanxi’s historic architecture. It is not a single temple but a complex shaped over time by commemoration, ritual, springs and garden design. The Hall of the Holy Mother is celebrated for its Song timber structure and painted sculptures; the Fish-Pond Flying Bridge creates an unusual cross-shaped spatial form; and the Never-Aging Spring and old trees connect architecture with a living water system. The Chinese term ci is better understood as an ancestral or commemorative shrine than as an ordinary Buddhist temple. Jinci is now promoted and rated together with Tianlongshan, but the two locations differ in geography, visit length and transport. The mock should keep Jinci as a separate object and connect Tianlongshan through related-site or package notices.

**看点 / Highlights**
- 圣母殿：宋代木构与彩塑的核心看点。 / Hall of the Holy Mother: the central highlight for Song timber architecture and painted sculpture.
- 鱼沼飞梁：独特的十字形桥梁空间。 / Fish-Pond Flying Bridge: a distinctive cross-shaped bridge structure.
- 难老泉与水系：理解园林形成与地方水文化。 / Never-Aging Spring and water system: key to the garden’s development and local water culture.
- 古树与碑刻：补充时间层次和书法信息。 / Ancient trees and inscriptions: additional layers of chronology and calligraphy.

- 开放 / Opening: UNVERIFIED：博物馆式日间开放，通常有季节性闭馆和停止检票时间；特殊维护可能关闭个别殿堂。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Jinci generally follows daytime museum-style opening with seasonal closing and last-entry times. Individual halls may close for conservation. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：晋祠通常为收费参观，常见成人票价低于人民币100元；与天龙山的联票、接驳车和优惠政策可能另行设置。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Jinci normally requires paid admission, commonly below RMB 100 for an adult ticket. Combined Tianlongshan tickets, shuttles and concessions may be separate. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 从太原南站、太原站或机场出发，可乘城市公交、出租车或网约车前往晋源区。若同日安排天龙山，必须额外核对景区接驳、山路时间和末班车。 / From Taiyuan South Station, Taiyuan Station or the airport, continue to Jinyuan District by city bus, taxi or ride-hailing service. If combining Jinci with Tianlongshan, separately check scenic shuttles, mountain-road travel time and the last return service.
- 季节 / Best season: 春秋最适合园林和古建步行；夏季树荫较多但可能炎热，冬季寒冷且水景体验不同。 / Spring and autumn are best for walking through the architecture and gardens. Summer has shade but can be hot; winter is cold and the water landscape feels different.
- 提示 / Tips: 古殿和彩塑区域默认不触摸、不使用闪光灯；观察木构时不要跨越护栏。应区分晋祠博物馆、晋祠公园及晋祠—天龙山组合景区的不同范围。 / Do not touch historic halls or painted sculpture and keep flash off unless clearly permitted. Do not cross barriers to inspect timber details. Distinguish among Jinci Museum, surrounding park areas and the wider Jinci–Tianlongshan scenic-area package.

**文化解读 / Cultural notes**
- **“祠”与“寺”并不相同 / A Ci Is Not the Same as a Buddhist Temple**：晋祠主要与纪念和祭祀传统相关，不能简单理解为佛教寺院。 / Jinci is rooted mainly in commemoration and ritual tradition and should not be treated simply as a Buddhist monastery.
- **木构和彩塑的脆弱性 / Fragility of Timber and Painted Sculpture**：古木构、彩塑和碑刻对触摸、闪光和环境变化敏感。 / Historic timber, painted sculpture and inscriptions are sensitive to touching, flash and environmental change.
- **组合景区名称造成误解 / Combined Scenic-Area Names Can Cause Confusion**：“晋祠—天龙山”评级或联票不代表两处在同一入口。 / The Jinci–Tianlongshan rating or package does not mean both sites share one entrance.

### 黄河壶口瀑布（山西侧） / Hukou Waterfall of the Yellow River (Shanxi Side) (`hukou-waterfall-shanxi`)

**城市：** 临汾市 / Linfen  
**级别：** 黄河壶口瀑布旅游区为国家5A级旅游景区；山西侧位于临汾市吉县。水情和开放状态必须动态核验。  
**Summary ZH：** 壶口瀑布位于晋陕峡谷，宽阔黄河在此骤然收束，形成声势强烈的瀑布景观。山西侧入口位于临汾市吉县，水量、冰凌、风力与安全管控会显著改变现场体验。  
**Summary EN：** At Hukou, the broad Yellow River is suddenly compressed within the Jin–Shaanxi Gorge, producing a powerful waterfall landscape. The Shanxi entrance lies in Ji County, Linfen. River volume, ice, wind and safety controls can substantially change the experience.  

**介绍（中文）**  
壶口瀑布的核心价值来自黄河水流在峡谷地形中的急剧收束。不同季节的景观差异很大：丰水期水势壮阔但安全距离和开放区域可能调整；冬季可能形成冰凌与冰瀑，同时道路和步道更湿滑；极端天气或特殊水情下景区可能临时关闭。由于黄河两岸分别属于山西和陕西，游客常把两侧入口、门票和交通混为一谈。Mock 数据必须在名称、地图和购票提示中持续标记“山西侧”，并禁止生成“跨桥步行到另一侧”的误导信息。首页卡片应展示当日状态标签，例如“正常开放 / 部分区域关闭 / 暂停开放 / 需核验”，而不是只给固定营业时间。

**Introduction (English)**  
Hukou’s defining feature is the sudden compression of Yellow River flow within a narrow gorge. The landscape changes dramatically by season. High-flow periods can be spectacular but may alter safety distances and accessible zones; winter can produce ice formations while making roads and paths slippery; extreme weather or unusual river conditions can trigger temporary closure. Because the two banks belong to Shanxi and Shaanxi, visitors often confuse entrances, tickets and transport. The mock must consistently label this object as the “Shanxi Side” in its name, map and booking notes, and must not imply that visitors can casually walk across to the opposite bank. The home card should support live-style states such as Open, Partially Open, Temporarily Closed or Verify Today rather than relying only on fixed hours.

**看点 / Highlights**
- 主瀑布观景：观察黄河由宽变窄的地形过程。 / Main waterfall viewpoint: see how the Yellow River narrows through the gorge.
- 水雾与声景：现场感受与普通静态瀑布不同。 / Mist and soundscape: a more physical experience than a static scenic view.
- 季节性冰景：冬季可能出现冰凌，但开放与安全条件不固定。 / Seasonal ice formations: possible in winter, with variable access and safety conditions.
- 黄河文化解释：把自然地貌与区域历史、交通和民间叙事联系起来。 / Yellow River interpretation: connect geology with regional history, travel and local narratives.

- 开放 / Opening: UNVERIFIED：通常为日间开放，但水情、冰雪、强风、暴雨和安全检查可能导致延迟开放、部分关闭或临时闭园。必须优先展示当日状态。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Normally open during daytime, but river flow, ice, strong wind, heavy rain and safety inspections may delay opening, close sections or suspend operations. Same-day status must take priority. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：通常包含景区门票，并可能另收景交车费用；常见组合支出约在人民币100～150元区间。山西侧和陕西侧票务通常不可混用。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Admission and a scenic shuttle may be charged separately, with a typical combined spend around RMB 100–150. Tickets for the Shanxi and Shaanxi sides are generally not interchangeable. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 通常从临汾西站、临汾市区或吉县经公路前往，最后一段以旅游巴士、包车或自驾为主。公共交通班次有限，应提前确认返程。导航时必须选择山西吉县入口。 / The Shanxi side is commonly reached by road from Linfen West Station, central Linfen or Ji County, using a tourist bus, hired vehicle or private car for the last section. Public services can be limited, so confirm the return trip. Navigation must be set to the Ji County, Shanxi entrance.
- 季节 / Best season: 不同季节各有景观，但不存在绝对稳定的“最佳水量”。春秋体感相对舒适；夏季需关注暴雨和涨水；冬季需关注冰雪、低温和道路结冰。 / Each season offers different scenery, and there is no permanently reliable “best flow.” Spring and autumn are generally comfortable; summer requires attention to storms and rising water; winter requires caution for cold, snow and road ice.
- 提示 / Tips: 不要跨越护栏、靠近湿滑崖边或在风大时使用大型自拍设备。水雾可能损伤电子设备。确认儿童、老人和行动不便游客是否适合进入主观景区，并准备防滑鞋。 / Do not cross barriers, approach slippery edges or use large selfie equipment in strong wind. Mist can affect electronics. Check whether the main viewing area is suitable for children, older visitors or people with limited mobility, and wear slip-resistant shoes.

**文化解读 / Cultural notes**
- **水情决定体验与开放 / River Conditions Determine Access**：瀑布景观和可进入区域会随水量、冰情和天气快速变化。 / The view and accessible area can change quickly with flow, ice and weather.
- **山西侧与陕西侧入口 / Shanxi and Shaanxi Entrances**：两侧属于不同省份，入口、票务与公路路线不同。 / The two banks are in different provinces and use different entrances, tickets and road routes.
- **自然景区也有边界规则 / Natural Sites Also Require Boundary Discipline**：护栏和关闭线会随风险调整，不只是为了维持秩序。 / Barriers and closure lines change with risk and are not merely crowd-control devices.

### 悬空寺 / Hanging Temple (`hanging-temple`)

**城市：** 大同市 / Datong  
**级别：** 全国重点文物保护单位；恒山相关旅游区的重要组成部分。当前A级景区归属和登临政策需复核。  
**Summary ZH：** 悬空寺依山崖而建，以木构楼阁、栈道和嵌入岩壁的承重结构闻名。寺内同时呈现佛、道、儒相关空间，登临容量有限，强风、降雨、落石风险和拥挤都会影响开放。  
**Summary EN：** Built into a cliff, the Hanging Temple is known for timber pavilions, narrow walkways and beams anchored into the rock. Its spaces reference Buddhist, Daoist and Confucian traditions. Climbing capacity is limited, and wind, rain, rockfall risk or crowding can affect access.  

**介绍（中文）**  
悬空寺最震撼的地方不只是“看起来悬在空中”，而是建筑如何利用岩壁凹槽、横梁、柱架和紧凑空间适应山谷环境。现存建筑经过历代修缮，游客在狭窄廊道中会感受到尺度、结构和地形的紧密关系。寺内有与佛教、道教和儒家传统相关的殿堂，因此英文介绍应使用“multiple religious and philosophical traditions”，避免把它误写成三种宗教完全等量、同一时期一次性建成。由于登临通道非常狭窄，景区可能把地面参观票与登临票分开，并使用时段或名额管理。小程序必须为“不登临游客”提供替代视角、地面路线和摄影点，而不是把登临视为唯一体验。

**Introduction (English)**  
The Hanging Temple is remarkable not only because it appears suspended, but because its buildings use cliff recesses, embedded beams, posts and compact spaces to adapt to the valley. The surviving complex has been repaired across different periods, and its narrow corridors make the relationship between scale, structure and terrain immediately tangible. Halls refer to Buddhist, Daoist and Confucian traditions; English interpretation should describe “multiple religious and philosophical traditions” rather than implying that three equal religions were established simultaneously in one construction phase. Because the climbing route is extremely narrow, ground admission and climbing access may be separated and managed by time slot or quota. The app must provide alternative viewpoints, ground routes and photography options for visitors who do not climb.

**看点 / Highlights**
- 崖壁整体远观：理解建筑与山体的比例。 / Overall cliff view: understand the scale of the buildings against the mountain.
- 嵌岩横梁与木构：观察“悬空”效果的结构基础。 / Rock-anchored beams and timber framing: the structural basis of the suspended appearance.
- 狭窄栈道与楼阁：体验空间组织，但需服从单向和限流规则。 / Narrow walkways and pavilions: experience the spatial organization while following one-way and capacity rules.
- 三教殿：用于解释多种传统在后世空间中的并置。 / Hall of the Three Teachings: a place to explain the later coexistence of multiple traditions.

- 开放 / Opening: UNVERIFIED：仅日间开放；地面区与登临区可能执行不同停止售票、限流和临时关闭规则。大风、降雨、落石检查或维护会影响登临。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: Daytime opening only. Ground-level and climbing areas may have different last-sale, capacity and temporary-closure rules. Wind, rain, rockfall inspection or maintenance can affect climbing access. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 门票 / Ticket: UNVERIFIED：景区基础门票与悬空寺登临票可能分开，组合支出常见在人民币150元以内或附近；登临名额可能比入园名额更少。以下为演示用典型公开信息，开放时间、票价、预约、交通管制和可进入区域可能临时调整，请以景区当日官方公告及现场指引为准。 / UNVERIFIED: General admission and the Hanging Temple climbing ticket may be separate, with combined spending commonly around or below RMB 150. Climbing places may be fewer than general-entry places. The following is typical public information for demonstration purposes. Opening hours, prices, reservation rules, traffic controls and accessible areas may change. Check the attraction’s official same-day notice and on-site instructions before visiting.
- 交通 / Transport: 从大同市区、大同南站或机场经公路前往浑源县，再到恒山—悬空寺区域。公共班次和返程时间有限，建议提前核对。若同日安排云冈石窟，两地分处大同不同方向，不宜低估车程。 / Travel by road from central Datong, Datong South Station or the airport to Hunyuan County and then the Mount Heng–Hanging Temple area. Public departures and return times can be limited. If combining with Yungang on the same day, remember that the two sites lie in different directions from Datong.
- 季节 / Best season: 春秋通常更适合户外排队和登临；夏季需注意雷雨，冬季需注意冰雪和强风。是否开放应以当天安全评估为准。 / Spring and autumn are generally more comfortable for outdoor queuing and climbing. Summer brings storm risk; winter brings ice and strong wind. Same-day safety assessment determines access.
- 提示 / Tips: 恐高、行动不便、携带幼童或大型背包的游客应谨慎选择登临。狭窄处不要停留自拍、逆行或触摸构件。即使无法登临，地面区仍可获得完整的建筑外观体验。 / Visitors with a fear of heights, limited mobility, young children or large backpacks should consider avoiding the climbing route. Do not stop for selfies, move against the flow or touch structural elements in narrow sections. The ground area still provides a complete external architectural view.

**文化解读 / Cultural notes**
- **登临票不等于普通入园票 / Climbing Access Is Not the Same as General Entry**：狭窄栈道容量有限，登临名额可能单独管理。 / The narrow walkways have limited capacity, so climbing places may be managed separately.
- **在狭窄木构中减少接触 / Minimize Contact in Narrow Timber Spaces**：抓扶、倚靠和拥堵会增加古建筑构件压力。 / Grabbing, leaning and crowding place additional stress on historic timber elements.
- **“三教合一”需要谨慎解释 / Explain the Three Teachings Carefully**：寺内多种传统的并置反映长期历史变化，不宜理解为简单混合成一种宗教。 / The coexistence of multiple traditions reflects historical development and should not be presented as one blended religion.

## 3. barrierTypes[]：跨文化障碍字典
- `barrier-language-terminology` **语言与专名理解 / Language and Proper-Name Understanding**：英文标识覆盖不均，佛教、古建、票号等专名难以靠直译理解。 缓解：提供统一术语表、简明英文解释、可播放短句与关键汉字展示。
- `barrier-booking-payment` **实名预约与数字支付 / Real-Name Booking and Digital Payment**：部分景区依赖中文平台、身份证件类型和移动支付，外国护照流程可能不同。 缓解：显示护照购票提示、人工窗口备选、可接受支付方式和当日核验入口。
- `barrier-religious-etiquette` **宗教场所礼仪 / Religious-Site Etiquette**：游客可能不了解殿内安静、着装、供奉区域、顺序和拍照限制。 缓解：提供“建议做/避免做”卡片，并区分礼貌建议与强制规定。
- `barrier-heritage-protection` **文物保护与拍摄限制 / Heritage Protection and Photography Restrictions**：洞窟、彩塑、壁画、木构等对闪光灯、触摸、三脚架和拥堵高度敏感。 缓解：按区域展示拍摄规则，解释限制背后的保护原因。
- `barrier-transport-wayfinding` **跨城交通与最后一公里 / Intercity Transport and the Last Mile**：景区分散，车站名称、景区入口、接驳车和山路交通容易混淆。 缓解：提供“到哪个站—去哪个门—是否换乘景交”的分步指引。
- `barrier-weather-season` **气候、海拔与季节性变化 / Weather, Elevation and Seasonal Change**：五台山寒冷多变，壶口受水情和冰雪影响，悬空寺可能受风雨管控。 缓解：设置天气风险、穿衣建议、关闭概率和替代行程提示。
- `barrier-food-allergy` **饮食、过敏与饮酒文化 / Food, Allergies and Drinking Culture**：面食、牛肉、醋、坚果、芝麻和酒类信息不一定有英文过敏原标识。 缓解：提供可直接出示的过敏、素食、清真和拒酒短句。
- `barrier-crowd-queue` **排队、容量与公共空间习惯 / Queues, Capacity and Shared-Space Norms**：节假日拥挤，部分狭窄文物点限流，排队位置和二次验票不直观。 缓解：提示预约时段、排队入口、预计步行和错峰建议。
- `barrier-historical-context` **历史语境与价值理解 / Historical Context and Significance**：仅给年代和人物会让外国游客难以理解“为什么重要”。 缓解：用“它改变了什么、连接了哪些文化、今天还能看到什么”组织解释。

## 4. serviceItems[]：通用双语服务条目

| ID | 场景 | 中文短句 | English phrase |
|---|---|---|---|
| `svc-ticket-passport` | 使用护照购票 / Buying a Ticket with a Passport | 您好，我使用护照，可以在这里购票或取票吗？ | Hello. I am using a passport. Can I buy or collect my ticket here? |
| `svc-ticket-reservation` | 询问是否需要预约 / Checking Whether a Reservation Is Required | 今天参观需要提前预约吗？还有可用时段吗？ | Is an advance reservation required today? Are any time slots still available? |
| `svc-ticket-counter` | 寻找人工窗口 / Finding a Staffed Ticket Counter | 请问人工售票或外国护照服务窗口在哪里？ | Where is the staffed ticket counter or the service desk for foreign passports? |
| `svc-route-gate` | 确认正确入口 / Confirming the Correct Entrance | 请问这个票应该从哪个入口进入？ | Which entrance should I use with this ticket? |
| `svc-route-shuttle` | 询问景区接驳车 / Asking About the Scenic Shuttle | 去主要参观区需要乘坐接驳车吗？在哪里上车？ | Do I need a scenic shuttle to reach the main visiting area? Where do I board it? |
| `svc-route-return` | 确认返程末班车 / Checking the Last Return Service | 返回车站或市区的末班车几点发车？ | What time is the last bus back to the station or city center? |
| `svc-food-allergy` | 严重食物过敏 / Severe Food Allergy | 我对这个食物严重过敏。请确认这道菜不含它，也没有交叉接触。 | I have a severe allergy to this food. Please confirm that the dish does not contain it and has no cross-contact. |
| `svc-food-vegetarian` | 素食需求 / Vegetarian Request | 我不吃肉、鱼和动物油。请问有合适的菜吗？ | I do not eat meat, fish or animal fat. Is there a suitable dish? |
| `svc-food-halal` | 清真饮食询问 / Halal Food Inquiry | 请问附近有清真餐厅吗？这道菜是否含猪肉或料酒？ | Is there a halal restaurant nearby? Does this dish contain pork or cooking wine? |
| `svc-food-no-alcohol` | 礼貌拒绝饮酒 / Politely Declining Alcohol | 谢谢，我不喝酒。用茶或水就可以。 | Thank you, but I do not drink alcohol. Tea or water is fine. |
| `svc-emergency-help` | 请求工作人员帮助 / Requesting Staff Assistance | 我需要帮助。请带我去游客中心或联系会说英语的工作人员。 | I need assistance. Please take me to the visitor center or contact an English-speaking staff member. |
| `svc-emergency-medical` | 寻求医疗帮助 / Seeking Medical Help | 我感到不适，需要医疗帮助。最近的医务室在哪里？ | I feel unwell and need medical assistance. Where is the nearest first-aid room? |
| `svc-emergency-lost` | 与同行者走散 / Separated from a Companion | 我和同行者走散了。可以在这里广播或联系游客中心吗？ | I have been separated from my companion. Could you make an announcement or contact the visitor center? |
| `svc-rule-photo` | 询问拍照规定 / Checking Photography Rules | 这里可以拍照吗？可以使用闪光灯、三脚架或自拍杆吗？ | May I take photos here? Are flash, tripods or selfie sticks allowed? |
| `svc-rule-touch` | 确认可否触摸 / Checking Whether Touching Is Allowed | 这个展品或建筑构件可以触摸吗？ | May I touch this exhibit or architectural element? |
| `svc-rule-worship` | 询问参观宗教活动 / Observing a Religious Activity | 这里正在举行宗教活动。我可以在旁边安静参观吗？ | A religious activity is taking place. May I observe quietly from the side? |
| `svc-shopping-price` | 确认价格与内容 / Confirming Price and What Is Included | 请问这是最终价格吗？包含包装或配送吗？ | Is this the final price? Does it include packaging or delivery? |
| `svc-shopping-receipt` | 索取收据 / Requesting a Receipt | 请给我收据或电子付款凭证。 | Please give me a receipt or electronic proof of payment. |

## 5. spotServiceLinks[]：景区专属话术

- `yungang-grottoes` · **确认洞窟拍摄分区 / Checking Cave Photography Zones**：请问哪些洞窟允许拍照？我不会使用闪光灯。 / Which caves allow photography? I will not use flash.
- `yungang-grottoes` · **询问核心洞窟路线 / Asking for the Main Cave Route**：时间有限时，参观昙曜五窟和主要洞窟应该走哪条路线？ / If I have limited time, which route covers the Tanyao Five Caves and the main grottoes?
- `yungang-grottoes` · **询问英文讲解 / Requesting English Interpretation**：有英文讲解、英文导览器或官方英文小程序吗？ / Is an English guide, audio guide or official English mini-program available?
- `mount-wutai` · **确认寺院开放 / Checking Monastery Access**：这座寺院今天对游客开放吗？有正在进行的法会吗？ / Is this monastery open to visitors today? Is a religious ceremony in progress?
- `mount-wutai` · **确认台怀镇交通 / Checking Transport in Taihuai**：去塔院寺和菩萨顶应该乘哪一段接驳车，还是步行更合适？ / Which shuttle should I take for Tayuan Temple and Pusa Ding, or is walking more practical?
- `mount-wutai` · **询问台顶天气 / Checking Summit Weather**：今天台顶道路和天气是否安全？需要额外保暖衣物吗？ / Are the summit roads and weather safe today? Do I need additional warm clothing?
- `ancient-city-pingyao` · **确认古城通票范围 / Checking the Joint Pass**：这张通票包含城墙、县衙和日昇昌吗？有效期到什么时候？ / Does this joint pass include the city wall, county government office and Rishengchang? When does it expire?
- `ancient-city-pingyao` · **询问古城交通车 / Asking About Electric Carts**：古城内的电瓶车在哪里乘坐？哪些街道只能步行？ / Where can I board an electric cart inside the old city? Which streets are pedestrian-only?
- `ancient-city-pingyao` · **前往双林寺或镇国寺 / Reaching Shuanglin or Zhenguo Temple**：去双林寺或镇国寺需要另外购票和乘车吗？ / Do I need a separate ticket and transport to visit Shuanglin or Zhenguo Temple?
- `jinci-temple` · **区分晋祠与天龙山票务 / Separating Jinci and Tianlongshan Tickets**：这张票只包含晋祠，还是也包含天龙山和接驳交通？ / Does this ticket cover only Jinci, or does it also include Tianlongshan and shuttle transport?
- `jinci-temple` · **确认殿内拍照 / Checking Indoor Photography**：圣母殿内可以拍照吗？哪些区域禁止使用闪光灯？ / May I take photos inside the Hall of the Holy Mother? Which areas prohibit flash?
- `jinci-temple` · **寻找主要古建与水景 / Finding the Main Architecture and Springs**：参观圣母殿、鱼沼飞梁和难老泉的推荐顺序是什么？ / What is the recommended order for the Hall of the Holy Mother, Fish-Pond Flying Bridge and Never-Aging Spring?
- `hukou-waterfall-shanxi` · **确认当日开放状态 / Checking Same-Day Opening Status**：受水情、风力或结冰影响，今天观瀑区是否全部开放？ / Because of river flow, wind or ice, is the full viewing area open today?
- `hukou-waterfall-shanxi` · **确认景交与步行距离 / Checking Shuttle and Walking Distance**：从游客中心到观瀑区必须乘景交车吗？下车后要步行多远？ / Is the scenic shuttle required from the visitor center to the waterfall? How far is the walk after getting off?
- `hukou-waterfall-shanxi` · **确认山西侧入口 / Confirming the Shanxi Entrance**：这是壶口瀑布山西侧入口吗？我的票可以在这里使用吗？ / Is this the Shanxi-side entrance to Hukou Waterfall? Is my ticket valid here?
- `hanging-temple` · **确认登临名额 / Checking Climbing Availability**：我已经有景区门票，还需要单独购买悬空寺登临票吗？今天还有名额吗？ / I already have an admission ticket. Do I need a separate ticket to climb the Hanging Temple, and are places still available today?
- `hanging-temple` · **询问天气与安全管控 / Checking Weather and Safety Controls**：今天受大风、降雨或落石风险影响，栈道是否开放？ / Are the walkways open today, considering wind, rain or rockfall risk?
- `hanging-temple` · **询问不登临参观方案 / Visiting Without Climbing**：如果不登临，在哪里可以看到最佳全景并参观地面展区？ / If I do not climb, where can I get the best overall view and visit the ground-level area?

## 6. homeRecommendations[]
1. `yungang-grottoes` — 国际认知度最高，视觉冲击和跨文化艺术解释都强，适合作为首页主视觉。 / The strongest combination of international recognition, visual impact and cross-cultural art interpretation; ideal as the hero feature.
2. `ancient-city-pingyao` — 页面内容最丰富，可串联景点、住宿、晋商、饮食、步行和文化遗产模块。 / The richest content ecosystem, linking attractions, accommodation, merchant history, food, walking and heritage modules.
3. `mount-wutai` — 突出世界遗产、宗教礼仪和山地服务，是课题“跨文化障碍”最典型的场景。 / A prime case for World Heritage, religious etiquette and mountain services—the clearest expression of cross-cultural visitor barriers.
4. `hukou-waterfall-shanxi` — 补足自然景观和黄河主题，并可展示动态开放状态。 / Adds a major natural and Yellow River theme while demonstrating dynamic opening-status data.
5. `jinci-temple` — 省会可达性好，适合作为古建入门和太原城市落地页。 / Easy to reach from the provincial capital and ideal as an introduction to historic architecture and a Taiyuan landing page.
6. `hanging-temple` — 封面辨识度极高，并能突出限流、安全和替代参观路线。 / Extremely recognizable visually and useful for communicating capacity, safety and alternative-visit routes.

## 7. provinceIntro

山西位于中国北方黄土高原东部，保存了数量密集、年代连续的古建筑和文化遗产。大同的云冈石窟记录了5至6世纪佛教艺术的跨区域传播；五台山把寺院、朝圣传统和山地景观结合为文化景观；平遥古城及晋商票号展示了明清城市生活与早期金融网络；太原晋祠、应县木塔和众多寺观则体现中国木构建筑的长期发展。黄河壶口瀑布和太行、吕梁山地为人文线路补充了自然体验。首次到访可安排4至6天，以太原、大同或平遥为交通节点；若加入五台山、壶口或运城，建议预留7至10天并减少每日跨城距离。

Shanxi lies on the eastern side of China’s Loess Plateau and preserves an unusually dense, continuous record of historic architecture and cultural heritage. The Yungang Grottoes in Datong document the cross-regional development of Buddhist art in the fifth and sixth centuries. Mount Wutai combines monasteries, pilgrimage traditions and mountain scenery as a cultural landscape. Pingyao and the Shanxi draft banks reveal Ming–Qing urban life and early financial networks, while Jinci, the Wooden Pagoda of Yingxian and many temples trace the long development of Chinese timber architecture. Hukou Waterfall and the Taihang and Lüliang mountains add major natural experiences. A first visit works well over four to six days using Taiyuan, Datong or Pingyao as transport hubs. Allow seven to ten days when adding Mount Wutai, Hukou or Yuncheng, and avoid excessive daily intercity travel.

## 8. glossary

| 中文 | 推荐英文 | 备注 |
|---|---|---|
| 山西 | Shanxi | Do not confuse with Shaanxi (陕西). |
| 陕西 | Shaanxi | Use double “a” in English to distinguish it from Shanxi. |
| 太原 | Taiyuan | Standard pinyin. |
| 大同 | Datong | Standard pinyin. |
| 晋中 | Jinzhong | Standard pinyin. |
| 忻州 | Xinzhou | Standard pinyin; Xin is pronounced roughly “sheen”. |
| 临汾 | Linfen | Standard pinyin. |
| 运城 | Yuncheng | Standard pinyin. |
| 云冈石窟 | Yungang Grottoes | Use the official UNESCO form. |
| 五台山 | Mount Wutai | Preferred established English name; avoid Wutai Mountain in formal heritage naming. |
| 平遥古城 | Ancient City of Ping Yao | UNESCO uses Ping Yao as two words; general travel text often uses Pingyao. Choose one policy per UI. |
| 晋祠 | Jinci Temple | Jinci is an ancestral/commemorative shrine complex; explain that Temple is conventional rather than strictly Buddhist. |
| 壶口瀑布 | Hukou Waterfall | Add “Shanxi Side” in this app object. |
| 悬空寺 | Hanging Temple | Established English name; “Suspended Temple” may appear but should not be mixed in UI. |
| 应县木塔 | Wooden Pagoda of Yingxian | Also called Sakyamuni Pagoda of Fogong Temple; use one display name and keep aliases. |
| 乔家大院 | Qiao Family Compound | Compound is clearer than Courtyard for the full complex. |
| 王家大院 | Wang Family Compound | Use Family Compound consistently. |
| 雁门关 | Yanmen Pass | Established English rendering. |
| 皇城相府 | Imperial City of the Xiangfu | Common tourism rendering; keep Chinese alias searchable. |
| 解州关帝庙 | Guandi Temple at Haizhou | Haizhou is the historical/administrative place name commonly used in English heritage references; keep “Jiezhou” as a search alias if needed. |
| 昙曜五窟 | Tanyao Five Caves | Use cave, not grotto, for the numbered subgroup. |
| 台怀镇 | Taihuai | Use Taihuai town/area depending context. |
| 塔院寺 | Tayuan Temple | Standard pinyin-based form. |
| 菩萨顶 | Pusa Ding | Use established proper name; explain as a monastery area rather than literal “Bodhisattva Summit”. |
| 日昇昌票号 | Rishengchang Draft Bank | Draft bank is more informative than simply bank. |
| 票号 | draft bank | Explain as a historical remittance and credit institution. |
| 县衙 | county government office / yamen | Use plain English first; yamen may be added as a glossary alias. |
| 祠 | ancestral or commemorative shrine | Do not automatically translate every ci as a Buddhist temple. |
| 景交车 | scenic shuttle | A shuttle operating within or from the visitor center of an attraction. |
| 全国重点文物保护单位 | Major Historical and Cultural Site Protected at the National Level | Formal long rendering; use “nationally protected heritage site” in compact UI. |

## 9. sourcesIndex
- **UNESCO World Heritage Centre — Yungang Grottoes** — https://whc.unesco.org/en/list/1039/ (international official)
- **UNESCO World Heritage Centre — Mount Wutai** — https://whc.unesco.org/en/list/1279/ (international official)
- **UNESCO World Heritage Centre — Ancient City of Ping Yao** — https://whc.unesco.org/en/list/812/ (international official)
- **Yungang Grottoes official website** — https://www.yungang.org/ (attraction official)
- **Mount Wutai Scenic Area Administration portal** — https://wts.sxxz.gov.cn/ (local government)
- **Pingyao County People’s Government** — http://www.pingyao.gov.cn/ (local government)
- **Department of Culture and Tourism of Shanxi Province** — https://wlt.shanxi.gov.cn/ (provincial government)
- **Ministry of Culture and Tourism of the People’s Republic of China** — https://www.mct.gov.cn/ (national government)
- **National Cultural Heritage Administration** — https://www.ncha.gov.cn/ (national government)
- **Taiyuan Municipal People’s Government** — https://www.taiyuan.gov.cn/ (local government)
- **Datong Municipal People’s Government** — https://www.dt.gov.cn/ (local government)
- **Linfen Municipal People’s Government** — https://www.linfen.gov.cn/ (local government)
- **Wikimedia Commons category pages** — https://commons.wikimedia.org/ (open media discovery)

## 10. openQuestions
- `oq-01` [high] 六个P0景区在准备演示或上线当天的旺淡季开放时间、停止售票和停止入园时间分别是什么？ / What are the peak/off-season opening, last-ticket and last-entry times for all six P0 sites on the demo or release date?
- `oq-02` [high] 外国护照能否在官方小程序完成实名预约？若不能，人工窗口和取票流程是什么？ / Can foreign-passport holders complete real-name booking in the official mini-program? If not, what is the staffed-counter workflow?
- `oq-03` [high] 当前私家车预约、进山检查、景交和核心区限行政策是什么？ / What are the current private-car reservation, mountain-entry check, shuttle and core-zone traffic-control rules?
- `oq-04` [high] 基础景区票与登临票是否分售？登临名额和外籍证件购买方式是什么？ / Are general admission and climbing access sold separately, and how can foreign-document holders obtain a climbing place?
- `oq-05` [medium] 是否存在可公开调用的当日开放、水情或临时关闭接口？ / Is there a public same-day opening, river-condition or closure feed that the app can consume?
- `oq-06` [medium] 晋祠单独票务对象与“晋祠—天龙山景区”5A组合对象的官方边界如何定义？ / How is the official boundary defined between the Jinci ticket object and the combined Jinci–Tianlongshan 5A scenic area?
- `oq-07` [high] 当前古城联票包含哪些景点、有效期多长，双林寺和镇国寺是否单独购票？ / Which monuments are in the current Pingyao joint pass, how long is it valid, and are Shuanglin and Zhenguo Temples separate?
- `oq-08` [medium] 各景区可公开确认的轮椅路线、无障碍卫生间、坡道和轮椅借用点在哪里？ / What wheelchair routes, accessible toilets, ramps and wheelchair-loan points can be officially confirmed at each site?
- `oq-09` [high] 项目最终采用的封面图片是否满足商业展示、署名和二次分发许可？ / Do final cover images permit project display, attribution and redistribution?
- `oq-10` [medium] 各景区游客中心、医疗点和紧急联系电话是否可公开写入演示数据？ / Can visitor-center, first-aid and emergency contact numbers be safely included in public demo data?

## H. 可选加分

- 路线：见 `extras/itineraries.json`。
- 无障碍与家庭：见 `extras/accessibilityAndFamily.json`。
- 冬季提示：见 `extras/winterNotices.json`。