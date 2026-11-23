### 广告拦截 {#adblocking}

> 使用广告拦截器有多重要？


网站通常包含广告，其中一些可能有害，常导致不需要的页面或虚假下载按钮。真正的下载按钮通常较小，常以文本形式或巧妙融入网站设计。虚假按钮通常较大、颜色鲜艳，使用“立即下载”等通用术语，并且可能在页面上多次出现。很难区分它们，因此始终使用广告拦截器很重要。请记住，一些文件托管网站有虚假弹窗，真正的下载发生在下载页面本身，而不是重定向页面或弹窗标签。

对于浏览器，我们推荐 **[uBlock Origin (uBO)](https://github.com/gorhill/uBlock)**，你也可以使用 **[重定向跳过器](/internet-tools/#redirect-bypass)** 来跳过烦人的倒计时。请注意，单独使用 uBO 就足以进行浏览器广告拦截；搭配 DNS 使用可能会导致冲突。请查看下方“浏览器”一节，了解我们推荐的浏览器。另请注意，我们强烈推荐使用完整版 uBO，而不是精简版。

对于移动端 **[AdGuard Premium](/mobile/#android-adblocking)** / [iOS](https://adguard.com/en/adguard-ios/overview.html)，你可以用 **[Morphe](https://morphe.software/)** 屏蔽 YouTube 和 Reddit 广告，也可以选择[轻松设置](https://wispydocs.pages.dev/morphe-piko-obtainium/)。请注意，uBO 也适用于移动端浏览器，如 Firefox。


::: info 信息
同时使用多个广告拦截器（如 uBO 和 AdGuard）可能会[出问题](https://x.com/gorhill/status/1033706103782170625)。这种情况只会发生在常规广告拦截器上，所以将 uBO 与 SponsorBlock 之类的工具一起使用完全没问题。
:::

### 杀毒软件 {#antivirus}

> 如何安全地扫描文件，并确定检测结果是否为误报？


许多流行的文件托管网站都有下载按钮，会重定向到虚假的恶意下载页面。使用完整版 [uBlock Origin](/privacy/#adblocking) 可以防止这种情况，但并非总是有效。阅读这份[指南](https://cs.rin.ru/forum/viewtopic.php?f=14&t=159345)以了解虚假恶意下载页面的样子以及如何避免它们。一般规则是避免在新标签页或重定向页面中打开的下载页面，真正的下载发生在与文件托管网站相同的页面内。

在安装任何文件之前，建议使用 **[VirusTotal](https://www.virustotal.com/)** 扫描安装程序/安装包，并在 [Triage](https://tria.ge/)（沙箱）中运行它。如果你难以确定某些内容是否为误报，请参考 **[Scan Guide](https://clarasguide.valeena.workers.dev/Guides/vtguide/)**，或在 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 中发送给我们，我们会为你查看。对于 Android 应用，最好在像 [Triage](https://tria.ge/) 这样的沙箱中分析它们。


::: info 信息
大多数杀毒程序是不必要的，并且可能导致速度变慢。如果你使用可信的网站，Windows Defender 应该足以保证你的安全，你可以不时运行 [Malwarebytes](https://www.malwarebytes.com/) 扫描以获得额外保护。
:::


### 浏览器 {#browsers}

> 我应该使用哪个网络浏览器？


我们推荐 **[Firefox](/internet-tools/#firefox-tools)**，但你也可以尝试 **[注重隐私的浏览器](/privacy/#browser-privacy)**，或者如果你更喜欢 Chromium，可以试试 **[Brave](https://brave.com/)**。

对于 Android，我们推荐 **[Brave](https://brave.com/)** 或 **[Firefox](https://www.firefox.com/browsers/mobile/android/)**。

对于 iOS，我们推荐 **Safari + [wBlock](https://skula.me/project/wblock/)** 或 **[Brave](https://brave.com/)**。


::: info 信息
我们建议浏览我们的[扩展](/internet-tools/#browser-extensions) / [用户脚本](/internet-tools/#userscripts)部分，寻找增强浏览器的方法。
:::

### Base64 {#base64}

> 如何解码 Base64？


如果你看到像 `aHR0cHM6Ly9mbWh5Lm5ldC8` 这样的一串文本，可以用 Base64 解码器查看。有些可能需要解码两次。

* **[Base64 解码器](/text-tools/#encode-decode) / [Auto Decode](https://greasyfork.org/en/scripts/485772-fmhy-base64-auto-decoder)**

### 电影 / 剧集 {#movies-shows}

* **在线观看：[在线观看网站列表](/video/)**
* **下载：[资源目录](/video/#download-sites)**
* **BT 下载：[ExT.to](https://ext.to/browse/?cat=1) / [1337x](https://1337x.to/movie-library/1/)**
* **体育在线观看：[StreamCorner](https://streamcorner.st/) / [TimStreams](https://timstreams.st/)**
* **剧集在线观看：[GoPlay](https://goplay.su/) / [DramaCool](https://dramacool-l.fun/)**
* **追踪：[Simkl](https://simkl.com/) / [Letterboxd](https://letterboxd.com/)**
* **发现：[They Shoot Pictures](https://theyshootpictures.com/) / [MDBList](https://mdblist.com/) / [SeriesGraph](https://seriesgraph.com/)**

### 动漫 {#anime}

* **在线观看：[Anikoto](https://anikototv.to/) / [Re:ANIME](https://reanime.to/) / [Miruro](https://www.miruro.com/) / [animepahe](https://animepahe.pw/)**
* **下载：[Tokyo Insider](https://www.tokyoinsider.com/) / [Kayoanime](https://kayoanime.com/)**
* **BT 下载：[Nyaa](https://nyaa.si/) / [Hayase](https://hayase.watch/) / [Extensions](https://rentry.co/FMHYB64#hayase)**
* **追踪：[MAL](https://myanimelist.net/) / [AniList](https://anilist.co/)**
* **发现：[Anime-Planet](https://www.anime-planet.com/anime/recommendations) / [AnimeKarmaList](https://animekarmalist.com/)**

### 音乐 {#music}

* **在线观看：[SpotX](https://github.com/SpotX-Official/SpotX) / [Monochrome](https://monochrome.st/)**
* **下载：[lucida](https://lucida.to/) / [Nicotine+](https://nicotine-plus.org/)**
* **Android：[Morphe](https://wispydocs.pages.dev/morphe-piko-obtainium/)（YTM 补丁）/ [⁠ArchiveTune](https://archivetune.miuka.moe/) / [Mornye](https://mornye.com/)**
* **iOS：[⁠8SPINE](https://apps.apple.com/app/8spine-the-music-app/id6755934415) / [Modules](https://8spine-modules.pages.dev/) / [EeveeSpotifyReincarnated](https://t.me/eeveespotify_hazel)**
* **追踪：[RateYourMusic](https://rateyourmusic.com/) / [Last.fm](https://www.last.fm/)**
* **发现：[RYM Charts](https://rateyourmusic.com/charts/) / [AnyDecentMusic](https://www.anydecentmusic.com/) / [NTS Radio](https://www.nts.live/)**

### 游戏 {#gaming}

* **下载 / BT：[⁠HizSearch](https://hizsearch.pages.dev/) / [Virgil Game Search](https://virgil.samidy.com/?engine=games) / [AnkerGames](https://ankergames.net/) / [SteamRIP](https://steamrip.com/) / [FitGirl Repacks](https://fitgirl-repacks.site/)**
* **模拟 / ROMs：[Emulation Wiki](https://emulation.gametechwiki.com/index.php/Main_Page) / [Axekin](https://www.axekin.com/) / [r/ROMs Mega](https://r-roms.github.io/)**
* **追踪：[Backloggd](https://www.backloggd.com/) / [Glitchwave](https://glitchwave.com/)**
* **发现：[AcclaimedVideoGames](https://www.acclaimedvideogames.com/) / [SteamDB Ratings](https://steamdb.info/stats/gameratings/)**

### 阅读 {#reading}

* **下载：[Anna's Archive](https://annas-archive.gl/) / [Z-Library](https://z-lib.gd/)**
* **有声书：[Mobilism Audiobooks](https://forum.mobilism.org/viewforum.php?f=124) / [AudiobookBay](https://audiobookbay.lu/) / [Warning](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/audiobookbay-critical.md)**
* **电子书阅读器：[Readest](https://readest.com/) / [Koodo](https://www.koodoreader.com/) / [Google Play Books](https://play.google.com/books)**
* **日漫：[Weeb Central](https://weebcentral.com/) / [Kagane](https://kagane.org/) / [MangaDot](https://mangadot.net/)**
* **漫画：[BatCave](https://batcave.biz/) / [GetComics](https://getcomics.org/)**
* **Android 阅读器：[Librera](https://librera.mobi/) / [Moon+ Reader](https://www.moondownload.com/) + [Theme Guide](https://clarasguide.valeena.workers.dev/Guides/moontheme/)**
* **追踪：[StoryGraph](https://www.thestorygraph.com/) / [Hardcover](https://hardcover.app/)（书籍）/ [MAL](https://myanimelist.net/)（日漫）/ [League of Comic Geeks](https://leagueofcomicgeeks.com/)（漫画）**
* **发现：[Five Books](https://fivebooks.com/) / [The Greatest Books](https://thegreatestbooks.org/)（书籍）/ [MangaBaka](https://mangabaka.org/)（日漫）/ [ComicBookCanon](https://www.comicbookcanon.com/)（漫画）**

### 隐私 {#privacy}

> 我没什么可隐藏的，为什么还要在意隐私？


隐私关乎的是控制你的个人信息，而不只是保守秘密。企业会利用非敏感数据追踪你的行为、精准投放广告并影响你的选择。

在电子邮件隐私方面，我们推荐 **[Proton](https://proton.me/mail)**；在搜索方面，推荐 **[SearXNG](/storage/#searx-instances)**。同时建议用 HaveIBeenPwned 的 **[email](https://haveibeenpwned.com/)** 和[密码](https://haveibeenpwned.com/Passwords)检测工具，确认你的信息没有出现在近期的数据泄露事件中。


::: info 信息
在你无法确定能否信任的任何网站上，绝不要输入真实的电子邮件或密码。为你注册的每个网站使用独一无二的密码。这样一旦发生泄露，也只有那一个网站的凭据会受影响。你还可以利用电子邮件[别名](/internet-tools/#email-aliasing)获得额外一层保护。
:::


::: info 信息
请记住，把个人或机密文件上传到任何文件托管 / 云端 AI 都**绝**不是好主意，即使它们声称已加密。
:::

### Windows 指南 {#windows-guide}

> 如何免费下载 / 激活 Windows？


* **[Windows Install / Debloat Guide](https://wispydocs.pages.dev/windows/)**

从 Massgrave 的 **[Genuine Installation Media](https://massgrave.dev/genuine-installation-media)** 页面下载 ISO，然后按照 **[Clean Install Windows Guide](https://massgrave.dev/clean_install_windows)** 进行安装。安装完成后，用 **[Microsoft Activation Scripts](https://rentry.co/FMHYB64#mas)** 激活。如果你想在 Windows 10 生命周期结束后继续使用它，请参考 **[Windows 10 After EOL](https://massgrave.dev/windows10_eol)**。

注意，你可以打开文件资源管理器，点击“查看”菜单，并勾选“文件扩展名”复选框，以此显示所有文件的扩展名。

* **软件网站：[Virgil Software Search](https://virgil.samidy.com/?engine=software) / [CracksURL](https://cracksurl.com/) / [Download Guide](https://cracksurl.com/how-to-download/) / [LRepacks](https://lrepacks.net/)**

### BT 下载 {#torrenting}

> BT 下载需要 VPN 吗？


通过 BT 下载文件可能会给你的 ISP 带来麻烦，因此在大多数国家使用 **[VPN](/privacy/#vpn)** 是必需的。你还应该 **[bind your VPN](https://wispydocs.pages.dev/torrenting/)** 到你的 BT 客户端。这样可确保在 VPN 连接断开时，BT 客户端会停止所有流量，避免真实 IP 地址暴露。你也可以使用 **[远程 BT 下载服务](/torrenting/#remote-torrenting)**，从而完全无需使用 VPN。

> 什么是端口转发？我需要它吗？


[端口转发](https://wispydocs.pages.dev/torrenting/#port-forwarding)（即拥有一个开放端口）推荐给不使用 VPN 进行 BT 下载的用户，或使用支持端口转发的 VPN 的用户。虽然并非严格必需，但它有利于整个群组，有时能提升下载速度，并改善种子较少的 BT 任务的连通性。

### Android 应用 {#android-apps}

* **[Mobilism](https://forum.mobilism.org/viewforum.php?f=398)** - 修改版 APK
* **[APKMirror](https://www.apkmirror.com/)** - 未经修改的 APK
* **[Droid-ify](https://droidify.app/)** - FOSS Android 应用 / [GitHub](https://github.com/Droid-ify/client)
* **[Obtainium](https://github.com/ImranR98/Obtainium/)** - 获取 Android 应用更新

### iOS 侧载 {#ios-sideloading}

* **[TrollStore](https://github.com/opa334/TrollStore)** - 无限应用侧载 [iOS 14.0-17.0]
* **[SideStore](https://sidestore.io/)** - 非越狱侧载应用 [iOS 16.0 及以上]
* **[Sideloadly](https://sideloadly.io/)** - 非越狱侧载应用 [iOS 7.0 及以上]
* **[Impactor](https://impactor.claration.dev/)** - 非越狱侧载

### 重要链接 {#important-links}

* **下载管理器：[AB Download Manager](https://abdownloadmanager.com/)**
* **[Translate Web Pages](https://github.com/FilipePS/Traduzir-paginas-web)** - 将网页翻译为你的语言
* **[Glossary / Terminology](https://fluffle.cc/piracyglossary)** - 常见盗版术语定义
* **[Unsafe Sites / Software](https://fmhy.net/unsafe)** - 我们建议避免的内容
* **[FMHY.net](https://fmhy.net/)** - 我们的网站，包含更多站点 / 工具

**新手指南链接**
- https://fmhy.net/beginners-guide
- https://rentry.org/Piracy-BG/