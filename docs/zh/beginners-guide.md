### 广告拦截 {#adblocking}

> 使用广告拦截器有多重要？


网站通常含有广告，其中一些可能有害，常会导致进入不需要的页面或出现虚假下载按钮。真正的下载按钮通常较小，往往以文本形式呈现，或巧妙融入网站设计中。虚假按钮则通常很大、颜色鲜艳，使用“立即下载”之类的通用措辞，并且一个页面上可能出现多次。要分辨它们可能很难，因此始终备有广告拦截器很重要。请记住，一些文件托管网站会有虚假弹窗；真正的下载发生在下载页面本身，而不是重定向页面或弹窗标签页。

对于浏览器，我们推荐 **[uBlock Origin (uBO)](https://github.com/gorhill/uBlock)**，你也可以使用 **[Redirect Skipper](/internet-tools/#redirect-bypass)** 来跳过烦人的倒计时。请注意，仅靠 uBO 就足以进行浏览器广告拦截；同时使用 DNS 可能会导致冲突。请查看下方名为“浏览器”的部分，了解我们推荐的浏览器。另请注意，我们强烈建议使用 uBO 完整版，而不是精简版。

对于移动端 **[AdGuard Premium](/mobile/#android-adblocking)** / [iOS](https://adguard.com/en/adguard-ios/overview.html)，你可以使用 **[Morphe](https://morphe.software/)** 屏蔽 YouTube 和 Reddit 广告，也可选择 [轻松设置](https://wispydocs.pages.dev/morphe-piko-obtainium/)。请注意，uBO 也适用于 Firefox 等移动端浏览器。


::: info 信息
同时使用多个广告拦截器，例如 uBO 和 AdGuard，可能会 [把事情搞乱](https://x.com/gorhill/status/1033706103782170625)。这种情况只会发生在常规广告拦截器之间，因此将 uBO 与 SponsorBlock 之类的工具一起使用完全没问题。
:::

### 杀毒软件 {#antivirus}

> 如何安全地扫描文件，并判断检测结果是否为误报？


许多热门文件托管网站的下载按钮会重定向到虚假的恶意下载页面。使用 [uBlock Origin](/privacy/#adblocking) 完整版可以防止这种情况，但它并不总是有效。阅读这份 [指南](https://cs.rin.ru/forum/viewtopic.php?f=14&t=159345)，了解虚假的恶意下载页面长什么样以及如何避开它们。一条通用规则是：避免那些会在新标签页或重定向页面中打开的下载页；真正的下载发生在与文件托管网站相同的页面内。

在安装任何文件之前，建议使用 **[VirusTotal](https://www.virustotal.com/)** 扫描安装程序 / 安装包，并在 [Triage](https://tria.ge/)（沙盒）中运行它。如果你难以判断某个文件是否为误报，请参考 **[Scan Guide](https://clarasguide.valeena.workers.dev/Guides/vtguide/)**，或在 [Discord](https://github.com/fmhy/FMHY/wiki/FMHY-Discord) 中发给我们，我们会帮你看看。对于 Android 应用，最好在 [Triage](https://tria.ge/) 这样的沙盒中分析它们。


::: info 信息
大多数杀毒软件并无必要，而且可能导致系统变慢。如果你使用可信网站，Windows Defender 应该足以让你保持安全，你也可以偶尔运行一次 [Malwarebytes](https://www.malwarebytes.com/) 扫描以获得额外保护。
:::


### 浏览器 {#browsers}

> 我应该使用哪个网页浏览器？


我们推荐 **[Firefox](/internet-tools/#firefox-tools)**，但你也可以试试 **[Privacy-Focused Browsers](/privacy/#browser-privacy)**，或者如果你更偏好 Chromium，可以试试 **[Brave](https://brave.com/)**。

对于 Android，我们推荐 **[Brave](https://brave.com/)** 或 **[Firefox](https://www.firefox.com/browsers/mobile/android/)**。

对于 iOS，我们推荐 **Safari + [wBlock](https://skula.me/project/wblock/)** 或 **[Brave](https://brave.com/)**。


::: info 信息
我们建议浏览我们的 [扩展](/internet-tools/#browser-extensions) / [用户脚本](/internet-tools/#userscripts) 部分，寻找增强浏览器的方法。
:::

### Base64 {#base64}

> 如何解码 Base64？


如果你看到类似 `aHR0cHM6Ly9mbWh5Lm5ldC8` 的一串文本，可以使用 Base64 解码器查看它。有些可能需要解码两次。

* **[Base64 Decoders](/text-tools/#encode-decode) / [Auto Decode](https://greasyfork.org/en/scripts/485772-fmhy-base64-auto-decoder)**

### 电影 / 剧集 {#movies-shows}

* **在线观看：[Stream Site List](/video/)**
* **下载：[Directories](/video/#download-sites)**
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
* **Android：[Morphe](https://wispydocs.pages.dev/morphe-piko-obtainium/)（YTM Patch） / [⁠ArchiveTune](https://archivetune.miuka.moe/) / [Mornye](https://mornye.com/)**
* **iOS：[⁠8SPINE](https://apps.apple.com/app/8spine-the-music-app/id6755934415) / [Modules](https://8spine-modules.pages.dev/) / [EeveeSpotifyReincarnated](https://t.me/eeveespotify_hazel)**
* **追踪：[RateYourMusic](https://rateyourmusic.com/) / [Last.fm](https://www.last.fm/)**
* **发现：[RYM Charts](https://rateyourmusic.com/charts/) / [AnyDecentMusic](https://www.anydecentmusic.com/) / [NTS Radio](https://www.nts.live/)**

### 游戏 {#gaming}

* **下载 / BT 下载：[⁠HizSearch](https://hizsearch.pages.dev/) / [Virgil Game Search](https://virgil.samidy.com/?engine=games) / [AnkerGames](https://ankergames.net/) / [SteamRIP](https://steamrip.com/) / [FitGirl Repacks](https://fitgirl-repacks.site/)**
* **模拟 / ROMs：[Emulation Wiki](https://emulation.gametechwiki.com/index.php/Main_Page) / [Axekin](https://www.axekin.com/) / [r/ROMs Mega](https://r-roms.github.io/)**
* **追踪：[Backloggd](https://www.backloggd.com/) / [Glitchwave](https://glitchwave.com/)**
* **发现：[AcclaimedVideoGames](https://www.acclaimedvideogames.com/) / [SteamDB Ratings](https://steamdb.info/stats/gameratings/)**

### 阅读 {#reading}

* **下载：[Anna's Archive](https://annas-archive.gl/) / [Z-Library](https://z-lib.gd/)**
* **有声书：[Mobilism Audiobooks](https://forum.mobilism.org/viewforum.php?f=124) / [AudiobookBay](https://audiobookbay.lu/) / [Warning](https://github.com/fmhy/edit/blob/main/docs/.vitepress/notes/audiobookbay-critical.md)**
* **电子书阅读器：[Readest](https://readest.com/) / [Koodo](https://www.koodoreader.com/) / [Google Play Books](https://play.google.com/books)**
* **漫画：[Weeb Central](https://weebcentral.com/) / [Kagane](https://kagane.org/) / [MangaDot](https://mangadot.net/)**
* **漫画：[BatCave](https://batcave.biz/) / [GetComics](https://getcomics.org/)**
* **Android 阅读器：[Librera](https://librera.mobi/) / [Moon+ Reader](https://www.moondownload.com/) + [Theme Guide](https://clarasguide.valeena.workers.dev/Guides/moontheme/)**
* **追踪：[StoryGraph](https://www.thestorygraph.com/) / [Hardcover](https://hardcover.app/)（书籍） / [MAL](https://myanimelist.net/)（漫画） / [League of Comic Geeks](https://leagueofcomicgeeks.com/)（漫画）**
* **发现：[Five Books](https://fivebooks.com/) / [The Greatest Books](https://thegreatestbooks.org/)（书籍） / [MangaBaka](https://mangabaka.org/)（漫画） / [ComicBookCanon](https://www.comicbookcanon.com/)（漫画）**

### 隐私 {#privacy}

> 我没什么好藏的，为什么要在意隐私？


隐私关乎的是控制你自己的个人信息，而不只是把事情保密。非敏感数据会被公司用来追踪你的行为、定向投放广告并影响你的选择。

关于邮件隐私，我们推荐 **[Proton](https://proton.me/mail)**，搜索推荐 **[SearXNG](/storage/#searx-instances)**。另外也建议用 HaveIBeenPwned **[email](https://haveibeenpwned.com/)** 和[密码](https://haveibeenpwned.com/Passwords)引擎检查一下，确认你的信息没有出现在近期的数据泄露中。


::: info 信息
绝不要在你无法确定可信的网站上输入你的真实邮箱或密码。为你注册的每个网站使用唯一的密码。这样万一发生泄露，也只有那一个网站的凭据受影响。你还可以利用邮箱[别名](/internet-tools/#email-aliasing)来多加一层保护。
:::


::: info 信息
请记住，把个人或机密文件上传到任何文件托管 / 云端 AI 都**绝不是**好主意，即使它们声称已加密。
:::

### Windows 指南 {#windows-guide}

> 如何免费下载 / 激活 Windows？


* **[Windows Install / Debloat Guide](https://wispydocs.pages.dev/windows/)**

从 Massgrave 的 **[Genuine Installation Media](https://massgrave.dev/genuine-installation-media)** 页面下载 ISO，并按 **[Clean Install Windows Guide](https://massgrave.dev/clean_install_windows)** 进行安装。安装完成后，用 **[Microsoft Activation Scripts](https://rentry.co/FMHYB64#mas)** 激活。如果你想在 Windows 10 停止支持后继续使用，请参阅 **[Windows 10 After EOL](https://massgrave.dev/windows10_eol)**。

注意，你可以打开文件资源管理器，点击“查看”菜单，勾选“文件扩展名”旁的复选框，从而为所有文件显示扩展名。

* **软件网站：[Virgil Software Search](https://virgil.samidy.com/?engine=software) / [CracksURL](https://cracksurl.com/) / [Download Guide](https://cracksurl.com/how-to-download/) / [LRepacks](https://lrepacks.net/)**

### BT 下载 {#torrenting}

> 做 BT 下载需要 VPN 吗？


通过 BT 下载文件可能会引起 ISP 的问题，因此在大多数国家使用 **[VPN](/privacy/#vpn)** 是必须的。你还应该把 **[bind your VPN](https://wispydocs.pages.dev/torrenting/)** 配置到 BT 客户端。这样一旦 VPN 连接断开，BT 客户端就会停止所有流量，防止你的真实 IP 地址暴露。你也可以使用 **[Remote Torrenting Services](/torrenting/#remote-torrenting)**，从而完全无需 VPN。

> 什么是端口转发？我需要它吗？


[端口转发](https://wispydocs.pages.dev/torrenting/#port-forwarding)（拥有一个开放端口）推荐给不使用 VPN 进行 BT 下载的用户，或使用支持端口转发的 VPN 的用户。它并非严格必需，但有利于整个种子群，有时能提升下载速度，并改善做种者较少的种子的连接性。

### Android 应用 {#android-apps}

* **[Mobilism](https://forum.mobilism.org/viewforum.php?f=398)** - 修改版 APK
* **[APKMirror](https://www.apkmirror.com/)** - 原版 APK
* **[Droid-ify](https://droidify.app/)** - FOSS 安卓应用 / [GitHub](https://github.com/Droid-ify/client)
* **[Obtainium](https://github.com/ImranR98/Obtainium/)** - 获取安卓应用更新

### iOS 侧载 {#ios-sideloading}

* **[TrollStore](https://github.com/opa334/TrollStore)** - 无限应用侧载 [iOS 14.0-17.0]
* **[SideStore](https://sidestore.io/)** - 免越狱侧载应用 [iOS 16.0 及以上]
* **[Sideloadly](https://sideloadly.io/)** - 免越狱侧载应用 [iOS 7.0 及以上]
* **[Impactor](https://impactor.claration.dev/)** - 免越狱侧载

### 重要链接 {#important-links}

* **下载管理器：[AB Download Manager](https://abdownloadmanager.com/)**
* **[Translate Web Pages](https://github.com/FilipePS/Traduzir-paginas-web)** - 将网页翻译为你的语言
* **[Glossary / Terminology](https://fluffle.cc/piracyglossary)** - 常见盗版术语定义
* **[Unsafe Sites / Software](https://fmhy.net/unsafe)** - 我们建议避免的事项
* **[FMHY.net](https://fmhy.net/)** - 我们的网站，包含更多站点 / 工具

**新手指南链接**
- https://fmhy.net/beginners-guide
- https://rentry.org/Piracy-BG/