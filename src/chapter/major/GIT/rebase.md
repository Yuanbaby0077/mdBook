# git rebase

多人共用一个分支协作的时候，push代码之前需要先pull，先合并代码到本地，然后才能push。

这就导致提交记录不好看

查看分支合并历史

`git log --pretty=oneline --graph`

>2fe78da10a789594c5898cff81c55f57250da65d (HEAD -> master, origin/master) feat: interview
>
>da1c3de5f9c10d468ed4216823ec7032f39d3906 feat: update
>
>00a12742ec1a21e31461da8d094f331c73f594d5 feat: mdbook

仅显示commitId校验和所有40个字符中的前几个字符使用

`git log --graph --pretty=oneline --abbrev-commit`

>2fe78da (HEAD -> master, origin/master) feat: interview
>
>da1c3de feat: update
>
>00a1274 feat: mdbook

