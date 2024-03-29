# 查找未使用的 npm 依赖项

对于一个逐步构建起来的大型项目，我们可能会不断的引入不同的依赖，以适应开发需要。这些依赖关系可能会很快的堆积起来。

它们不仅会堆积起来，可能会在某一天，您发现了一个更好的库，您引入它替换原始依赖项，原始依赖将被完全停止使用。而您可能会忘了将它和它的相关依赖移除。

由于这些依赖项没有被使用，随着我们不必要地一次又一次地安装它们，构建时间越来越长。

幸运的是，与您在开发过程中面临的大多数问题一样，还有其他人已经遇到了这个问题，并投入了时间和精力来制定解决方案。

对于 `npm` 依赖项，该解决方案是 [`depcheck`](https://github.com/depcheck/depcheck)，一个小型的库，它可以用来扫描代码并识别任何未使用的依赖项。

如果手头有 Node.js 项目，您可以这样使用它。

您不必将 `depcheck` 安装到全局或本地，npm 自带的 `npx` 可以帮助到您：

```bash
npx depcheck
```

就这样！`npx` 将安装 `depcheck` 并为您运行它。

如果幸运的话，该命令的输出将为 `No depcheck issue`，表示没有未使用的依赖项。

但如果您有任何未使用的依赖项，您将看到类似于以下的输出：

```txt
Unused dependencies
* eslint
* node-cron
* rss-parser
* uuid
* zlib
```

另外，`depcheck` 还将识别您正在使用的、未在 `package.json` 文件中明确列出的任何依赖项，如下所示：

```txt
Missing dependencies
* type-fest
```

非常方便、快速。您可以甚至可以使用 `depcheck` 以在提交/推送时自动运行这些检查以确保您或其他开发者不会安装到这些未使用的依赖项。
