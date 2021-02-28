# git submodule

### 学习起源

相遇即是缘，学习`git submodule`是正好有两个项目中都需要用到同一个功能模块。Git中通过子模块来解决这个问题。子模块是独立的代码库，可以作为主应用的子目录，提交的时候二者保持独立。

下面使用webpackStudy项目和github1s来作为例子来演示子模块的相关命令

### git submodule 命令

#### 添加子模块 命令

  `git submodule add [<options>] <repository> [<path>]`

* 执行命令
`git submodule add https://github.com/Yuanbaby0077/github1s.git src/submodule/github1s`

* 执行 `cat .gitmodule` 查看配置

`.gitmodule`文件保存了子模块的仓库地址和当前所在目录的映射
```
[submodule "src/submodule/github1s"]
	path = src/submodule/github1s
	url = https://github.com/Yuanbaby0077/github1s.git

```
* 添加多个子模块后 查看.gitmodule

```
[submodule "src/submodule/github1s"]
	path = src/submodule/github1s
	url = https://github.com/Yuanbaby0077/github1s.git
[submodule "src/submodule/testXXX"]
	path = src/submodule/testXXX
	url = https://github.com/Yuanbaby0077/testXXX.git
```

* 执行 `git diff --cached --submodule` 查看差异

#### 克隆含有子模块的项目

  * 方法一
  ```
    git clone <main>
    cd <main>
    git submodule update --init // git submodule init 和 git submodule update
  ```
  * 方法二
  
  `git clone <repository> --recursive` 或者 `git clone --recurse-submodules <repository>`

  执行命令
  `git clone --recurse-submodules https://github.com/Yuanbaby0077/mixDemo.git`

#### 修改子模块 命令

  * 方法一
  ```
    cd <main>
    git pull
    git submodule update
  ```

  * 方法二
  ```
    cd <submodule>
    git checkout master
    cd ..
    git submodule foreach git pull
  ```

####  删除子模块 命令
  `git rm <submodule>`

  * 首先执行：
  `git rm -r src/submodule/`

    ![1](./assets/imgs/WechatIMG46.png)

  * 重新添加子模块翻车现场
  ![3](./assets/imgs/addFail.png)

  * 于是，执行`open .git/config` 删除.git/config的submodule配置源文件
  ![2](./assets/imgs/remove1.png)
  
  * 重复执行步骤2 继续翻车，于是查了下资料，需要删除`.git/modules`下的submodule，执行以下命令
    `rm -rf .git/modules/src/submodule`

    ![2](./assets/imgs/remove2.png)

  * 重新执行步骤2 成功
  ![2](./assets/imgs/addSuccess.png)


### 参考
[协同开发利器-Git Submodule](https://cloud.tencent.com/developer/article/1585901)

[GIT-工具-子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)




