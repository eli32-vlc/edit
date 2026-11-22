## 广告拦截 {#adblocking}

::: tip 提示
许多网站包含广告、弹窗或重定向，因此我们[强烈推荐](https://fmhy.net/beginners-guide#adblocking)使用广告拦截器。不要同时运行多个通用广告拦截器（例如 uBlock Origin 和 AdGuard），以[避免网页损坏](https://x.com/gorhill/status/1033706103782170625) / [2](https://xnotme.com/gorhill/status/1033706103782170625)。将通用广告拦截器与 SponsorBlock 等工具结合使用没有问题。另请注意，完整版 uBO 的效果显著优于精简版。
:::

- :repeat-button:️ **[Spotify Adblockers](/audio/#spotify-tools)**
- :repeat-button:️ **[Twitch Adblockers](/social-media-tools/#twitch-adblockers)**
- :repeat-button:️ **[Bypass URL Redirects](/internet-tools/#redirect-bypass)**
- :repeat-button:️ **[Bypass Article Paywalls](/internet-tools/#paywall-bypass)**
- :star: **[uBlock Origin](https://github.com/gorhill/uBlock)**、[AdGuard](https://github.com/AdguardTeam/AdguardBrowserExtension) 或 [uBO Lite](https://github.com/uBlockOrigin/uBOL-home)（MV3）/ [Note](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/ubo-lite.md) - 广告拦截器 / [冗余扩展](https://github.com/arkenfox/user.js/wiki/4.1-Extensions/#-dont-bother)
- :star: **反馈问题** - [uAssets](https://github.com/uBlockOrigin/uAssets/issues) / [Hosts](https://github.com/uBlockOrigin/uAssets/discussions/27472) / [AdGuard](https://reports.adguard.com/new_issue.html) / [EasyList](https://github.com/easylist/easylist/issues)
- :star: **[SponsorBlock](https://sponsor.ajay.app/)** - 跳过 YouTube 赞助广告 / <a target="_blank" href="https://x.com/SponsorBlock"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://www.reddit.com/r/SponsorBlock/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/SponsorBlock"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/ajayyy/SponsorBlock"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **SponsorBlock 工具** - [书签小工具](https://github.com/mchangrh/sb.js) / [脚本](https://greasyfork.org/en/scripts/453320) / [移植版](https://github.com/ajayyy/SponsorBlock/wiki/3rd-Party-Ports) / [数据库](https://sb.ltn.fi/) / [Chromecast](https://github.com/gabe565/CastSponsorSkip)
- [⁠Zen](https://irbis.sh/zen/) - 系统级广告拦截器 / <a target="_blank" href="https://discord.gg/zGeQVatAUm"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/irbis-sh/zen-desktop"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Disblock Origin](https://codeberg.org/AllPurposeMat/Disblock-Origin) 或 [Discord Adblock](https://codeberg.org/ridge/Discord-AdBlock) - 隐藏 Discord Nitro / Boost 广告
- [Popup Blocker (strict)](https://github.com/schomery/popup-blocker) 或 [PopupBlocker](https://github.com/AdguardTeam/PopupBlocker)（用户脚本）- 弹窗拦截器 / [说明](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/popup-blockers.md)
- [BehindTheOverlay](https://github.com/NicolaeNMV/BehindTheOverlay) - 隐藏网站覆盖层
- [BilibiliSponsorBlock](https://www.bsbsb.top/) - 跳过 Bilibili 赞助广告 / [Safari](https://github.com/ZaeXT/BilibiliSponsorBlock) / <a target="_blank" href="https://github.com/hanydd/BilibiliSponsorBlock"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [YouT-ube](https://www.yout-ube.com/) 或 [MUI Tube](https://muitube.com/) - 绕过 YouTube 强制的 uBO 播放器延迟

### 广告过滤规则 {#adblock-filters}

::: tip 提示
在尝试第三方过滤列表之前，请务必在设置中检查 uBO 的额外过滤器。
:::

- :globe-with-meridians: **[FilterLists](https://filterlists.com/)** - 过滤器 / Host 列表目录
- :star: **[LegitimateURLShortener](https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/LegitimateURLShortener.txt)** - 查询参数清理规则 / 与 AdGuard URL Tracking Protection 配合使用
- :star: **[HaGeZi Blocklists](https://github.com/hagezi/dns-blocklists)**、[2](https://gitlab.com/hagezi/mirror) / [Host Format](https://github.com/hagezi/dns-blocklists-legacy) - 多源域名拦截列表 / DNS 服务器使用完整版 / 浏览器广告拦截器使用迷你版 / [说明](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/hagezi.md)
- :star: **[OISD](https://oisd.nl/)** - 多源域名拦截列表 / <a target="_blank" href="https://github.com/sjhgvr/oisd"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [FMHY Filterlist](https://github.com/fmhy/FMHYFilterlist) - 不安全网站过滤器
- [AI uBlock Blacklist](https://github.com/alvi-se/ai-ublock-blacklist) - 拦截 AI 生成网站
- [⁠Stevos AI Blocklist](https://github.com/Stevoisiak/Stevos-AI-Blocklist) - 生成式 AI 网站拦截列表
- [neodevhost](https://github.com/neodevpro/neodevhost) 或 [black-mirror](https://github.com/T145/black-mirror) - 拦截列表与聚合源

### DNS 广告拦截 {#dns-adblocking}

::: tip 提示
如果你的目标是拦截浏览器广告，最好只使用 uBlock Origin，因为额外的过滤器可能导致冲突或触发反广告拦截。
:::

- :repeat-button:️ **[DNS Tools](/developer-tools/#dns-tools)** - 查询、传播与基准测试
- :star: **[Pi-Hole](https://pi-hole.net/)** - 自托管 DNS 广告拦截 / <a target="_blank" href="https://x.com/The_Pi_Hole"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/pihole/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/pi-hole"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> <span v-tooltip="'Docker'" alt="Docker" class="i-simple-icons:docker inline-block w-3em h-3em align-middle" /> 
- :star: **Pi-Hole 工具** - [过滤器](https://github.com/zachlagden/Pi-hole-Optimized-Blocklists) / [DNS 解析器](https://www.nlnetlabs.nl/projects/unbound/) / [托盘应用](https://github.com/PinchToDebug/Pihole-Tray/) / [Android 服务器](https://github.com/DesktopECHO/Pi-hole-for-Android)（root） / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- :star: **[AdGuard Home](https://adguard.com/en/adguard-home/overview.html)** - 自托管 DNS 广告拦截 / <a target="_blank" href="https://x.com/adguard"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/Adguard"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://t.me/adguarden"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/AdguardTeam/AdGuardHome"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> 
- [Blocky](https://0xerr0r.github.io/blocky/latest/) - DNS 广告拦截 / <a target="_blank" href="https://github.com/0xERR0R/blocky"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> <span v-tooltip="'Docker'" alt="Docker" class="i-simple-icons:docker inline-block w-3em h-3em align-middle" /> 
- [Technitium](https://technitium.com/dns) - 自托管 DNS 服务器 / <a target="_blank" href="https://reddit.com/r/technitium/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/TechnitiumSoftware/DnsServer"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> 
- [AdGuard Private DNS](https://adguard-dns.io/) - 可定制的 DNS 广告拦截服务 / <a target="_blank" href="https://x.com/adguard"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/Adguard"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://t.me/adguarden"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/AdguardTeam/AdguardSDNSFilter"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Control D](https://controld.com/free-dns) - 可定制的 DNS 广告拦截服务 / <a target="_blank" href="https://x.com/controldns"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/ControlD/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/dns"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [NextDNS](https://nextdns.io) - 可定制的 DNS 广告拦截服务 / [服务商信息](https://adguard-dns.io/kb/general/dns-providers/#nextdns) / [指南](https://github.com/yokoffing/NextDNS-Config) / <a target="_blank" href="https://github.com/nextdns/nextdns"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>

### DNS 服务商 {#dns-providers}

- :globe-with-meridians: **[DNS Providers](https://adguard-dns.io/kb/general/dns-providers/)** - DNS 服务商索引
- :globe-with-meridians: **[Public DNS indexes](https://www.publicdns.xyz/)** / [2](https://acavalin.com/p/free_dns) / [3](https://publicdnsserver.com/) / [4](https://public-dns.info/)
- :star: **[Cloudflare 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/ip-addresses/)** / [DNS](https://www.cloudflare.com/products/dns/)
- :star: **[Quad9](https://quad9.net/)** - 恶意软件、钓鱼、间谍软件与僵尸网络 DNS 防护 / <a target="_blank" href="https://github.com/quad9dns"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Artemis](https://dns.fuzzing.uk/) - 盗版网站 DNS 解析器 / 美国服务器 / <a target="_blank" href="https://github.com/PUT-Request/Artemis/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [AdGuard Public DNS](https://adguard-dns.io/en/public-dns.html) - DNS 服务商 / <a target="_blank" href="https://x.com/adguard"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/Adguard"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://t.me/adguarden"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/AdguardTeam/AdguardSDNSFilter"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [DNSBunker](https://dnsbunker.org/) - 加密 DNS 解析器，拦截广告、跟踪器、钓鱼与恶意软件 / 德国服务器
- [Rethink DNS Resolver](https://rethinkdns.com/configure) - DNS 服务商 / 混合多个拦截列表 / <a target="_blank" href="https://www.reddit.com/r/rethinkdns/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://t.me/rethinkdns"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / [备注](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/rethink-note.md)
- [HaGeZi DNS](https://github.com/hagezi/dns-servers) - 免费、非商业的欧盟 DNS 服务器
- [CleanBrowsing](https://cleanbrowsing.org/filters/) 或 [DNS for Family](https://dnsforfamily.com/) - 带安全搜索与恶意软件防护的家庭过滤
- [Control D](https://controld.com/features/dns-filtering) - 控制免费 DNS / <a target="_blank" href="https://x.com/controldns"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/ControlD/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/dns"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [DNS Forge](https://dnsforge.de/) - 四级过滤的德国 DNS 服务器
- [dns.sb](https://dns.sb/) - 免费、快速且不记录日志的公共 DNS 解析器

### [Linux 广告拦截](/linux-macos/#adblock-privacy) {#linux-adblocking}

### [Mac 广告拦截](/linux-macos/#mac-adblock-privacy) {#mac-adblocking}

### [Android 广告拦截](/mobile/#android-adblocking) {#android-adblocking}

### [iOS 广告拦截](/mobile/#ios-adblocking) {#ios-adblocking}

## 杀毒软件 {#antivirus}

::: tip 提示
最好保持 Windows Defender 的实时防护开启。遇到补丁等盗版软件检测时，可选择‘允许在设备上’；必要时可在‘排除项’中按‘文件’排除误报 + [更多信息](https://wispydocs.pages.dev/windows/#antivirus)。
:::

- :globe-with-meridians: **[The Second Opinion](https://jijirae.github.io/thesecondopinion/index.html)** - 便携式恶意软件扫描器 / 清除工具 / <a target="_blank" href="https://github.com/jijirae/thesecondopinion/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Malwarebytes](https://www.malwarebytes.com/)** / <a target="_blank" href="https://x.com/malwarebytes"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> 或 [ESET](https://rentry.co/FMHYB64#eset) - 杀毒软件
- :star: **[AdwCleaner](https://www.malwarebytes.com/adwcleaner/)** - 反广告软件 / <a target="_blank" href="https://x.com/malwarebytes"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a>
- :star: **[Security / Antivirus Multireddit](https://www.reddit.com/user/goretsky/m/security/)** - Reddit 社区
- :star: **[FMHY SafeGuard](https://fmhy.github.io/FMHY-SafeGuard/)** - 检测当前站点是否可信 / 不可信 / <a target="_blank" href="https://github.com/fmhy/FMHY-SafeGuard"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [BleepingComputer](https://www.bleepingcomputer.com/forums/f/22/virus-trojan-spyware-and-malware-removal-help/)、[Malwarebytes Forums](https://forums.malwarebytes.com/forum/7-windows-malware-removal-help-support/) 或 [Sysnative](https://www.sysnative.com/forums/forums/security-arena.66/) - 恶意软件清除论坛 / [注意](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/malware-removal-forums.md)
- [Microsoft Safety Scanner](https://learn.microsoft.com/en-us/defender-endpoint/safety-scanner-download) - 按需 AV 扫描器
- [⁠rifteyy](https://rifteyy.org/) - 恶意软件清除指南 / 博客 / [信息窃取防护 / 恢复](https://rifteyy.org/report/the-ultimate-guide-to-infostealers)
- [pyWhat](https://github.com/bee-san/pyWhat) - 识别任何东西 / <a target="_blank" href="https://discord.com/invite/zYTM3rZM4T"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [Detect It Easy](https://github.com/horsicq/detect-it-easy) - 文件识别 + 静态检查工具
- [No More Ransom](https://www.nomoreransom.org/en/decryption-tools.html) - 勒索软件解密工具
- [ID Ransomware](https://id-ransomware.malwarehunterteam.com/) - 勒索软件识别工具
- [Winitor](https://www.winitor.com/) - EXE 恶意软件评估
- [ConfigureDefender](https://github.com/AndyFul/ConfigureDefender) - 配置 Windows Defender 设置

### 沙盒 / VMs {#sandboxes-vms}

- :repeat-button:️ **[Virtual Machines](/system-tools/#virtual-machines)**
- :star: **[Triage](https://tria.ge/)** - 在线沙盒
- [Cuckoo](https://cuckoo.cert.ee/) / [2](https://sandbox.pikker.ee/) - 在线沙盒
- [ANY.RUN](https://any.run/) - 在线沙盒 / 在 Discord / X 上联系他们注册
- [Sandboxie Plus](https://sandboxie-plus.com/) - 本地沙盒环境 / [指南](https://clarasguide.valeena.workers.dev/Guides/sandboxie-guide/) / <a target="_blank" href="https://github.com/sandboxie-plus/Sandboxie"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Windows Sandbox](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview) - 完整的本地虚拟机沙盒环境
- [Dangerzone](https://dangerzone.rocks/) - 将恶意 PDF 转换为安全文件 / <a target="_blank" href="https://github.com/freedomofpress/dangerzone"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>

### 在线扫描器 {#online-scanners}

- :star: **[VirusTotal](https://www.virustotal.com/)** - 在线文件扫描器 / [扫描结果指南](https://clarasguide.valeena.workers.dev/Guides/vtguide/) / [CLI](https://github.com/VirusTotal/vt-cli) / [上传器](https://github.com/SamuelTulach/VirusTotalUploader) / [精简版](https://www.virustotal.com/old-browsers/)
- [Hybrid Analysis](https://hybrid-analysis.com/) - 在线文件扫描器
- [Jotti](https://virusscan.jotti.org/en) - 在线文件扫描器
- [Kaspersky OpenTIP](https://opentip.kaspersky.com/) - 在线文件扫描器
- [⁠Malprob](https://malprob.io/) - 在线文件扫描器 / 需要注册
- [Filescan.io](https://www.filescan.io/) 或 [⁠MetaDefender Cloud](https://metadefender.com/) - 在线文件扫描器 / <a target="_blank" href="https://x.com/filescan_itsec"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://github.com/filescanio"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Manalyzer](https://manalyzer.org/) - PE 文件扫描器 / <a target="_blank" href="https://github.com/JusticeRage/Manalyze"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>

## 隐私 / 安全 {#privacy-security}

- :repeat-button:️ **[SMS Verification Sites](/storage/#sms-verification-sites)**
- :repeat-button:️ **[File Encryption](/file-tools/#file-encryption)**
- :repeat-button:️ **[Drive Formatting / File Deletion](/file-tools/#formatting-deletion)**
- :repeat-button:️ **[Photo Forensics / Metadata](/image-tools/#photo-forensics-metadata)**
- :repeat-button:️ **[Privacy-Focused Android Operating Systems](/mobile/#operating-systems)**
- :star: **[Whonix](https://www.whonix.org/)** / <a target="_blank" href="https://www.reddit.com/r/Whonix"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://twitter.com/Whonix"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://t.me/s/Whonix"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/Whonix"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, **[Qubes](https://www.qubes-os.org/)** / <a target="_blank" href="https://www.reddit.com/r/Qubes"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://twitter.com/QubesOS"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://github.com/QubesOS"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 **[Tails](https://tails.net/)** / <a target="_blank" href="https://twitter.com/Tails_live"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://t.me/torproject"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/torproject"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 注重隐私的操作系统
- [W10Privacy](https://www.w10privacy.de/english-home/) - 隐私与数据保护工具
- [Telemetry.md](https://gist.github.com/ave9858/a2153957afb053f7d0e7ffdd6c3dcb89) - 禁用 Windows 10/11 遥测
- [Agent DVR](https://www.ispyconnect.com/) / <a target="_blank" href="https://www.reddit.com/r/ispyconnect/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a>, [Frigate](https://frigate.video/) / <a target="_blank" href="https://github.com/blakeblackshear/frigate"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [ZoneMinder](https://zoneminder.com/) / <a target="_blank" href="https://discord.gg/tHYyP9k66q"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/ZoneMinder/ZoneMinder/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 安防摄像头系统
- [⁠go2rtc](https://github.com/AlexxIT/go2rtc) - 安防摄像头桥接 + 流媒体管理器
- [Team Elite](https://www.te-home.net/) - 安全软件
- [YourDigitalRights](https://yourdigitalrights.org/) - 让组织删除你的个人数据
- [Big Ass Data Broker Opt-Out List](https://github.com/yaelwrites/Big-Ass-Data-Broker-Opt-Out-List), [⁠Serus](https://www.serus.ai/) 或 [⁠Data Broker Watch](https://databrokerswatch.org/) - 数据经纪商移除与退出方法
- [⁠DataRequests](https://www.datarequests.org/) - GDPR 请求生成器 / 工具 / <a target="_blank" href="https://github.com/datenanfragen"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Surfer Protocol](https://github.com/Surfer-Org/Protocol) - 多平台用户数据导出工具 / <a target="_blank" href="https://discord.gg/5KQkWApkYC"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [GnuPG](https://gnupg.org/) - 数据 / 通信加密工具 / [安装程序](https://www.gpg4win.org/) / [密钥管理器](https://github.com/orhun/gpg-tui)
- [PrivNote](https://privnote.com/), [PrivateBin](https://privatebin.net/), [⁠Ente Paste](https://paste.ente.com/), [Online Clipboard](https://online-clipboard.io/), [One Time Secrets](https://ots.fyi/) / <a target="_blank" href="https://github.com/Luzifer/ots"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, [SafeNote](https://safenote.co/) / <a target="_blank" href="https://github.com/devrolabs"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, [Burn.Link](https://burn.link/), [s.cr](https://s.cr/), [Yopass](https://yopass.se/) / <a target="_blank" href="https://github.com/jhaals/yopass"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, [Nyanbin](https://nyan.ist/) / <a target="_blank" href="https://github.com/feelmypain/nyanbin"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, [Burn My Note](https://www.burnmynote.link/) 或 [OneTimeSecret](https://onetimesecret.com/) / <a target="_blank" href="https://github.com/onetimesecret/onetimesecret"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 自毁消息 / 私密笔记
- [⁠Portable Secret](https://alcazarsec.github.io/portable-secret/) - 在浏览器中本地解密的独立 HTML 文件 / <a target="_blank" href="https://github.com/alcazarsec/portable-secret"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Forensic Focus](https://www.forensicfocus.com/forums/) - 数字取证讨论论坛 / <a target="_blank" href="https://discord.gg/97zKvTXHeS"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [SurveillanceWatch](https://www.surveillancewatch.io/) - 监控公司关联关系
- [⁠Atlas of Surveillance](https://www.atlasofsurveillance.org/) - 警察 / 监控技术地图
- [⁠Sparrow Map](https://map.sparrowmap.com/) - 警车地图 / 社区摄像头网络
- [ALPR Watch](https://alprwatch.org/)、[⁠FlockHopper](https://dontgetflocked.com/)、[⁠Flock Surveillance Map](https://uncensored.ai/flocksurveillance)、[DeFlock](https://deflock.org/) / <a target="_blank" href="https://discord.gg/aV7v4R3sKT"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/FoggedLens/deflock"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [Panopti](https://panopti.ca/) / <a target="_blank" href="https://github.com/resistanceisliberty/panopti.ca"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>（加拿大） - AI 自动车牌识别摄像头 / ALPR 地图
- [EyesOnFlock](https://eyesonflock.com/) - AI Flock 监控数据库 / 追踪
- [Have I Been Flocked?](https://haveibeenflocked.com/) - 检查你的车牌是否被 Flock 监控标记
- [People Over Papers](https://iceout.org/en/) 或 [ICE Map](https://www.icemap.dev/) - ICE 活动信息 / 地图
- [If An Agent Knocks](https://docs.google.com/document/d/176Yds1p63Q3iaKilw0luChMzlJhODdiPvF2I4g9eIXo/) - 被执法人员联系时的最佳做法

### 隐私指南 / 索引 {#privacy-guides-indexes}

- :star: **[Privacy Guides](https://www.privacyguides.org/)**, [2](https://privacyguides.github.io/privacyguides.org/), [3](https://privacyguides-org-production.b-cdn.net/en/) - 教育指南 / [讨论](https://discuss.privacyguides.net/) / <a target="_blank" href="http://www.xoe4vn5uwdztif6goazfbmogh6wh5jc4up35bqdflu6bkdc5cas5vjqd.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / [Matrix](https://matrix.to/#/#privacyguides:matrix.org) / <a target="_blank" href="https://github.com/privacyguides/privacyguides.org"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[The Hitchhiker’s Guide](https://anonymousplanet.net/)** - 在线匿名指南 / <a target="_blank" href="https://github.com/Anon-Planet/thgtoa"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[The OPSEC Bible](http://opbible7nans45sg33cbyeiwqmlp5fu7lklu6jd6f3mivrjeqadco5yd.onion/)** (.onion), [2](https://www.privacydefence.org/opsec/bibleprivacy/opsec/index.html) - 在线匿名指南
- :star: **[The New Oil](https://thenewoil.org/)** - 教育指南 / <a target="_blank" href="https://github.com/tnonate/thenewoil"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[No Trace](https://www.notrace.how/)** - 教育指南 / <a target="_blank" href="http://i4pd4zpyhrojnyx5l3d2siauy4almteocqow4bp2lqxyocrfy6prycad.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a>
- :star: **[Awesome Privacy](https://awesome-privacy.xyz/)** / <a target="_blank" href="https://github.com/lissy93/awesome-privacy"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>, [⁠Techlore SPA](https://tools.techlore.tech/), [Awesome Security Hardening](https://github.com/decalage2/awesome-security-hardening) 或 [pluja's Awesome Privacy](https://pluja.github.io/awesome-privacy/) / <a target="_blank" href="https://github.com/pluja/awesome-privacy"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 隐私应用 / 服务
- :star: **[Consumer Rights Wiki](https://consumerrights.wiki/)** - 记录影响消费者权益的做法 / [扩展](https://github.com/FULU-Foundation/CRW-Extension) / <a target="_blank" href="https://discord.gg/8w5rSNAXRf"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- :star: **[Surveillance Self-Defense](https://ssd.eff.org/)** - 教育指南
- [Digital Defense](https://digital-defense.io/) - 个人隐私与安全清单 / <a target="_blank" href="https://github.com/lissy93/personal-security-checklist"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Defensive Computing Checklist](https://defensivecomputingchecklist.com/) - 教育指南
- [⁠Whonix Wiki](https://www.whonix.org/wiki) - 教育指南 / [论坛](https://forums.whonix.org/)
- [⁠Kicksecure Wiki](https://www.kicksecure.com/wiki) - 教育指南 / [论坛](https://forums.kicksecure.com/)
- [OPSEC Guide](https://whos-zycher.github.io/opsec-guide/) - 教育指南
- [PrivSec](https://privsec.dev/) - 教育指南 / <a target="_blank" href="https://github.com/PrivSec-dev"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Hostux](https://hostux.net/en/) - 隐私工具 / <a target="_blank" href="https://git.hostux.net/hostux.net/hostux.network"><span v-tooltip="'Source Code'" alt="Source Code" class="i-gravity-ui:code" /></a>
- [Privacy Settings](https://github.com/StellarSand/privacy-settings) - 隐私设置指南
- [Privacy Not Included](https://www.mozillafoundation.org/en/privacynotincluded/) - 产品隐私评级
- [EncryptedList](https://encryptedlist.xyz/) - 加密服务/应用列表
- [Awesome Vehicle Security](https://github.com/jaredthecoder/awesome-vehicle-security) - 车辆安全资源

### 网络安全 {#network-security}

- :star: **[Safing Portmaster](https://safing.io/)** - 网络监视器 / DNS 解析器 / 防火墙 / <a target="_blank" href="https://twitter.com/SafingIO"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://discord.com/invite/9ScnccuXaZ"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/safing"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[OPNsense](https://opnsense.org/)** - 防火墙 / <a target="_blank" href="https://github.com/opnsense"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠DNSLeakTest](https://dnsleaktest.com/) - DNS 泄漏测试
- [I2P](https://i2p.net/) - 加密私有网络层 / [客户端](https://i2pd.website/) / <a target="_blank" href="https://www.reddit.com/r/i2p/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://i2pgit.org/"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [Freenet](https://freenet.org/) - 去中心化 P2P 网络 / <a target="_blank" href="https://github.com/freenet/web"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Hyphanet](https://www.hyphanet.org/) - 去中心化 P2P 网络 / <a target="_blank" href="https://github.com/hyphanet"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠RustNet](https://github.com/domcyrus/rustnet) - 网络监视器 TUI
- [⁠wifit3](https://github.com/derv82/wifit3) - USB Wi-Fi 审计工具
- [Simplewall](https://github.com/henrypp/simplewall) - 防火墙
- [Fort](https://github.com/tnodir/fort) - 防火墙
- [WFC](https://www.binisoft.org/wfc.php) - 防火墙

### [Linux 隐私](/linux-macos/#adblock-privacy) {#linux-privacy}

### [Mac 隐私](/linux-macos/#mac-adblock-privacy) {#mac-privacy}

### [Android 隐私](/mobile/#android-privacy) {#android-privacy}

### [iOS 隐私](/mobile/#ios-privacy) {#ios-privacy}

## 网络隐私 {#web-privacy}

- :repeat-button:️ **[Frontend / Service Hosts](/misc/#frontend-service-hosts)**
- :repeat-button:️ **[Encode / Decode URLs](/text-tools/#encode-decode)**
- :star: **[JustDeleteMe](https://justdeleteme.xyz/)** / <a target="_blank" href="https://github.com/jdm-contrib/jdm"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [JustDeleteAccount](https://www.justdeleteaccount.com/) - 查找 / 注销旧账户
- [r/degoogle](https://www.reddit.com/r/degoogle) - Google 应用替代品
- [Phish Report](https://phish.report/)、[OpenPhish](https://openphish.com/)、[Netcraft Report](https://report.netcraft.com/report)、[isitPhishing](https://isitphishing.org/) 或 [PhishTank](https://phishtank.org/) - 举报钓鱼网站
- [ToS;DR](https://tosdr.org/) - 网站隐私政策 / <a target="_blank" href="https://discord.gg/tosdr"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/tosdr"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [DNS Jumper](https://www.sordum.org/7952/dns-jumper-v2-3/) - DNS 切换器
- [⁠OnionHop](https://www.onionhop.de/) - Tor 网络客户端 / 洋葱路由 / <a target="_blank" href="https://github.com/center2055/OnionHop"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [tweetXer](https://github.com/lucahammer/tweetXer) - 删除 X.com 帖子
- [delete-likes-from-x-com.md](https://gist.github.com/aymericbeaumet/d1d6799a1b765c3c8bc0b675b1a1547d) - 删除 X.com 点赞 / 收藏
- [Power Delete Suite](https://github.com/j0be/PowerDeleteSuite) - Reddit 自动删帖

### 浏览器隐私 {#browser-privacy}

- :globe-with-meridians: **[Browser Privacy Guides](https://www.privacyguides.org/en/desktop-browsers)** - 浏览器隐私 / 设置指南
- :repeat-button:️ **[Browser Comparisons](/internet-tools/#browser-tools)**
- :repeat-button:️ **[Android Privacy Browsers](/mobile/#android-browsers)**
- :star: **[Tor Browser](https://www.torproject.org/)**、[2](https://tor.eff.org/) - 洋葱路由浏览器 / [TG 下载 / 网桥](https://t.me/torproject) / <a target="_blank" href="http://2gzyxa5ihm7nsggfxnu52rck2vv4rvmdlkiu3zzui5du4xyclen53wid.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / <a target="_blank" href="https://gitlab.torproject.org/tpo/applications/tor-browser"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- :star: **[Mullvad Browser](https://mullvad.net/en/browser)** - Tor Browser 分支（不含 Tor 网络） / <a target="_blank" href="https://github.com/mullvad"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[LibreWolf](https://librewolf.net/)** - 自定义的隐私优先 Firefox / [Auto-Updater](https://github.com/ltguillaume/librewolf-winupdater)，[2](https://codeberg.org/ltguillaume/librewolf-winupdater) / <a target="_blank" href="https://www.reddit.com/r/LibreWolf"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://codeberg.org/librewolf"><span v-tooltip="'Source Code'" alt="Source Code" class="i-gravity-ui:code" /></a>
- [Brave Browser](https://brave.com/) - 隐私向 Chromium 浏览器 / [精简 / 加固](https://github.com/ChaoticSi1ence/SlimBrave-Neo) / [Origin](https://brave.com/origin/)（Linux） / <a target="_blank" href="https://www.reddit.com/r/brave_browser/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/brave/brave-browser"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Helium Browser](https://helium.computer/) - 隐私向 Chromium 浏览器 / <a target="_blank" href="https://github.com/imputnet/helium"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠Phoenix](https://codeberg.org/celenity/Phoenix) - Firefox 隐私调整 / <a target="_blank" href="https://github.com/celenityy/Phoenix"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / [警告](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/general-tweak-critical.md)
- [arkenfox](https://github.com/arkenfox/user.js) - Firefox 隐私调整 / [视频](https://youtu.be/F7-bW2y6lcI) / [GUI](https://arkenfox.github.io/gui/) / [警告](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/general-tweak-critical.md)
- [Encrypted SNI](https://www.cloudflare.com/ssl/encrypted-sni/) - Cloudflare 浏览器检查
- [⁠Disable JavaScript](https://disable-javascript.org/) - 禁用 JavaScript 指南 / 可能破坏网站 / 需要白名单

### 密码隐私 / 2FA {#password-privacy-2fa}

- :globe-with-meridians: **[2FA Directory](https://2fa.directory/)** - 支持 2FA 的网站列表 / <a target="_blank" href="https://github.com/2factorauth/twofactorauth"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :repeat-button:️ **[Password Managers](/internet-tools/#password-managers)**
- :star: **[Ente Auth](https://ente.com/auth/)** - 2FA / 全平台 / <a target="_blank" href="https://x.com/enteio"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://reddit.com/r/enteio"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/z2YVKkycX3"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/ente-io/ente"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Aegis](https://getaegis.app/)** - 2FA / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> / <a target="_blank" href="https://github.com/beemdevelopment/Aegis"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Stratum](https://stratumauth.com)** - 2FA / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> / <a target="_blank" href="https://github.com/stratumauth/app"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Password Strength Chart](https://www.reddit.com/r/dataisbeautiful/comments/1uw8fi2/oc_i_updated_our_popular_password_table_for_2026/)**
- [2FAS](https://2fas.com/) - 2FA / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> / <a target="_blank" href="https://x.com/2FAS_com"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://www.reddit.com/r/2fas_com/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/q4cP6qh2g5"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/twofas"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠Proton Authenticator](https://proton.me/authenticator) - 2FA / 全平台 / <a target="_blank" href="https://discord.com/invite/proton"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/orgs/protonpass/repositories"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Mauth](https://github.com/X1nto/Mauth) - 2FA / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [FreeOTPPlus](https://github.com/helloworld1/FreeOTPPlus) - 2FA / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [KeePassXC](https://keepassxc.org/) - 2FA / 本地 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> / [资源](https://github.com/lgg/awesome-keepass) / [指南](https://keepassxc.org/docs/KeePassXC_GettingStarted) / [视频](https://youtu.be/ckWPHaQwft8) / <a target="_blank" href="https://github.com/keepassxreboot/keepassxc"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [AuthMe](https://authme.levminer.com/) - 2FA / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> / <a target="_blank" href="https://github.com/Levminer/authme"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Yubioath](https://developers.yubico.com/yubioath-flutter/) - 2FA / YubiKey 支持 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> / <a target="_blank" href="https://x.com/yubico"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> / <a target="_blank" href="https://github.com/Yubico/yubioath-flutter"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [OTPClient](https://github.com/paolostivanin/OTPClient) - 2FA / <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> 
- [Sentinel](https://getsentinel.io/) - 2FA / <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> 
- [OTP Auth](https://apps.apple.com/app/otp-auth/id659877384) - 2FA / <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> 
- [Tofu](https://www.tofuauth.com/) - 2FA / <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> / <a target="_blank" href="https://github.com/iKenndac/Tofu"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Authenticator](https://authenticator.cc/) - 2FA 浏览器扩展 / <a target="_blank" href="https://github.com/Authenticator-Extension/Authenticator"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [2FAuth](https://docs.2fauth.app/) - 自托管 / <span v-tooltip="'Web'" alt="Web" class="i-fluent:globe-32-filled" /> / <a target="_blank" href="https://github.com/Bubka/2FAuth"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [VaultWarden](https://github.com/dani-garcia/vaultwarden) - 非官方 Bitwarden 服务器后端 / 自托管
- [OTP Helper](https://github.com/jd1378/otphelper) - 提取 OTP 令牌
- [steamguard-cli](https://github.com/dyc3/steamguard-cli) - 生成 Steam 2FA 验证码

### 加密通讯工具 {#encrypted-messengers}

::: tip 提示
请注意，即使启用了 E2EE，元数据仍可能对你的 homeserver 以及与你聊天者的 homeserver 可见。
:::

- :globe-with-meridians: **[Eylenburg Comparisons](https://eylenburg.github.io/im_comparison.htm)**、[SecuChart](https://bkil.gitlab.io/secuchart/)、[Messenger-Matrix](https://www.messenger-matrix.de/messenger-matrix-en.html) 或 [Secure Messaging Apps](https://www.securemessagingapps.com/) - 聊天应用索引 / 对比
- :globe-with-meridians: **[Matrix Clients](https://matrix.org/ecosystem/clients/)** / [Mod Bot](https://github.com/matrix-org/mjolnir) / [Resources](https://matrix.org/ecosystem/) / [Servers](https://tatsumoto-ren.github.io/blog/list-of-matrix-servers.html), [2](https://tatsumoto.neocities.org/blog/list-of-matrix-servers.html), [3](https://gitlab.com/famedly/conduit), [4](https://joinmatrix.org/servers/), [5](https://archive.md/4xZE4), [6](https://wiki.asra.gr/en:public_servers)
- :star: **[SimpleX](https://simplex.chat/)** - 全平台 / <a target="_blank" href="https://github.com/simplex-chat"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Signal](https://signal.org/)** - 全平台 / 需要手机号 / [贴纸](https://signalstickers.org/) / <a target="_blank" href="https://github.com/signalapp"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Briar](https://briarproject.org/)** / [Desktop](https://briarproject.org/download-briar-desktop/) / <a target="_blank" href="https://code.briarproject.org/briar/briar"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [Wire](https://wire.com/en/download/) - 全平台 / 需要手机号 / <a target="_blank" href="https://github.com/wireapp"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Session](https://getsession.org/) - 全平台 / <a target="_blank" href="https://github.com/session-foundation"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Keybase](https://keybase.io/) - 全平台 / <a target="_blank" href="https://github.com/keybase/client"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Jami](https://jami.net/) - 全平台 / <a target="_blank" href="https://git.jami.net/savoirfairelinux/jami-project"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [Tox](https://tox.chat/) / <a target="_blank" href="https://github.com/TokTok/c-toxcore"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [qTox](https://qtox.github.io/) / <a target="_blank" href="https://github.com/TokTok/qTox"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 全平台
- [Cabal](https://cabal.chat/) - P2P / 无服务器全平台 / <a target="_blank" href="https://github.com/cabal-club"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Linphone](https://www.linphone.org/) - 全平台 / <a target="_blank" href="https://gitlab.linphone.org/explore/projects"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [Berty](https://berty.tech/) /  <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" />  <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" />  / <a target="_blank" href="https://github.com/berty/berty"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Ricochet Refresh](https://www.ricochetrefresh.net/) /  <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" />  <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" />  <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" />  / <a target="_blank" href="https://github.com/blueprint-freespeech/ricochet-refresh"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Cwtch](https://docs.cwtch.im) /  <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" />  <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" />  <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" />  <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" />  / <a target="_blank" href="https://git.openprivacy.ca/cwtch.im/cwtch"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [Delta Chat](https://delta.chat/) - 基于电子邮件的去中心化通讯工具 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [Status](https://status.app/) /  <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" />  <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" />  / <a target="_blank" href="https://github.com/status-im"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Damus](https://damus.io/) 或 [MySudo](https://anonyome.com/individuals/mysudo/) / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> 
- [Molly](https://github.com/mollyim/mollyim-android) - Android
- [Databag](https://github.com/balzack/databag) - 自托管 / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> <span v-tooltip="'Web'" alt="Web" class="i-fluent:globe-32-filled" /> / <a target="_blank" href="https://github.com/balzack/databag"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [ssh-chat](https://github.com/shazow/ssh-chat) 或 [Devzat](https://github.com/quackduck/devzat) - SSH 聊天

### 电子邮件隐私 {#email-privacy}

- :globe-with-meridians: **[⁠OpenPGP Email Encryption](https://www.openpgp.org/software/)** - 加密（OpenPGP）电子邮件客户端索引
- :repeat-button:️ **[Temp Mail Sites](/internet-tools/#temp-mail)** - 创建临时 / 一次性电子邮件
- :repeat-button:️ **[Email Aliasing](/internet-tools/#email-aliasing)** - 创建永久匿名邮箱
- :star: **[Proton Mail](https://proton.me/mail)** - 1GB 免费 / 加密邮箱 / 不活跃 1 年后删除 / <a target="_blank" href="https://protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / <a target="_blank" href="https://www.reddit.com/r/ProtonMail/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / [更多存储](https://proton.me/support/more-free-storage-existing-users) / <a target="_blank" href="https://discord.com/invite/proton"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/ProtonMail"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Tuta](https://tuta.com/)** - 1GB 免费 / 加密邮箱 / 不活跃 6 个月后删除 / <a target="_blank" href="https://www.reddit.com/r/tutanota/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/tutao/tutanota"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Disroot](https://disroot.org/en/services/email) - 1GB 免费 / 加密邮箱
- [Mailvelope](https://mailvelope.com/) - 为邮件添加 PGP 加密 / <a target="_blank" href="https://github.com/mailvelope/mailvelope"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Email Privacy Tester](https://www.emailprivacytester.com/) - 邮箱隐私测试 / <a target="_blank" href="https://gitlab.com/mikecardwell/ept3"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [SecLists](https://seclists.org/) - 安全邮件列表存档
- [⁠Phishing Quiz](https://phishingquiz.withgoogle.com/) - 邮件钓鱼防范测验 / 指南

### 数据泄露监控 {#data-breach-monitoring}

- :star: **[Have I Been Pwned?](https://haveibeenpwned.com/)** / <a target="_blank" href="https://github.com/HaveIBeenPwned"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [F-Secure](https://www.f-secure.com/en/identity-theft-checker) / <a target="_blank" href="https://x.com/FSecure"><span v-tooltip="'X'" alt="X" class="i-carbon:logo-x" /></a> - 监控邮箱泄露
- :star: **[Have I Been Pwned Passwords](https://haveibeenpwned.com/Passwords)** - 密码泄露检查
- [Mozilla Monitor](https://monitor.mozilla.org/) - 数据泄露检查 / 需要注册 / <a target="_blank" href="https://github.com/mozilla/blurts-server"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠CanaryTokens](https://canarytokens.org/nest/) - 泄露检测令牌 / 即时通知 
- [BreachDirectory](https://breachdirectory.org)、[Leak Lookup](https://leak-lookup.com/)、[Trufflehog](https://trufflesecurity.com/) / <a target="_blank" href="https://discord.gg/8Hzbrnkr7E"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/trufflesecurity/trufflehog"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [LeakPeek](https://leakpeek.com/) / <a target="_blank" href="https://discord.com/invite/mNxhSRWKwq"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> - 数据泄露搜索引擎
- [Intelligence X](https://intelx.io/) - 密码泄露检查 / <a target="_blank" href="https://github.com/IntelligenceX"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [ScatteredSecrets](https://scatteredsecrets.com/) - 密码泄露检查 / 需要注册
- [BreachDetective](https://breachdetective.com/) - 密码泄露检查 / 需要注册

### 指纹识别 / 跟踪 {#fingerprinting-tracking}

- :star: **[CreepJS](https://abrahamjuliot.github.io/creepjs)**、[webkay](https://webkay.robinlinus.com/)、[browserrecon](https://www.computec.ch/projekte/browserrecon/?s=scan)、[TZP](https://arkenfox.github.io/TZP/tzp.html)、[Cover Your Tracks](https://coveryourtracks.eff.org/)、[⁠DeviceInfo](https://www.deviceinfo.me/) 或 [⁠BrowserScan](https://www.browserscan.net/) - 跟踪 / 指纹识别测试
- [Webbkoll](https://webbkoll.5july.net/) 或 [Blacklight](https://themarkup.org/blacklight) - 网站跟踪信息
- [Data Removal Guide](https://inteltechniques.com/workbook) - 删除在线数据
- [GameIndustry](https://gameindustry.eu/en/) - 在桌面 / 手机游戏中拦截跟踪器
- [URLCleaner](https://urlcleaner.net/) - 清理 URL / 从 URL 中移除跟踪元素 / 可能破坏网站
- [⁠I didn't set a cookie](https://kuber.studio/cookie/) - 无 Cookie 指纹识别演示
- [BrowserLeaks](https://browserleaks.com/)、[Do I leak?](https://www.top10vpn.com/tools/do-i-leak/) 或 [IPLeak.net](https://ipleak.net) - IP 泄露测试
- [JShelter](https://jshelter.org/) / <a target="_blank" href="https://pagure.io/JShelter/webextension"><span v-tooltip="'Source Code'" alt="Source Code" class="i-gravity-ui:code" /></a> 或 [Chameleon](https://github.com/00x127/Chameleon) - 防止指纹识别 / 扩展 / [警告](https://github.com/arkenfox/user.js/issues/1729#issuecomment-1739135479)
- [Locale Switcher](https://chromewebstore.google.com/detail/locale-switcher/kngfjpghaokedippaapkfihdlmmlafcc)，[2](https://addons.mozilla.org/en-US/firefox/addon/languageswitch) - 更改语言标识 / <a target="_blank" href="https://github.com/locale-switcher/locale-switcher"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [AnonymousRedirect](https://adguardteam.github.io/AnonymousRedirect/) - 匿名化链接
- [X.com Direct](https://greasyfork.org/en/scripts/404632) - 移除 X.com 上的 t.co 跟踪

### 搜索引擎 {#search-engines}

- :globe-with-meridians: **[Search Engine Party](https://searchengine.party/)** - 隐私搜索引擎对比 / <a target="_blank" href="https://gitlab.com/nitrohorse/search-engines-compare"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- :repeat-button:️ **[SearX Instances](/storage/#searx-instances)** - SearX 实例索引 / [文档 / 托管](https://docs.searxng.org/) / <a target="_blank" href="http://searxspbitokayvkhzhsnljde7rqmn7rvoga6e4waeub3h7ug3nghoad.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / [Matrix](https://matrix.to/#/#searxng:matrix.org) / <a target="_blank" href="https://github.com/searxng"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Brave Search](https://search.brave.com/)** - 独立 / 支持 DDG Bangs / <a target="_blank" href="https://search.brave4u7jddbv7cyviptqjc7jusxh72uik7zt6adtckl5f4nwy2v72qd.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a>
- :star: **[DuckDuckGo](https://start.duckduckgo.com/)** - 元搜索 / 基于 Bing / [无 AI](https://noai.duckduckgo.com/) / [精简版](https://lite.duckduckgo.com/) / [HTML](https://html.duckduckgo.com/) / <a target="_blank" href="https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / [Bangs](https://duckduckgo.com/bangs) / [Bangs 扩展](https://github.com/dmlls/yang) / [Bangs 脚本](https://greasyfork.org/scripts/588027) / <a target="_blank" href="https://www.reddit.com/r/duckduckgo/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a>
- :star: **[Startpage](https://www.startpage.com/)** - 基于 Google + Bing / <a target="_blank" href="https://www.reddit.com/r/StartpageSearch/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a>
- :star: **[4get](https://4get.ca/)** - 元搜索 / [实例](https://4get.ca/instances) / <a target="_blank" href="https://git.lolcat.ca/lolcat/4get"><span v-tooltip="'Source Code'" alt="Source Code" class="i-gravity-ui:code" /></a>
- [Degoog](https://github.com/degoog-org/degoog) - 元搜索 / <a target="_blank" href="https://github.com/fccview/degoog"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [LibreY](https://github.com/Ahwxorg/librey/) - 元搜索
- [search!](https://search.tiago.zip/) - 无 AI / 元搜索 / <a target="_blank" href="https://github.com/tiagozip/metasearch"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Mojeek](https://www.mojeek.com/) - 独立 / <a target="_blank" href="https://www.reddit.com/r/mojeek/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a>
- [YaCy](https://yacy.net/) - 去中心化 / P2P 独立 / <a target="_blank" href="https://github.com/yacy/yacy_search_server"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>

## VPN {#vpn}

::: tip 提示
通常最好使用付费 VPN，尤其是当你在意隐私或速度时。免费 VPN 多用于解锁网站等用途。记得将 VPN [绑定](https://wispydocs.pages.dev/torrenting/)到客户端，以免收到 ISP 警告信。
:::

- :globe-with-meridians: **[Techlore Chart](https://vpn.techlore.tech/)** - VPN 对比图表
- :globe-with-meridians: **[VPN Relationships](https://kumu.io/Windscribe/vpn-relationships)**，[2](https://windscribe.com/vpnmap) - VPN 关系图
- :star: **[Cloudflare One](https://one.one.one.one/)** 或 / [Oblivion](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/alt-warp-clients.md) - 免费 / 无限 / [Wireguard](https://rentry.co/foss-warp)（断网保护） / <a target="_blank" href="https://discord.com/invite/cloudflaredev"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- :star: **[Proton VPN](https://protonvpn.com)** - 免费与付费 / 无限 / 免费套餐不支持 BT 下载 / [移动端](/mobile/#app-patchers-modifiers)（搜索） / [Wireguard](https://protonvpn.com/support/wireguard-configurations) / <a target="_blank" href="https://www.reddit.com/r/ProtonVPN/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://t.me/proton_privacy"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://discord.com/invite/proton"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/ProtonVPN/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[Windscribe](https://windscribe.com)** - 免费与付费 / 每月 10GB / 免费套餐不支持 BT 下载 / <a target="_blank" href="https://www.reddit.com/r/Windscribe/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/windscribe"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[AirVPN](https://airvpn.org/)** - 付费 / <a target="_blank" href="https://airvpn3epnw2fnsbx5x2ppzjs6vxtdarldas7wjyqvhscj7x43fxylqd.onion/"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / <a target="_blank" href="https://github.com/AirVPN"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <a target="_blank" href="https://gitlab.com/AirVPN"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- :star: **[Mullvad VPN](https://mullvad.net/)** - 付费 / [无日志](https://mullvad.net/en/blog/2023/4/20/mullvad-vpn-was-subject-to-a-search-warrant-customer-data-not-compromised/) / [无端口转发](https://mullvad.net/en/blog/removing-the-support-for-forwarded-ports) / <a target="_blank" href="https://ao54hon2e2vj6c7m3aqqu6uyece65by3vgoxxhlqlsvkmacw6a7m7kiad.onion"><span v-tooltip="'.onion'" alt=".onion" class="i-simple-icons:torbrowser w-1em h-1em" /></a> / <a target="_blank" href="https://github.com/mullvad"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[IVPN](https://www.ivpn.net/)** - 付费 / [无日志](https://www.ivpn.net/knowledgebase/privacy/how-do-we-react-when-requested-by-an-authority-for-information-relating-to-a-customer/) / [无端口转发](https://www.ivpn.net/blog/gradual-removal-of-port-forwarding/) / <a target="_blank" href="https://www.reddit.com/r/IVPN/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/ivpn"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Firefox VPN](https://support.mozilla.org/en-US/kb/built-in-vpn) - 免费 / 每月 50GB
- [Nym](https://nym.com/) - 付费 / [5 跳混合网络](https://nym.com/mixnet) / <a target="_blank" href="https://www.reddit.com/r/nym/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/nymtech/nym"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [RiseupVPN](https://riseup.net/en/vpn) / <a target="_blank" href="https://github.com/riseupnet"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>、[Calyx VPN](https://f-droid.org/packages/org.calyxinstitute.vpn/) (android) 或 [Bitmask](https://bitmask.net/) / [Android](https://0xacab.org/leap/bitmask_android) / <a target="_blank" href="https://0xacab.org/leap/bitmask-vpn"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a> - 免费 / 无限 / 不支持端口转发
- [PrivadoVPN](https://privadovpn.com/freevpn) - 免费 / 每月 10GB / 通过 [Temp Mail](/internet-tools/#temp-mail) 无限注册账号

### VPN 服务器 {#vpn-server}

- :star: **[WireGuard](https://www.wireguard.com/)** - VPN 隧道 / [指南](https://www.wireguard.com/quickstart/) / [Web UI](https://github.com/wg-easy/wg-easy) / <a target="_blank" href="https://www.wireguard.com/repositories/"><span v-tooltip="'Source Code'" alt="Source Code" class="i-gravity-ui:code" /></a>
- :star: **[Tailscale](https://tailscale.com/)** 或 **[⁠NetBird](https://netbird.io/)** - WireGuard 网状网络
- [Amnezia](https://amnezia.org/)、[2](https://storage.googleapis.com/amnezia/amnezia.org) - VPN 服务器 / <a target="_blank" href="https://www.reddit.com/r/AmneziaVPN/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.com/invite/JfrKFScw6N"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://t.me/amnezia_vpn_en"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/amnezia-vpn"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [OpenVPN](https://openvpn.net/) - VPN 服务器
- [WGDashboard](https://wgdashboard.dev/) - WireGuard 面板 / AmneziaWG / <a target="_blank" href="https://www.reddit.com/r/WGDashboard/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.gg/72TwzjeuWm"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/donaldzou/WGDashboard"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠Twingate](https://www.twingate.com/) - Zero Trust 访问隧道
- [⁠Headscale](https://github.com/juanfont/headscale) - 自托管 Tailscale
- [⁠Nebula](https://github.com/slackhq/nebula) 或 [ZeroTier](https://www.zerotier.com/) - 网状 VPN 服务器
- [IPsec VPN](https://github.com/hwdsl2/setup-ipsec-vpn) - VPN 服务器
- [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) 或 [CF Quick Tunnels](https://try.cloudflare.com/) - 应用隧道 / VPN 替代方案 / [WireGuard](https://gist.github.com/WildeBeast2521/adabae243e0b83e344ceef0422c3fa6d)
- [Cloud WireGuard Guide](https://github.com/rajannpatel/Pi-Hole-on-Google-Compute-Engine-Free-Tier-with-Full-Tunnel-and-Split-Tunnel-Wireguard-VPN-Configs) - 使用 Google Cloud 的 WireGuard + Pi-hole VPN
- [tinc VPN](https://www.tinc-vpn.org/) - VPN 隧道 / <a target="_blank" href="https://github.com/gsliepen/tinc"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <a target="_blank" href="https://gitlab.com/gsliepen/tinc"><span v-tooltip="'GitLab'" alt="GitLab" class="i-carbon:logo-gitlab" /></a>
- [WireHole](https://github.com/IAmStoxe/wirehole) - WireGuard + Pi-hole VPN / [Web UI](https://github.com/10h30/wirehole-ui)
- [OpenConnect](https://gitlab.com/openconnect/openconnect) - SSL VPN / [GUI](https://openconnect.github.io/openconnect-gui/)
- [Pritunl](https://pritunl.com/) - VPN 服务器 / <a target="_blank" href="https://github.com/pritunl/pritunl"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Algo VPN](https://blog.trailofbits.com/2016/12/12/meet-algo-the-vpn-that-works/) - 云 VPN / <a target="_blank" href="https://github.com/trailofbits/algo"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [SShuttle](https://sshuttle.readthedocs.io/en) - SSH VPN 服务器 / <a target="_blank" href="https://github.com/sshuttle/sshuttle"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [DSVPN](https://github.com/jedisct1/dsvpn) - 简单 VPN 服务器
- [ocserv](https://ocserv.openconnect-vpn.net/index.html) - SSL VPN 服务器

### VPN 工具 {#vpn-tools}

- :repeat-button:️ **[Free VPN Configs](/storage/#free-vpn-configs)**
- :star: **[VPN Binding Guide](https://wispydocs.pages.dev/torrenting/)** - 将 VPN 绑定到 BT 客户端以避免 ISP 警告信
- [WireSock Secure Connect](https://wiresock.net/wiresock-secure-connect)、[Amnezia](https://amnezia.org/self-hosted)、[2](https://storage.googleapis.com/amnezia/amnezia.org) / <a target="_blank" href="https://www.reddit.com/r/AmneziaVPN/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.com/invite/JfrKFScw6N"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://t.me/amnezia_vpn_en"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/amnezia-vpn"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [TunnlTo](https://tunnl.to/) - 分流隧道客户端
- [WG Tunnel](https://wgtunnel.com/) - WireGuard 与 AmneziaWG 客户端 / [Android](https://github.com/wgtunnel/android) / [Desktop](https://github.com/wgtunnel/desktop) / <a target="_blank" href="https://t.me/wgtunnel"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/wgtunnel"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [VPN Hotspot](https://github.com/Mygod/VPNHotspot) - 通过热点 / 已 root 的 Android 共享 VPN 连接
- [Gluetun](https://github.com/qdm12/gluetun) - 使用 Docker 的 VPN

## 代理 {#proxy}

- [Lantern](https://lantern.io/) - 代理应用 / <a target="_blank" href="https://github.com/getlantern/lantern"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Psiphon](https://psiphon.ca/) - 混合代理 VPN 应用
- [FreeSocks](https://freesocks.org/) - Shadowsocks 应用 / <a target="_blank" href="https://github.com/unredacted/freesocks-control-plane"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Snowflake](https://snowflake.torproject.org/) - Tor 代理浏览器扩展
- [Censor Tracker](https://censortracker.org/) / <a target="_blank" href="https://t.me/CensorTracker_feedback"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/censortracker/censortracker"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>、[SmartProxy](https://github.com/salarcode/SmartProxy)、[FoxyProxy](https://getfoxyproxy.org/) 或 [ZeroOmega](https://github.com/zero-peak/ZeroOmega) - 代理扩展
- [Acrylic](https://mayakron.altervista.org/) - 本地 DNS 代理
- [DNSCrypt](https://dnscrypt.info/) / <a target="_blank" href="https://github.com/DNSCrypt/dnscrypt-proxy"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> - 本地 DNS 加密代理

### 代理服务器 {#proxy-servers}

- :star: **[3X-UI](https://docs.sanaei.dev/)** - 代理面板 / <a target="_blank" href="https://t.me/XrayUI"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/MHSanaei/3x-ui"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / **[Guide](https://wispydocs.pages.dev/network-censorship-circumvention/)**
- :star: **[Project X](https://github.com/XTLS/Xray-core)** - Xray 代理核心 / <a target="_blank" href="https://t.me/projectXray"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a>、[2](https://t.me/projectVless)
- [NaïveProxy](https://github.com/klzgrad/naiveproxy) - 基于 Chromium 的代理
- [Hysteria](https://v2.hysteria.network/) - 速度优先代理协议 / <a target="_blank" href="https://t.me/hysteria_github"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/apernet/hysteria"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Shadowsocks](https://shadowsocks.org/) - 简易代理协议 / <a target="_blank" href="https://github.com/shadowsocks"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [sing-box](https://sing-box.sagernet.org/) - 代理核心 / <a target="_blank" href="https://t.me/yapug"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/SagerNet/sing-box"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Hiddify Manager](https://hiddify.com/) - 代理面板 / <a target="_blank" href="https://t.me/hiddify"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/hiddify/Hiddify-Manager"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Outline](https://getoutline.org/) - Shadowsocks 服务器 / [指南](https://docs.getoutline.com/s/hosting/) / <a target="_blank" href="https://www.reddit.com/r/outlinevpn/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/Jigsaw-Code/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [VpnHood](https://github.com/vpnhood/VpnHood) - 代理服务器
- [Scramjet](https://docs.titaniumnetwork.org/proxies/scramjet/) / <a target="_blank" href="https://github.com/MercuryWorkshop/scramjet/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [Nebula](https://github.com/NebulaServices/Nebula) - Web 代理服务器
- [Nginx Proxy Manager](https://nginxproxymanager.com) - 反向代理 UI / <a target="_blank" href="https://reddit.com/r/nginxproxymanager"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://github.com/NginxProxyManager/nginx-proxy-manager"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>

### 代理客户端 {#proxy-clients}

- :star: **[v2rayN](https://github.com/2dust/v2rayN)** - 代理客户端 /  <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" />  <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" />  <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> 
- :star: **[v2rayNG](https://github.com/2dust/v2rayNG)**、[NekoBox](https://matsuridayo.github.io/) / <a target="_blank" href="https://github.com/MatsuriDayo/NekoBoxForAndroid/"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> 或 [MahsaNG](https://github.com/GFW-knocker/MahsaNG) / <a target="_blank" href="https://t.me/s/mahsa_net"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a>、[2](https://t.me/+YIlqV-fl9y4zMmRk) - 代理客户端 /  <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [Hiddify](https://hiddify.com/) - 代理客户端 / 全平台 / <a target="_blank" href="https://t.me/hiddify"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/hiddify"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Amnezia](https://amnezia.org/)、[2](https://storage.googleapis.com/amnezia/amnezia.org) - 代理客户端 / 全平台 / <a target="_blank" href="https://www.reddit.com/r/AmneziaVPN/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a> / <a target="_blank" href="https://discord.com/invite/JfrKFScw6N"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://t.me/amnezia_vpn_en"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/amnezia-vpn"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Shadowsocks](https://shadowsocks.org/doc/getting-started.html#gui-clients) - Shadowsocks 客户端 / 全平台 / <a target="_blank" href="https://github.com/shadowsocks"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [sing-box](https://sing-box.sagernet.org/clients/) - 代理客户端 / <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> / <a target="_blank" href="https://t.me/yapug"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/SagerNet/sing-box"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Throne](https://throneproj.github.io/) - 代理客户端 / Sing-Box GUI / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> / <a target="_blank" href="https://github.com/throneproj/Throne"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [V2Box](https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box)（Android）或 [V2Box](https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690)（iOS） - 代理客户端
- [ClashVerge](https://www.clashverge.dev/) - 代理客户端 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> / <a target="_blank" href="https://github.com/clash-verge-rev/clash-verge-rev"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [Streisand](https://streisand.pages.dev/) - 代理客户端 / <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'iOS'" alt="iOS" class="i-simple-icons:ios" /> 
- [⁠FlClash](https://github.com/chen08209/FlClash/blob/main/README.md) /  <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" />  <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" />  <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" />  <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [husi](https://github.com/xchacha20-poly1305/husi) - 代理客户端 / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [⁠Exclave](https://github.com/dyhkwong/Exclave) - 代理客户端 / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [Proxifier](/downloading/#software-sites)（搜索） - 为应用添加代理功能 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [wireproxy](https://github.com/whyvl/wireproxy) - WireGuard 作为代理 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <div v-tooltip="'macOS'" alt="macOS" class="i-qlementine-icons:mac-fill-16" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> 

### 反审查 {#anti-censorship}

- :repeat-button:️ **[Great Firewall Bypass](/non-english/#great-firewall)**
- :star: **[⁠Project Atlas](https://project-atlas-dbb.pages.dev/)** - 绕过审查指南
- :star: **[⁠Net4people](https://github.com/net4people/bbs/issues)** - 全球规避审查讨论
- :star: **[ByeDPIAndroid](https://github.com/dovecoteescapee/ByeDPIAndroid)** - 网络数据包修改工具 / <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- :star: **[DNSveil](https://msasanmh.github.io/DNSveil/)** - DNSCrypt、DoH 和 DoT 客户端 / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> / <a target="_blank" href="https://github.com/msasanmh/DNSveil"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- :star: **[zapret](https://github.com/bol-van/zapret2)**、**[SpoofDPI](https://github.com/xvzc/SpoofDPI)** 或 **[GoodbyeDPI](https://github.com/ValdikSS/GoodbyeDPI/)** - 网络数据包修改工具
- [⁠Geph](https://geph.io/) - 反审查代理 / <a target="_blank" href="https://github.com/geph-official"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [⁠FilterWatch](https://filter.watch/english/) - 审查新闻 / 文章
- [ByeByeDPI](https://github.com/romanvht/ByeByeDPI/blob/master/README-en.md)、[⁠Paqet](https://github.com/hanselime/paqet)、[PowerTunnel](https://github.com/krlvm/PowerTunnel) 或 [Green Tunnel](https://github.com/SadeghHayeri/GreenTunnel) - 网络数据包修改 / 数据包级代理
- [DNSTT.XYZ](https://dnstt.xyz/) - DNS 隧道客户端 / <a target="_blank" href="https://t.me/dnstt_xyz"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a> / <a target="_blank" href="https://github.com/dnstt-xyz/dnstt_xyz_app"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a> / <span v-tooltip="'Windows'" alt="Windows" class="i-qlementine-icons:windows-24" /> <span v-tooltip="'Linux'" alt="Linux" class="i-fluent-mdl2:linux-logo-32" /> <span v-tooltip="'Android'" alt="Android" class="i-material-symbols:android" /> 
- [YouTubeUnblock](https://github.com/Waujito/youtubeUnblock) - 使用 SNI 伪装解锁 YouTube / OpenWrt / Entware 路由器

### 代理网站 {#proxy-sites}

::: tip 提示
请注意，许多代理网站会记录 IP 地址、访问过的网站等信息。它们适合用于解锁网站，但对隐私保护用处不大。
:::

- :repeat-button:️ **[Proxy Lists](/storage/#proxy-lists)**
- [Titanium Network](https://titaniumnetwork.org/#services) - 多代理 / [实例](https://discord.gg/unblock) / <a target="_blank" href="https://discord.gg/unblock"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a> / <a target="_blank" href="https://github.com/titaniumnetwork-dev"><span v-tooltip="'GitHub'" alt="GitHub" class="i-carbon:logo-github" /></a>
- [SSLSecureProxy](https://www.sslsecureproxy.com/), [2](https://www.4everproxy.com/), [3](https://www.hideip.co/)
- [ProxyOf2](https://proxyof2.com/)
- [Phantom](https://phantom.lol/) / <a target="_blank" href="https://discord.com/invite/goshadow"><span v-tooltip="'Discord'" alt="Discord" class="i-carbon:logo-discord" /></a>
- [Reflect4](https://reflect4.me/)、[CroxyProxy](https://www.croxyproxy.com/) 或 [Blockaway](https://www.blockaway.net/)
- [ProxyPal](https://proxypal.net/) / <a target="_blank" href="https://t.me/PlainProxies"><span v-tooltip="'Telegram'" alt="Telegram" class="i-mdi:telegram" /></a>
- [Proxyium](https://proxyium.com/)
- [Startpage](https://www.startpage.com/) - 使用 Anon View / <a target="_blank" href="https://www.reddit.com/r/StartpageSearch/"><span v-tooltip="'Reddit'" alt="Reddit" class="i-mdi:reddit" /></a>
- [Google Translate](https://translate.google.com/) / [Note](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/google-translate-note.md)
- [Proxy Checker](https://proxy-checker.net/)、[proxy-scraper](https://github.com/iw4p/proxy-scraper) 或 [proxy-scraper-checker](https://github.com/monosans/proxy-scraper-checker) - 代理抓取 / 检查工具
- [Knaben.info](https://knaben.info/) - 种子站代理
