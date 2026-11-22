#### Eruda

适用于移动浏览器的 Eruda 控制台 [书签小工具](https://wikipedia.org/wiki/Bookmarklet)：
```
javascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();
```
